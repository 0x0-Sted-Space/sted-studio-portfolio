"use client";

import { Text } from "@/once-ui/components";
import Image from "next/image";
import styles from "./SimpleGallery.module.scss";
import { GALLERY_DATA } from "./galleryData";

interface GalleryItem {
  title: string;
  images: string[];
  description: string;
  isVideo?: boolean;
}

interface SimpleGallerySectionProps {
  title: string;
  sectionId: string;
}

const getItemsForSection = (sectionId: string): GalleryItem[] => {
  return (
    (GALLERY_DATA as any)[sectionId] ||
    []
  );
};

export default function SimpleGallerySection({
  title,
  sectionId,
}: SimpleGallerySectionProps) {
  const items = getItemsForSection(sectionId);

  return (
    <div className={styles.gallerySection}>
      <div className={styles.sectionHeader}>
        <Text variant="heading-strong-l" className={styles.sectionTitle}>
          {title}
        </Text>
      </div>

      <div className={styles.imagesGrid}>
        {items.map((item, itemIndex) => (
          <div key={itemIndex} className={styles.itemGroup}>
            <div className={styles.itemHeader}>
              <Text variant="heading-strong-m" className={styles.itemTitle}>
                {item.title}
              </Text>
              {item.description && (
                <Text variant="body-default-s" className={styles.itemDescription}>
                  {item.description}
                </Text>
              )}
            </div>
            
            {item.isVideo ? (
              <div className={styles.videosContainer}>
                {item.images.map((videoPath, videoIndex) => (
                  <div key={videoIndex} className={styles.videoItem}>
                    {videoPath.includes('drive.google.com') ? (
                      <iframe
                        className={styles.videoPlayer}
                        src={videoPath}
                        title={`Video ${videoIndex + 1}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <video
                        className={styles.videoPlayer}
                        preload="metadata"
                        controls
                        poster={videoPath.includes('.mp4') ? videoPath.replace('.mp4', '.jpg') : undefined}
                        onLoadedData={(e) => {
                          console.log('Video loaded:', videoPath);
                        }}
                        onError={(e) => {
                          console.error('Video error:', videoPath, e);
                        }}
                      >
                        <source src={videoPath} type="video/mp4" />
                        <source src={videoPath} type="video/webm" />
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.imagesContainer}>
                {item.images.map((imagePath, imageIndex) => (
                  <div key={imageIndex} className={styles.imageWrapper}>
                    <Image
                      src={imagePath}
                      alt={`${item.title} - Image ${imageIndex + 1}`}
                      width={400}
                      height={300}
                      className={styles.media}
                      onError={(e) => {
                        console.error(`Failed to load image: ${imagePath}`);
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
