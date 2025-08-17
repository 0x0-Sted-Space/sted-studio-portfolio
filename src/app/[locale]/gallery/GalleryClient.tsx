"use client";

import { useState, useRef } from "react";
import { Button } from "@/once-ui/components";
import GallerySection from "@/components/gallery/GallerySection";
import styles from "./gallery.module.scss";

const SECTIONS = [
  { id: "logos", title: "Logos" },
  { id: "aiArtwork", title: "Ai-Artwork" },
  { id: "brandingUxUiPosters", title: "Branding-Ux-UI-Posters" },
  { id: "janasena", title: "Janasena" },
  { id: "videos", title: "Videos" },
];

export default function GalleryClient() {
  const [activeSection, setActiveSection] = useState("logos");
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollLeft = container.scrollLeft;
    const containerWidth = container.clientWidth;
    const activeIndex = Math.round(scrollLeft / containerWidth);
    setActiveSection(SECTIONS[activeIndex].id);
  };

  const scrollToSection = (sectionId: string) => {
    const section = sectionRefs.current[sectionId];
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  return (
    <div className={styles.galleryContainer}>
      <div className={styles.navigationBar}>
        {SECTIONS.map(({ id, title }) => (
          <Button
            key={id}
            size="m"
            variant={activeSection === id ? "primary" : "secondary"}
            onClick={() => scrollToSection(id)}
            className={styles.navButton}
          >
            {title}
          </Button>
        ))}
      </div>

      <div className={styles.sectionsContainer} onScroll={handleScroll}>
        {SECTIONS.map(({ id, title }) => (
          <section
            key={id}
            ref={(el) => (sectionRefs.current[id] = el)}
            className={styles.sectionWrapper}
          >
            <GallerySection title={title} sectionId={id} />
          </section>
        ))}
      </div>
    </div>
  );
}
