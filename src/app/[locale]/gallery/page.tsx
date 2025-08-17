import { Metadata } from "next";
import GalleryClient from "./GalleryClient";
import "./gallery.css";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Gallery | Sted Studio",
    description:
      "Explore our creative work across various categories including logos, posters, branding, UX/UI, AI artworks, and photography.",
  };
}

export default function Gallery() {
  return <GalleryClient />;
}
