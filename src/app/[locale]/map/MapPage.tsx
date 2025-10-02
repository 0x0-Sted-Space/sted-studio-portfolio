"use client";

import { Text } from "@/once-ui/components";
import WorldMapOutline from "@/components/WorldMapOutline";
import styles from "./map.module.scss";

// Client locations data for display
const CLIENT_LOCATIONS = [
  {
    name: "Dimore",
    country: "Italy",
    city: "Milan",
    description: "Premium tiles and ceramics company",
    coordinates: [9.19, 45.4642], // [longitude, latitude]
  },
  {
    name: "Cambridge",
    country: "United Kingdom",
    city: "Cambridge",
    description: "Prestigious university and research institution",
    coordinates: [0.1218, 52.2053],
  },
  {
    name: "Barista",
    country: "India",
    city: "Mumbai",
    description: "Coffee chain and café business",
    coordinates: [72.8777, 19.076],
  },
  {
    name: "Rate Finder",
    country: "Canada",
    city: "Woodbridge",
    description: "Financial services and rate comparison platform",
    coordinates: [-79.594, 43.7751], // Woodbridge, Ontario coordinates
  },
  {
    name: "Smacoteq",
    country: "France",
    city: "Paris",
    description: "Technology solutions and software development",
    coordinates: [2.3522, 48.8566], // Paris, France coordinates
  },
];

export function MapPage() {
  return (
    <div className={styles.mapPage}>
      <div className={styles.heroSection}>
        <Text variant="heading-strong-xl" className={styles.pageTitle}>
          Our Global Reach
        </Text>
        <Text variant="body-default-l" className={styles.pageDescription}>
          Discover where our clients are located around the world
        </Text>
      </div>

      <div className={styles.mapContainer}>
        <WorldMapOutline
          width={4800}
          height={2400}
          strokeWidth={2}
          bg="#000000"
          stroke="rgba(0, 255, 255, 0.9)"
          locations={CLIENT_LOCATIONS.map((loc) => ({
            name: loc.name,
            coordinates: loc.coordinates,
            city: loc.city,
            country: loc.country,
            description: loc.description,
          }))}
        />
      </div>

      {/* Client information in grid */}
      <div
        style={{
          marginTop: "2rem",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "2rem",
          padding: "0 2rem",
        }}
      >
        {CLIENT_LOCATIONS.map((client, index) => (
          <div key={index} style={{ textAlign: "center", lineHeight: "1.6" }}>
            <div
              style={{
                color: "rgba(0, 255, 255, 0.9)",
                fontSize: "1.2rem",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
              }}
            >
              <img
                src={`/images/projects/project-01/${
                  client.name === "Barista"
                    ? "Barista logo- white"
                    : client.name === "Rate Finder"
                    ? "the rate finder"
                    : client.name.toLowerCase().replace(" ", "")
                }.png`}
                alt={`${client.name} logo`}
                style={{
                  height: "36px",
                  width: "auto",
                  objectFit: "contain",
                  maxWidth: client.name === "Rate Finder" ? "72px" : "36px",
                }}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              {client.name}
            </div>
            <div
              style={{ color: "rgba(255, 255, 255, 0.7)", margin: "0.3rem 0" }}
            >
              {client.city}, {client.country}
            </div>
            <div style={{ color: "rgba(255, 255, 255, 0.9)" }}>
              {client.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
