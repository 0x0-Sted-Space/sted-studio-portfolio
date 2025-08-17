"use client";

import { useRef, useState } from "react";
import { Flex, SmartImage, IconButton } from "@/once-ui/components";
import styles from "./Gallery.module.scss";
import { useTranslations } from "next-intl";
import { renderContent } from "@/app/resources";

interface BentoGridProps {
  category: string;
}

export default function BentoGrid({ category }: BentoGridProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const t = useTranslations();
  const { gallery } = renderContent(t);

  // Filter images based on category
  const filteredImages =
    category === "all"
      ? gallery.images
      : gallery.images.filter((img) => img.category === category);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.8;
    const newScrollLeft =
      direction === "left"
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth
    );
  };

  return (
    <Flex direction="column" gap="l" fillWidth>
      <Flex
        className={styles.bentoGridContainer}
        ref={scrollContainerRef}
        onScroll={handleScroll}
      >
        <div className={styles.bentoGrid}>
          {filteredImages.map((image, index) => (
            <div
              key={index}
              className={`${styles.bentoItem} ${
                index % 3 === 0
                  ? styles.large
                  : index % 4 === 0
                  ? styles.tall
                  : styles.regular
              }`}
            >
              <SmartImage
                src={image.src}
                alt={image.alt}
                radius="m"
                aspectRatio={
                  image.orientation === "horizontal" ? "16 / 9" : "9 / 16"
                }
                className={styles.bentoImage}
              />
            </div>
          ))}
        </div>
      </Flex>

      {/* Navigation Controls */}
      <Flex justify="center" gap="m">
        <IconButton
          icon="arrow-left"
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
        />
        <IconButton
          icon="arrow-right"
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
        />
      </Flex>
    </Flex>
  );
}
