/**
 * Client-Side PDF Thumbnail & Page Count Extractor
 *
 * Uses pdfjs-dist dynamically in the browser to render Page 1 of a PDF
 * into a compressed WebP image File and extract total page count.
 */

export interface PdfExtractionResult {
  thumbnailFile: File;
  thumbnailPreviewUrl: string;
  pageCount: number;
}

export async function extractPdfThumbnailAndPages(
  pdfFile: File
): Promise<PdfExtractionResult> {
  // Dynamic import so Next.js SSR build never loads browser canvas APIs
  const pdfjsLib = await import("pdfjs-dist");

  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

  const arrayBuffer = await pdfFile.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  const pdfDocument = await loadingTask.promise;

  const pageCount = pdfDocument.numPages;
  const firstPage = await pdfDocument.getPage(1);

  // Render at scale 1.5 for crisp thumbnail quality
  const viewport = firstPage.getViewport({ scale: 1.5 });
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("تعذر إنشاء سياق الرسم للصورة المصغرة");
  }

  canvas.width = viewport.width;
  canvas.height = viewport.height;

  // Fill white background for transparent PDFs
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);

  await (firstPage.render({
    canvas,
    canvasContext: context,
    viewport,
  } as any)).promise;

  const blob: Blob = await new Promise((resolve, reject) => {
    canvas.toBlob(
      (b) => {
        if (b) resolve(b);
        else reject(new Error("فشل تحويل صفحة الـ PDF إلى صورة"));
      },
      "image/webp",
      0.85
    );
  });

  const cleanBaseName = pdfFile.name.replace(/\.pdf$/i, "").replace(/[^a-zA-Z0-9_-]/g, "_");
  const thumbnailFile = new File([blob], `${cleanBaseName}-thumb.webp`, {
    type: "image/webp",
  });

  const thumbnailPreviewUrl = URL.createObjectURL(blob);

  return {
    thumbnailFile,
    thumbnailPreviewUrl,
    pageCount,
  };
}
