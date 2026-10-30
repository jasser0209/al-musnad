export interface PdfExtractionResult {
  thumbnailFile: File;
  thumbnailPreviewUrl: string;
  pageCount: number;
}

export async function extractPdfThumbnailAndPages(
  pdfFile: File
): Promise<PdfExtractionResult> {
  const pdfjsLib = await import("pdfjs-dist");

  if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
  }

  const arrayBuffer = await pdfFile.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  const pdfDocument = await loadingTask.promise;

  const pageCount = pdfDocument.numPages;
  const firstPage = await pdfDocument.getPage(1);

  const baseViewport = firstPage.getViewport({ scale: 1.0 });
  const targetWidth = 520;
  const scale = Math.min(1.5, Math.max(0.75, targetWidth / (baseViewport.width || 520)));
  const viewport = firstPage.getViewport({ scale });

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("تعذر إنشاء سياق الرسم للصورة المصغرة");
  }

  canvas.width = Math.round(viewport.width);
  canvas.height = Math.round(viewport.height);

  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);

  await (
    firstPage.render({
      canvas,
      canvasContext: context,
      viewport,
    } as any)
  ).promise;

  const blob: Blob = await new Promise((resolve, reject) => {
    canvas.toBlob(
      (b) => {
        if (b) resolve(b);
        else reject(new Error("فشل تحويل صفحة الـ PDF إلى صورة"));
      },
      "image/webp",
      0.82
    );
  });

  const cleanBaseName = pdfFile.name
    .replace(/\.pdf$/i, "")
    .replace(/[^a-zA-Z0-9_-]/g, "_");
  const thumbnailFile = new File([blob], `${cleanBaseName || "doc"}-thumb.webp`, {
    type: "image/webp",
  });

  const thumbnailPreviewUrl = URL.createObjectURL(blob);

  return {
    thumbnailFile,
    thumbnailPreviewUrl,
    pageCount,
  };
}