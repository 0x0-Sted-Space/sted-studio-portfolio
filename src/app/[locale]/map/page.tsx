import { Metadata } from "next";
import { MapPage } from "./MapPage";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return {
    title: "Map - Sted.Studio",
    description:
      "Explore our global client locations on an interactive world map",
  };
}

export default function Map() {
  return <MapPage />;
}
