"use client";

import React, { useState, useRef } from "react";
import { Flex, Tag } from "@/once-ui/components";
import { Projects } from "@/components/work/Projects";
import { Clients } from "@/components/work/Clients";
import { Marquee } from "@/components/magicui/marquee";

interface WorkClientProps {
  allProjects: any[];
  locale: string;
}

const inhouseLogos = [
  {
    name: "1EthSkies - web 3",
    img: "/images/projects/project-01/1EthSkies - web 3.png",
    desc: "Web3 project",
  },
  {
    name: "Acromarc",
    img: "/images/projects/project-01/Acromarc.png",
    desc: "Acromarc project",
  },
  {
    name: "Add on Prop",
    img: "/images/projects/project-01/Add on Prop.png",
    desc: "Add on Prop project",
  },
  {
    name: "Arth.Bhumi -1",
    img: "/images/projects/project-01/Arth.Bhumi -1.png",
    desc: "Arth.Bhumi project",
  },
  {
    name: "Cave Life",
    img: "/images/projects/project-01/Cave Life.png",
    desc: "Cave Life project",
  },
  {
    name: "Ehance 42",
    img: "/images/projects/project-01/Ehance 42.png",
    desc: "Ehance 42 project",
  },
  {
    name: "GitMatch",
    img: "/images/projects/project-01/GitMatch.png",
    desc: "GitMatch project",
  },
  {
    name: "Good Food Co",
    img: "/images/projects/project-01/Good Food Co.png",
    desc: "Good Food Co project",
  },
  {
    name: "Nisa Logo Full Copy",
    img: "/images/projects/project-01/Nisa Logo Full copy.png",
    desc: "Nisa Logo Full Copy project",
  },
  {
    name: "Sted Space Logo",
    img: "/images/projects/project-01/Sted Space Logo.png",
    desc: "Sted Space Logo project",
  },
  {
    name: "Vizag Startups",
    img: "/images/projects/project-01/Vizag startups.png",
    desc: "Vizag Startups project",
  },
  {
    name: "web 3 letters",
    img: "/images/projects/project-01/web 3 letters.png",
    desc: "Web 3 Letters project",
  },
];

const cleanBrandName = (name: string) => {
  // Remove common extra words and trim
  return name
    .replace(
      /logo full copy|logo|full copy|copy| - web 3| -1|\.jfif|\.png|\.jpg|\.jpeg/gi,
      ""
    )
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

const LogoCard = ({ img, name }: { img: string; name: string }) => {
  return (
    <div
      className="logo-card"
      style={{
        width: "145px",
        height: "145px",
        flex: "0 0 145px",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "0",
        overflow: "hidden",
        flexDirection: "column",
      }}
    >
      <img
        src={img}
        alt={cleanBrandName(name)}
        style={{
          maxWidth: "92%",
          maxHeight: "78%",
          objectFit: "contain",
          zIndex: 1,
          marginBottom: "0.5rem",
          display: "block",
        }}
      />
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "0.1rem",
          padding: "0.2rem 0.2rem 0.1rem 0.2rem",
          minHeight: "2.1em",
          boxSizing: "border-box",
        }}
      >
        <span
          style={{
            fontSize: "0.85rem",
            color: "#fff",
            fontWeight: 600,
            textShadow: "0 1px 4px rgba(0,0,0,0.3)",
            textAlign: "center",
            wordBreak: "break-word",
            width: "100%",
          }}
        >
          {cleanBrandName(name)}
        </span>
      </div>
    </div>
  );
};

function RecifyCard({
  img,
  landingPage,
}: {
  img: string;
  landingPage: string;
}) {
  const [isHovered, setIsHovered] = React.useState(false);
  const [showLandingPage, setShowLandingPage] = React.useState(false);
  const [zoomed, setZoomed] = React.useState(false);
  const modalRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (zoomed && showLandingPage && modalRef.current) {
      modalRef.current.scrollTop = 0;
    }
  }, [zoomed, showLandingPage]);
  return (
    <React.Fragment>
      <div
        style={{
          borderRadius: "1.5rem",
          border: "1px solid rgba(255,255,255,0.18)",
          padding: "1.4rem 1.05rem 1.05rem 1.05rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          minHeight: "224px",
          width: "100%",
          maxWidth: "224px",
          transition: "transform 0.2s",
          cursor: "pointer",
          position: "relative",
          background: "none",
          boxShadow: "none",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={img}
          alt="Recify"
          style={{
            width: "100%",
            maxWidth: "126px",
            maxHeight: "56px",
            objectFit: "contain",
            borderRadius: "1rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
            display: "block",
            margin: "0 auto",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "0.5rem",
            marginTop: "1.1rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            type="button"
            onClick={() => setShowLandingPage(true)}
            style={{
              background: isHovered ? "rgba(0,0,0,1)" : "rgba(0,0,0,0.85)",
              color: "#fff",
              borderRadius: "2rem",
              fontWeight: 600,
              textDecoration: "none",
              textAlign: "center",
              display: "inline-block",
              padding: "0.35rem 0.8rem",
              boxShadow: isHovered
                ? "0 2px 12px rgba(0,0,0,0.28)"
                : "0 2px 8px rgba(0,0,0,0.18)",
              fontSize: "0.85rem",
              cursor: "pointer",
              transition: "background 0.2s, box-shadow 0.2s",
              opacity: 1,
              border: isHovered ? "2px solid #fff" : "2px solid transparent",
            }}
          >
            Landing Page
          </button>
        </div>
        <div
          style={{
            marginTop: "1rem",
            color: "#fff",
            fontSize: "0.75rem",
            textAlign: "left",
            lineHeight: 1.5,
            opacity: 0.85,
            fontWeight: 300,
            width: "100%",
          }}
        >
          Handled 0-1, product, tokenomics, branding & design, content, website
          ux/ui.
        </div>
      </div>
      {landingPage && showLandingPage && (
        <div
          ref={modalRef}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.85)",
            display: "flex",
            alignItems: zoomed ? "flex-start" : "center",
            justifyContent: "center",
            zIndex: 2000,
            overflowY: zoomed ? "auto" : "hidden",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowLandingPage(false);
          }}
        >
          <img
            src={landingPage}
            alt="Recify Landing Page"
            onClick={(e) => {
              e.stopPropagation();
              setZoomed((z) => !z);
            }}
            style={{
              maxWidth: zoomed ? "none" : "96vw",
              maxHeight: zoomed ? "none" : "96vh",
              width: zoomed ? "100%" : "auto",
              height: zoomed ? "auto" : "auto",
              objectFit: zoomed ? "contain" : "contain",
              borderRadius: "1rem",
              boxShadow: "0 4px 32px rgba(0,0,0,0.5)",
              background: "#fff",
              display: "block",
              margin: "0 auto",
              cursor: "zoom-" + (zoomed ? "out" : "in"),
              transition: "all 0.3s cubic-bezier(.4,2,.6,1)",
            }}
          />
        </div>
      )}
    </React.Fragment>
  );
}

export default function WorkClient({ allProjects, locale }: WorkClientProps) {
  const [enlarged, setEnlarged] = useState(false);
  const swiperRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Flex fillWidth maxWidth="m" direction="column">
        <Flex
          fillWidth
          maxWidth="m"
          direction="row"
          alignItems="center"
          style={{ marginBottom: "1rem", gap: "0.0rem" }}
          className="products-brands-mobile"
        >
          <Flex flex={0.5} className="products-title">
            <h2
              style={{
                fontSize: "2rem",
                fontWeight: 700,
                textAlign: "left",
                marginLeft: 0,
                paddingLeft: 0,
              }}
            >
              Products and Brands Brewing at STED
            </h2>
          </Flex>
          <Flex
            flex={2.5}
            justifyContent="center"
            alignItems="center"
            className="products-image"
          >
            <img
              src="/images/projects/project-01/Inhouse.jpeg"
              alt="Hero"
              style={{
                width: "50%",
                height: "auto",
                objectFit: "unset",
                borderRadius: "1rem",
                marginBottom: "2rem",
                background: "#000",
                cursor: "pointer",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
              }}
              onClick={() => setEnlarged(true)}
            />
          </Flex>
        </Flex>
        {enlarged && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0,0,0,0.8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
              cursor: "zoom-out",
            }}
            onClick={() => setEnlarged(false)}
          >
            <img
              src="/images/projects/project-01/Inhouse.jpeg"
              alt="Hero Enlarged"
              style={{
                maxWidth: "90vw",
                maxHeight: "90vh",
                borderRadius: "1rem",
                boxShadow: "0 4px 32px rgba(0,0,0,0.5)",
              }}
            />
          </div>
        )}
        <Flex
          fillWidth
          maxWidth="m"
          direction="row"
          alignItems="center"
          style={{ marginBottom: "2rem", paddingLeft: 0 }}
          className="portfolio-mobile"
        >
          <Flex
            flex={9}
            style={{ paddingLeft: "0.0rem", overflow: "visible" }}
            className="portfolio-content"
          >
            <iframe
              style={{
                border: "1px solid rgba(0, 0, 0, 0.1)",
                borderRadius: "1rem",
                width: "200%",
                height: "675px",
                marginBottom: "2rem",
              }}
              src="https://embed.figma.com/design/YF7oPMk3ukKlOrzis6JYwL/Sted-Studio-Portfolio?node-id=0-1&embed-host=share"
              allowFullScreen
            />
          </Flex>
          <Flex
            flex={0.0}
            justifyContent="center"
            alignItems="center"
            style={{ paddingLeft: "7rem", paddingRight: "-1rem" }}
            className="portfolio-title"
          >
            <div
              style={{
                fontSize: "2.5rem",
                fontWeight: 600,
                color: "inherit",
                textAlign: "center",
              }}
            >
              Our Portfolio
            </div>
          </Flex>
        </Flex>

        {/* Clients Section */}
        <Clients />

        {/* Collabs Section */}
        <Flex
          fillWidth
          maxWidth="m"
          alignItems="center"
          style={{ marginTop: "5rem", marginBottom: "5rem", gap: "4rem" }}
          className="collabs-mobile"
        >
          <h2
            style={{ fontSize: "2.5rem", fontWeight: 700, marginRight: "2rem" }}
            className="collabs-title"
          >
            Colabs
          </h2>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "2rem",
              alignItems: "center",
            }}
            className="collabs-logos"
          >
            {/* Logos in alphabetical order */}
            {[
              { name: "Antelope", file: "Antelope.png" },
              { name: "Biji Biji", file: "Biji Biji.png" },
              { name: "Botclub", file: "Botclub.jpg" },
              { name: "Innovators Guild", file: "Innovators Guild.jfif" },
              { name: "Mereka", file: "Mereka.jfif" },
              { name: "Smacoteq", file: "Smacoteq.png" },
              {
                name: "Street Feeders Of Kuala Lumpur",
                file: "Street Feeders Of Kuala Lumpur.png",
              },
              { name: "Student Chakra", file: "Student Chakra.png" },
              { name: "Thought For Food", file: "Thought For Food.png" },
              { name: "Vizag startups", file: "Vizag startups.png" },
              { name: "Vizag Volunteers", file: "Vizag Volunteers.png" },
              { name: "Wilded", file: "wilded.jpeg" },
            ]
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((logo) => (
                <div
                  key={logo.name}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "75px",
                  }}
                >
                  <img
                    src={`/images/projects/project-01/${logo.file}`}
                    alt={logo.name}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "74px",
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
                    {logo.name}
                  </span>
                </div>
              ))}
          </div>
        </Flex>
        {/* Inhouse Section - single Marquee row */}
        <Flex
          fillWidth
          maxWidth="m"
          direction="column"
          alignItems="center"
          style={{ marginBottom: "5rem" }}
        >
          <h2
            style={{
              fontSize: "3rem",
              fontWeight: 700,
              marginBottom: "2rem",
              textAlign: "right",
              color: "#fff",
              width: "100%",
            }}
          >
            Inhouse
          </h2>
          <div
            style={{ width: "100vw", overflow: "hidden", padding: "0 1rem" }}
          >
            <Marquee style={{ gap: "0.8rem" }}>
              {[...inhouseLogos, ...inhouseLogos].map((logo, idx) => (
                <LogoCard
                  key={logo.name + idx}
                  img={logo.img}
                  name={logo.name}
                />
              ))}
            </Marquee>
          </div>
        </Flex>
        {/* Case Studies Section - Bento Grid with Glassmorphic Cards */}
        <Flex
          fillWidth
          maxWidth="m"
          direction="column"
          alignItems="flex-start"
          style={{ marginBottom: "5rem" }}
        >
          <h2
            style={{
              fontSize: "2.5rem",
              fontWeight: 700,
              marginBottom: "2.5rem",
              textAlign: "left",
              color: "#fff",
              width: "100%",
            }}
          >
            Web3 Portfolio
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "2rem",
              width: "100%",
              maxWidth: "1100px",
              justifyItems: "center",
            }}
          >
            {[
              {
                name: "Griffex",
                img: "/images/projects/project-01/Griffex.png",
                proofOfCare: "/images/projects/project-01/Griffex poc.pdf",
                description:
                  "Handled 0-1, product, tokenomics, proof of care, indexes, staking. While in product, research & content block, worked alongside design, and marketing teams to ship griffex.",
              },
              {
                name: "Decubes",
                img: "/images/projects/project-01/Decubes.png",
                onePager: "/images/projects/project-01/Decubes One page.pdf",
                description:
                  "Handled 0-1, product, tokenomics, branding & design, content, website and closed collabs with India Accelerator to trail with their co-working spaces.",
              },
              {
                name: "Gladage",
                img: "/images/projects/project-01/Gladage.png",
                website:
                  "https://web.archive.org/web/20190124131314/https://gladage.com/",
                whitepaper:
                  "/images/projects/project-01/Gladage_whitepaper.pdf",
                x: "https://x.com/GladAgeOfficial",
                description:
                  "Handled 0-1, product, tokenomics, branding & design, content, website and worked towards tapping 3MN$ underwriting. Handled Marketing & PR.",
              },
              {
                name: "Enblick",
                img: "/images/projects/project-01/Enblick.png",
                onePager: "/images/projects/project-01/Enblick v1.02.pdf",
                description:
                  "Handled 0-1, product, tokenomics, branding & design, content, website and onepager.",
              },
              {
                name: "Antelope",
                img: "/images/projects/project-01/Antelope.png",
                website: "https://antelope.link/",
                whitepaper:
                  "/images/projects/project-01/Antelope Whitepaper.pdf",
                description:
                  "Helped with thesis. Handled 0-1, product, tokenomics, branding & design, content, website. one pagers, light paper & whitepapers, bplans and pitchdecks.",
                unTag: true,
              },
              {
                name: "Smacoteq",
                img: "/images/projects/project-01/Smacoteq.png",
                website: "https://smacoteq.com/",
                x: "https://x.com/smacoteq",
                description:
                  "antelope rebranded as smacoteq for maritime markets.",
              },
              {
                name: "Lenspost",
                img: "/images/projects/project-01/Lenspost.png",
                figma:
                  "https://www.figma.com/proto/9xS9zzjyRBwJA3kLG3GShE/Lens-post-User-Interface?page-id=0%3A1&node-id=2-3432&p=f&viewport=910%2C312%2C0.07&t=JGHBipANxs5Fk3BT-1&scaling=scale-down-width&content-scaling=fixed",
                description: "handled ux/ui, branding & landing page.",
              },
              {
                name: "Steamrole",
                img: "/images/projects/project-01/Steamrole.png",
                website:
                  "https://web.archive.org/web/20220312193858/https://rolecoin.steamrole.org/#section-hero",
                x: "https://x.com/steamrole",
                description:
                  "Handled revamping product, tokenomics, branding & design, content, website and relaunch. Marketing and bounty programs.",
              },
              {
                name: "TCU",
                img: "/images/projects/project-01/TCU.png",
                website: "https://www.thecryptoupdates.com/",
                x: "https://x.com/TheCryptoupdats",
                description:
                  "Handled 0-1, product, branding & design, content architecture & strategy, website, full scale deployment and scaling of content system. Helped the team hit 700k+ footprint with power of content.",
              },
              {
                name: "Unipeer",
                img: "/images/projects/project-01/unipeer.png",
                figma:
                  "https://www.figma.com/proto/VEHGCUPiXYAh2TVZZwhHD1/Unipeer-V0.1?page-id=0%3A1&node-id=61-340&viewport=3894%2C113%2C0.69&t=MqsrlwNcRmjH269I-1&scaling=min-zoom&content-scaling=fixed",
                description:
                  "Handled 0-1, product, tokenomics, branding & design, content, website landing page ux/ui.",
              },
              {
                name: "Richmint",
                img: "/images/projects/project-01/Richmint.png",
                whitepaper: "/images/projects/project-01/Richmint.pdf",
                description:
                  "Handled 0-1, product, tokenomics, branding & design, content. whitepaper.",
              },
            ].map((props) => {
              const {
                name,
                img,
                website,
                whitepaper,
                proofOfCare,
                onePager,
                figma,
                x,
                description,
                unTag,
              } = props;
              const isAntelope = name === "Antelope";
              return (
                <React.Fragment key={name}>
                  <div
                    style={{
                      borderRadius: "1.5rem",
                      border: "1px solid rgba(255,255,255,0.18)",
                      padding: "1.4rem 1.05rem 1.05rem 1.05rem",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      minHeight: "224px",
                      width: "100%",
                      maxWidth: "224px",
                      transition: "transform 0.2s",
                      cursor: "pointer",
                      position: "relative",
                      background: "none",
                      boxShadow: "none",
                    }}
                  >
                    <img
                      src={img}
                      alt={name}
                      style={{
                        width: "100%",
                        maxWidth: "126px",
                        maxHeight: "56px",
                        objectFit: "contain",
                        borderRadius: "1rem",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
                        display: "block",
                        margin: "0 auto",
                      }}
                    />
                    {isAntelope && (
                      <div
                        style={{
                          marginTop: "0.5rem",
                          fontWeight: 600,
                          color: "#fff",
                          fontSize: "1rem",
                          textAlign: "center",
                        }}
                      >
                        {name}
                      </div>
                    )}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: isAntelope ? "0.25rem" : "0.5rem",
                        marginTop: "1.1rem",
                        justifyContent: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      {isAntelope && (
                        <span
                          style={{
                            background: "#222",
                            color: "#fff",
                            borderRadius: "1.2rem",
                            fontWeight: 500,
                            fontSize: "0.65rem",
                            padding: "0.13rem 0.5rem",
                            marginRight: "0.2rem",
                            border: "1px solid #fff",
                            opacity: 0.85,
                            letterSpacing: "0.01em",
                            display: "inline-block",
                          }}
                        >
                          UN recognized solution
                        </span>
                      )}
                      {website && (
                        <a
                          href={website}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            background: "rgba(0,0,0,0.85)",
                            color: "#fff",
                            borderRadius: "2rem",
                            fontWeight: 600,
                            textDecoration: "none",
                            textAlign: "center",
                            display: "inline-block",
                            padding: isAntelope
                              ? "0.22rem 0.6rem"
                              : "0.35rem 0.8rem",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
                            fontSize: isAntelope ? "0.70rem" : "0.85rem",
                            cursor: "pointer",
                            border: "2px solid transparent",
                            transition:
                              "border-color 0.2s, background 0.2s, box-shadow 0.2s",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.borderColor = "#fff")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.borderColor = "transparent")
                          }
                        >
                          Website
                        </a>
                      )}
                      {proofOfCare && (
                        <a
                          href={proofOfCare}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            background: "rgba(0,0,0,0.85)",
                            color: "#fff",
                            borderRadius: "2rem",
                            fontWeight: 600,
                            textDecoration: "none",
                            textAlign: "center",
                            display: "inline-block",
                            padding: isAntelope
                              ? "0.22rem 0.6rem"
                              : "0.35rem 0.8rem",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
                            fontSize: isAntelope ? "0.70rem" : "0.85rem",
                            cursor: "pointer",
                            border: "2px solid transparent",
                            transition:
                              "border-color 0.2s, background 0.2s, box-shadow 0.2s",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.borderColor = "#fff")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.borderColor = "transparent")
                          }
                        >
                          Proof Of Care
                        </a>
                      )}
                      {onePager && (
                        <a
                          href={onePager}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            background: "rgba(0,0,0,0.85)",
                            color: "#fff",
                            borderRadius: "2rem",
                            fontWeight: 600,
                            textDecoration: "none",
                            textAlign: "center",
                            display: "inline-block",
                            padding: isAntelope
                              ? "0.22rem 0.6rem"
                              : "0.35rem 0.8rem",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
                            fontSize: isAntelope ? "0.70rem" : "0.85rem",
                            cursor: "pointer",
                            border: "2px solid transparent",
                            transition:
                              "border-color 0.2s, background 0.2s, box-shadow 0.2s",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.borderColor = "#fff")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.borderColor = "transparent")
                          }
                        >
                          One-pager
                        </a>
                      )}
                      {whitepaper && (
                        <a
                          href={whitepaper}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            background: "rgba(0,0,0,0.85)",
                            color: "#fff",
                            borderRadius: "2rem",
                            fontWeight: 600,
                            textDecoration: "none",
                            textAlign: "center",
                            display: "inline-block",
                            padding: isAntelope
                              ? "0.22rem 0.6rem"
                              : "0.35rem 0.8rem",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
                            fontSize: isAntelope ? "0.70rem" : "0.85rem",
                            cursor: "pointer",
                            border: "2px solid transparent",
                            transition:
                              "border-color 0.2s, background 0.2s, box-shadow 0.2s",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.borderColor = "#fff")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.borderColor = "transparent")
                          }
                        >
                          Whitepaper
                        </a>
                      )}
                      {figma && name !== "Recify" && (
                        <a
                          href={figma}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            background: "rgba(0,0,0,0.85)",
                            color: "#fff",
                            borderRadius: "2rem",
                            fontWeight: 600,
                            textDecoration: "none",
                            textAlign: "center",
                            display: "inline-block",
                            padding: isAntelope
                              ? "0.22rem 0.6rem"
                              : "0.35rem 0.8rem",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
                            fontSize: isAntelope ? "0.70rem" : "0.85rem",
                            cursor: "pointer",
                            border: "2px solid transparent",
                            transition:
                              "border-color 0.2s, background 0.2s, box-shadow 0.2s",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.borderColor = "#fff")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.borderColor = "transparent")
                          }
                        >
                          Figma Prototype
                        </a>
                      )}
                      {x && (
                        <a
                          href={x}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            background: "rgba(0,0,0,0.85)",
                            color: "#fff",
                            borderRadius: "2rem",
                            fontWeight: 600,
                            textDecoration: "none",
                            textAlign: "center",
                            display: "inline-block",
                            padding: isAntelope
                              ? "0.22rem 0.6rem"
                              : "0.35rem 0.8rem",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
                            fontSize: isAntelope ? "0.70rem" : "0.85rem",
                            cursor: "pointer",
                            border: "2px solid transparent",
                            transition:
                              "border-color 0.2s, background 0.2s, box-shadow 0.2s",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.borderColor = "#fff")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.borderColor = "transparent")
                          }
                        >
                          X
                        </a>
                      )}
                    </div>
                    {description && (
                      <div
                        style={{
                          marginTop: "1rem",
                          color: "#fff",
                          fontSize: "0.75rem",
                          textAlign: "left",
                          lineHeight: 1.5,
                          opacity: 0.85,
                          fontWeight: 300,
                          width: "100%",
                        }}
                      >
                        {description}
                      </div>
                    )}
                  </div>
                </React.Fragment>
              );
            })}
            <RecifyCard
              img="/images/projects/project-01/Recify.png"
              landingPage="/images/projects/project-01/Recify landing page.png"
            />
          </div>
        </Flex>
        {/* PanoramaSlider removed for Splide integration */}
        <Projects projects={allProjects} />
      </Flex>
      <style>{`
        @media (max-width: 600px) {
          .logo-card {
            width: 100% !important;
            max-width: 320px !important;
            height: auto !important;
            margin: 0 auto 1.2rem auto !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
          }
          .logo-card img {
            max-width: 90% !important;
            max-height: 70vw !important;
            height: auto !important;
          }
          .logo-card span {
            font-size: 0.95rem !important;
          }
          .recify-card {
            width: 100% !important;
            max-width: 320px !important;
            margin: 0 auto 1.2rem auto !important;
          }
          /* Products and Brands section: stack image below title */
          .products-brands-mobile {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 1.5rem !important;
          }
          .products-brands-mobile .products-title {
            margin-bottom: 1.2rem !important;
            text-align: left !important;
            width: 100% !important;
          }
          .products-brands-mobile .products-image {
            width: 100% !important;
            max-width: 320px !important;
            margin: 0 auto 2rem auto !important;
            display: block !important;
          }
          /* Portfolio section: stack title above content */
          .portfolio-mobile {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 1.5rem !important;
          }
          .portfolio-mobile .portfolio-title {
            margin-bottom: 1.2rem !important;
            text-align: left !important;
            width: 100% !important;
          }
          .portfolio-mobile .portfolio-content {
            width: 100% !important;
            max-width: 100vw !important;
            margin: 0 !important;
          }
          /* Clients section: stack title above logos */
          .clients-mobile {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 1.2rem !important;
          }
          .clients-mobile .clients-title {
            padding-left: 0 !important;
            padding-right: 0 !important;
            margin-bottom: 1.2rem !important;
            justify-content: flex-start !important;
            width: 100% !important;
          }
          .clients-mobile .clients-title div {
            text-align: left !important;
            font-size: 2rem !important;
          }
          .clients-mobile .clients-logos {
            justify-content: center !important;
          }
          .clients-mobile .clients-logos {
            width: 100% !important;
            flex-wrap: wrap !important;
            justify-content: flex-start !important;
            gap: 1.2rem !important;
          }
          /* Collabs section: stack title above logos */
          .collabs-mobile {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 1.2rem !important;
          }
          .collabs-mobile .collabs-title {
            margin-bottom: 1.2rem !important;
            text-align: left !important;
            width: 100% !important;
          }
          .collabs-mobile .collabs-logos {
            width: 100% !important;
            flex-wrap: wrap !important;
            justify-content: flex-start !important;
            gap: 1.2rem !important;
          }
        }
      `}</style>
    </>
  );
}
