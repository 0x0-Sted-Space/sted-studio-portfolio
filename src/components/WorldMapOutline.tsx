import React, { useMemo, useRef, useEffect, useState } from "react";
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
// @ts-ignore – world-atlas ships JSON
import world110m from "world-atlas/countries-110m.json";

type Location = {
  name: string;
  coordinates: [number, number]; // [longitude, latitude]
  city: string;
  country: string;
  description: string;
};

type Props = {
  /** width/height in px; the SVG is responsive via viewBox too */
  width?: number;
  height?: number;
  strokeWidth?: number;
  bg?: string; // css color for background
  stroke?: string; // css color for outlines
  locations?: Location[];
};

const BRIGHT_RED = "#FF3333"; // Brighter red for better visibility

export default function WorldMapOutline({
  width = 4800, // original size
  height = 2400, // original size
  strokeWidth = 1.5,
  bg = "#05070B",
  stroke = "#4EA0FF",
  locations = [],
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: width, h: height });
  const [activeLocationIndex, setActiveLocationIndex] = useState(0);

  // Effect to cycle through locations
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLocationIndex((current) =>
        current === locations.length - 1 ? 0 : current + 1
      );
    }, 6000); // Change location every 6 seconds

    return () => clearInterval(interval);
  }, [locations.length]);

  // Resize listener for responsiveness
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const h = Math.max(320, (w * height) / width); // maintain aspect
        setSize({ w, h });
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [width, height]);

  // Convert TopoJSON -> GeoJSON features once
  const countries = useMemo(() => {
    const geo = feature(world110m as any, (world110m as any).objects.countries);
    // Filter out Antarctica (it's usually the first feature with name "Antarctica")
    return geo.features.filter((f: any) => f.properties?.name !== "Antarctica");
  }, []);

  // Projection & path generator
  const { pathGen, projectedLocations } = useMemo(() => {
    const projection = geoMercator()
      .scale(size.w / 8) // Increased scale by 1.5x
      .center([0, 20]) // Adjusted center for better full map view
      .translate([size.w / 2, size.h / 2])
      .rotate([0, 0, 0]);

    // Project all locations
    const projectedLocations = locations.map((location) => {
      const [x, y] = projection(location.coordinates)!;
      return { ...location, x, y };
    });

    return {
      pathGen: geoPath(projection),
      projectedLocations,
    };
  }, [size.w, size.h, locations]);

  return (
    <>
      <style>
        {`
          @keyframes showLocation {
            0%, 100% {
              opacity: 0;
              transform: translateY(0);
            }
            10%, 90% {
              opacity: 1;
              transform: translateY(-5px);
            }
          }

          @keyframes pinBlink {
            0%, 100% {
              opacity: 0.3;
            }
            50% {
              opacity: 1;
            }
          }

          .location-name {
            opacity: 0;
          }

          .location-name.active {
            animation: showLocation 6s ease-in-out forwards;
          }

          .pin {
            opacity: 0.3;
            cursor: pointer;
          }

          .pin.active {
            animation: pinBlink 6s ease-in-out infinite;
          }

          .location-label {
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
          }

          .location-marker:hover .location-label {
            opacity: 1;
          }

          .info-card {
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
          }

          .location-marker:hover .info-card {
            opacity: 1;
            visibility: visible;
          }

          .pin:hover {
            cursor: pointer;
          }
        `}
      </style>
      <svg
        viewBox={`0 0 ${size.w} ${size.h}`}
        width="100%"
        height="100%"
        style={{
          display: "block",
          objectFit: "contain",
          maxWidth: "none",
          maxHeight: "none",
        }}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="World map outlines"
      >
        {/* Soft blue glow */}
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="0.5"
              floodColor={stroke}
              floodOpacity="0.1"
            />
          </filter>
        </defs>

        {/* Land outlines */}
        <g filter="url(#glow)">
          {countries.map((f: any, i: number) => (
            <path
              key={i}
              d={pathGen(f)!}
              fill="none"
              stroke={stroke}
              strokeWidth={strokeWidth}
            />
          ))}
        </g>

        {/* Location Markers */}
        {projectedLocations.map((location, i) => (
          <g key={i} className="location-marker">
            {/* Single text element for both animation and hover */}
            <g
              className={`location-name ${
                i === activeLocationIndex ? "active" : "location-label"
              }`}
            >
              <rect
                x={location.x - 120}
                y={location.y - 60}
                width="240"
                height="50"
                fill="rgba(0, 0, 0, 0.8)"
                rx="4"
              />
              <text
                x={location.x}
                y={location.y - 25}
                textAnchor="middle"
                fill="#F9B243"
                fontSize="48"
                fontWeight="700"
              >
                {location.name}
              </text>
            </g>

            {/* Pin marker with animation */}
            <circle
              cx={location.x}
              cy={location.y}
              r="10"
              fill={BRIGHT_RED}
              stroke="#ffffff"
              strokeWidth="4"
              className={`pin ${i === activeLocationIndex ? "active" : ""}`}
            />

            {/* Info Card */}
            <g className="info-card">
              <rect
                x={location.x + 40}
                y={location.y - 200}
                width="1200"
                height="400"
                fill="rgba(0, 0, 0, 0.9)"
                rx="16"
                stroke="#F9B243"
                strokeWidth="2"
              />
              <text
                x={location.x + 100}
                y={location.y - 100}
                fill="#F9B243"
                fontSize="64"
                fontWeight="700"
              >
                {location.name}
              </text>
              <text
                x={location.x + 100}
                y={location.y}
                fill="#ffffff"
                fontSize="56"
              >
                {location.city}, {location.country}
              </text>
              <text
                x={location.x + 100}
                y={location.y + 100}
                fill="#ffffff"
                fontSize="48"
                opacity="0.8"
              >
                {location.description}
              </text>
            </g>
          </g>
        ))}
      </svg>
    </>
  );
}
