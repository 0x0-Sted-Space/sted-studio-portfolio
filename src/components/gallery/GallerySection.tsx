"use client";

import { useState, useEffect, useRef } from "react";
import { Text, IconButton } from "@/once-ui/components";
import Image from "next/image";
import Masonry from "react-masonry-css";
import styles from "./Gallery.module.scss";
import { GALLERY_DATA } from "./galleryData";

interface GalleryItem {
  title: string;
  images: string[];
  description: string;
  isVideo?: boolean;
}

interface GallerySectionProps {
  title: string;
  sectionId: string;
}

const getItemsForSection = (sectionId: string): GalleryItem[] => {
  return (
    (GALLERY_DATA[sectionId as keyof typeof GALLERY_DATA] as GalleryItem[]) ||
    []
  );
};

export default function GallerySection({
  title,
  sectionId,
}: GallerySectionProps) {
  const items = getItemsForSection(sectionId);
  const [activeCardIndexes, setActiveCardIndexes] = useState<{
    [key: number]: number;
  }>(Object.fromEntries(items.map((_, idx) => [idx, 0])));

  const [isHovered, setIsHovered] = useState<{ [key: number]: boolean }>({});
  const [isTransitioning, setIsTransitioning] = useState<{
    [key: number]: boolean;
  }>({});
  const intervalRefs = useRef<{ [key: number]: NodeJS.Timeout | null }>({});

  // Auto-advance images every 10 seconds (only when not hovered)
  useEffect(() => {
    items.forEach((item, cardIndex) => {
      if (item.images.length > 1 && !isHovered[cardIndex]) {
        intervalRefs.current[cardIndex] = setInterval(() => {
          smoothTransition(
            cardIndex,
            (prev) => (prev + 1) % item.images.length
          );
        }, 10000);
      }
    });

    return () => {
      Object.values(intervalRefs.current).forEach((interval) => {
        if (interval) clearInterval(interval);
      });
    };
  }, [items, isHovered]);

  // Smooth transition function
  const smoothTransition = (
    cardIndex: number,
    getNewIndex: (prev: number) => number
  ) => {
    if (isTransitioning[cardIndex]) return;

    setIsTransitioning((prev) => ({ ...prev, [cardIndex]: true }));

    setTimeout(() => {
      setActiveCardIndexes((prev) => ({
        ...prev,
        [cardIndex]: getNewIndex(prev[cardIndex]),
      }));

      setTimeout(() => {
        setIsTransitioning((prev) => ({ ...prev, [cardIndex]: false }));
      }, 300);
    }, 150);
  };

  // Clear interval when card is hovered
  const handleCardHover = (cardIndex: number, hovered: boolean) => {
    setIsHovered((prev) => ({ ...prev, [cardIndex]: hovered }));

    if (hovered && intervalRefs.current[cardIndex]) {
      clearInterval(intervalRefs.current[cardIndex]);
      intervalRefs.current[cardIndex] = null;
    }
  };

  const navigateCard = (cardIndex: number, direction: "prev" | "next") => {
    const images = items[cardIndex].images;
    if (!images || images.length <= 1) return;

    smoothTransition(
      cardIndex,
      (prev) =>
        (prev + (direction === "next" ? 1 : -1) + images.length) % images.length
    );
  };

  // Responsive breakpoints for masonry
  const breakpointColumnsObj = {
    default: 4,
    1200: 3,
    768: 2,
    500: 1,
  };

  return (
    <div className={styles.section}>
      <Text variant="heading-strong-xl" className={styles.sectionTitle}>
        {title}
      </Text>

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={styles.masonryGrid}
        columnClassName={styles.masonryGridColumn}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className={styles.masonryItem}
            onMouseEnter={() => handleCardHover(index, true)}
            onMouseLeave={() => handleCardHover(index, false)}
          >
            <div className={styles.cardCarousel}>
              {isTransitioning[index] && (
                <div className={styles.transitionOverlay}>
                  <div className={styles.transitionSpinner}></div>
                </div>
              )}
              {item.isVideo ? (
                <video
                  src={item.images[activeCardIndexes[index]]}
                  controls
                  muted
                  loop
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                    opacity: isTransitioning[index] ? 0.7 : 1,
                    transform: isTransitioning[index]
                      ? "scale(0.98)"
                      : "scale(1)",
                    transition:
                      "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                  className={styles.masonryVideo}
                />
              ) : (
                <Image
                  src={item.images[activeCardIndexes[index]]}
                  alt={item.title}
                  width={400}
                  height={300}
                  sizes="(max-width: 500px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                    opacity: isTransitioning[index] ? 0.7 : 1,
                    transform: isTransitioning[index]
                      ? "scale(0.98)"
                      : "scale(1)",
                    transition:
                      "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                  className={styles.masonryImage}
                  priority={index < 4}
                />
              )}

              {/* Image indicators */}
              {item.images.length > 1 && (
                <div className={styles.imageIndicators}>
                  {item.images.map((_, imgIndex) => (
                    <div
                      key={imgIndex}
                      className={`${styles.indicator} ${
                        imgIndex === activeCardIndexes[index]
                          ? styles.active
                          : ""
                      }`}
                      onClick={() => smoothTransition(index, () => imgIndex)}
                    />
                  ))}
                </div>
              )}

              {item.images.length > 1 && (
                <div className={styles.cardControls}>
                  <IconButton
                    icon="arrow-left"
                    onClick={() => navigateCard(index, "prev")}
                    className={styles.carouselButton}
                    size="s"
                  />
                  <IconButton
                    icon="arrow-right"
                    onClick={() => navigateCard(index, "next")}
                    className={styles.carouselButton}
                    size="s"
                  />
                </div>
              )}

              <div className={styles.cardContent}>
                <Text variant="heading-strong-m" className={styles.cardTitle}>
                  {item.title}
                </Text>
                {item.description && (
                  <Text
                    variant="body-default-s"
                    className={styles.cardDescription}
                  >
                    {item.description}
                  </Text>
                )}
                {item.images.length > 1 && (
                  <Text variant="body-default-s" className={styles.imageCount}>
                    {activeCardIndexes[index] + 1} / {item.images.length}
                  </Text>
                )}
              </div>
            </div>
          </div>
        ))}
      </Masonry>
    </div>
  );
}
