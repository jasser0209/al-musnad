import { redirect } from "next/navigation";

interface BrowseProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BrowsePage(props: BrowseProps) {
  const searchParams = await props.searchParams;
  const params = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (typeof value === "string") {
      params.set(key, value);
    }
  });

  const query = params.toString();
  redirect(`/${query ? `?${query}#catalog` : "#catalog"}`);
}