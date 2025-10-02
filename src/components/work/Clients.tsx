import { Flex, Text } from "@/once-ui/components";
import Image from "next/image";
import styles from "./Clients.module.scss";

export function Clients() {
  const clientLogos = [
    {
      name: "Dimore",
      src: "/images/projects/project-01/Dimore.png",
      alt: "Dimore logo",
    },
    {
      name: "Cambridge",
      src: "/images/projects/project-01/Cambridge.png",
      alt: "Cambridge logo",
    },
    {
      name: "Barista",
      src: "/images/projects/project-01/Barista logo- white.png",
      alt: "Barista logo",
    },
    {
      name: "Rate Finder",
      src: "/images/projects/project-01/the rate finder.png",
      alt: "Rate Finder logo",
    },
    {
      name: "Smacoteq",
      src: "/images/projects/project-01/Smacoteq.png",
      alt: "Smacoteq logo",
    },
  ];

  return (
    <Flex
      fillWidth
      maxWidth="m"
      direction="row"
      alignItems="center"
      style={{
        marginTop: "5rem",
        marginBottom: "5rem",
        paddingLeft: 0,
      }}
      className="clients-mobile"
    >
      {/* Logos on the right - positioned where portfolio container starts from right */}
      <Flex
        flex={7}
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          alignItems: "center",
          paddingLeft: "0.0rem",
          justifyContent: "flex-end",
        }}
        className="clients-logos"
      >
        {clientLogos.map((client, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "90px",
            }}
          >
            <Image
              src={client.src}
              alt={client.alt}
              width={90}
              height={54}
              style={{
                maxWidth: "100%",
                maxHeight: "54px",
                objectFit: "contain",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}
            />
            <span
              style={{
                marginTop: "0.7rem",
                fontSize: "0.7rem",
                color: "#fff",
                textAlign: "center",
                fontWeight: 500,
                wordBreak: "break-word",
              }}
            >
              {client.name}
            </span>
          </div>
        ))}
      </Flex>

      {/* Heading on the right - exact same as Portfolio */}
      <Flex
        flex={0.0}
        justifyContent="center"
        alignItems="center"
        style={{ paddingLeft: "7rem", paddingRight: "-1rem" }}
        className="clients-title"
      >
        <div
          style={{
            fontSize: "2.5rem",
            fontWeight: 600,
            color: "inherit",
            textAlign: "center",
          }}
        >
          OUR CLIENTS
        </div>
      </Flex>
    </Flex>
  );
}
