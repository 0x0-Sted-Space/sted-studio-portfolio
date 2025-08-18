"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

import { Flex, ToggleButton } from "@/once-ui/components";
import styles from "@/components/Header.module.scss";

import { routes, display } from "@/app/resources";

import { routing } from "@/i18n/routing";
import { Locale, usePathname, useRouter } from "@/i18n/routing";
import { renderContent } from "@/app/resources";
import { useTranslations } from "next-intl";
import { i18n } from "@/app/resources/config";

type TimeDisplayProps = {
  timeZone: string;
  locale?: string; // Optionally allow locale, defaulting to 'en-GB'
};

const TimeDisplay: React.FC<TimeDisplayProps> = ({
  timeZone,
  locale = "en-GB",
}) => {
  return <></>;
};

export default TimeDisplay;

export const Header = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname() ?? "";
  const params = useParams();

  function handleLanguageChange(locale: string) {
    const nextLocale = locale as Locale;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  const t = useTranslations();
  const { person, home, about, blog, work, gallery, products } = renderContent(t);

  return (
    <>
      <Flex
        className={styles.mask}
        position="fixed"
        zIndex={9}
        fillWidth
        minHeight="80"
        justifyContent="center"
      ></Flex>
      <Flex
        className={styles.position}
        as="header"
        zIndex={9}
        fillWidth
        padding="8"
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        style={{ width: "100%" }}
      >
        {/* Logo left */}
        <Flex
          className="sted-logo-responsive"
          alignItems="center"
          style={{ minWidth: 120 }}
        >
          <span style={{ fontWeight: 700, fontSize: 22, letterSpacing: 1 }}>
            Sted.Studio
          </span>
        </Flex>
        {/* Navbar center */}
        <Flex fillWidth justifyContent="center">
          <Flex
            background="surface"
            border="neutral-medium"
            borderStyle="solid-1"
            radius="m-4"
            shadow="l"
            padding="4"
            justifyContent="center"
          >
            <Flex gap="4" textVariant="body-default-s">
              {routes["/"] && (
                <ToggleButton
                  prefixIcon="home"
                  href={`/${params?.locale}`}
                  selected={pathname === "/"}
                >
                  <Flex paddingX="2" hide="s">
                    {home.label}
                  </Flex>
                </ToggleButton>
              )}
              {routes["/about"] && (
                <ToggleButton
                  prefixIcon="person"
                  href={`/${params?.locale}/about`}
                  selected={pathname === "/about"}
                >
                  <Flex paddingX="2" hide="s">
                    {about.label}
                  </Flex>
                </ToggleButton>
              )}
              {routes["/work"] && (
                <ToggleButton
                  prefixIcon="grid"
                  href={`/${params?.locale}/work`}
                  selected={pathname.startsWith("/work")}
                >
                  <Flex paddingX="2" hide="s">
                    {work.label}
                  </Flex>
                </ToggleButton>
              )}
              {routes["/blog"] && (
                <ToggleButton
                  prefixIcon="book"
                  href={`/${params?.locale}/blog`}
                  selected={pathname.startsWith("/blog")}
                >
                  <Flex paddingX="2" hide="s">
                    {blog.label}
                  </Flex>
                </ToggleButton>
              )}
              {routes["/products"] && (
                <ToggleButton
                  prefixIcon="package"
                  href={`/${params?.locale}/products`}
                  selected={pathname.startsWith("/products")}
                >
                  <Flex paddingX="2" hide="s">
                    Products & Services
                  </Flex>
                </ToggleButton>
              )}
              {routes["/gallery"] && (
                <ToggleButton
                  prefixIcon="gallery"
                  href={`/${params?.locale}/gallery`}
                  selected={pathname.startsWith("/gallery")}
                >
                  <Flex paddingX="2" hide="s">
                    {gallery.label}
                  </Flex>
                </ToggleButton>
              )}
              {routes["/map"] && (
                <ToggleButton
                  prefixIcon="map"
                  href={`/${params?.locale}/map`}
                  selected={pathname.startsWith("/map")}
                >
                  <Flex paddingX="2" hide="s">
                    Map
                  </Flex>
                </ToggleButton>
              )}
            </Flex>
          </Flex>
        </Flex>
        {/* Controls right */}
        <Flex
          justifyContent="flex-end"
          alignItems="center"
          style={{ minWidth: 120 }}
        >
          {routing.locales.length > 1 && (
            <Flex
              background="surface"
              border="neutral-medium"
              borderStyle="solid-1"
              radius="m-4"
              shadow="l"
              padding="4"
              gap="2"
              justifyContent="center"
            >
              {i18n &&
                routing.locales.map((locale, index) => (
                  <ToggleButton
                    key={index}
                    selected={params?.locale === locale}
                    onClick={() => handleLanguageChange(locale)}
                    className={
                      (isPending && "pointer-events-none opacity-60") || ""
                    }
                  >
                    {locale.toUpperCase()}
                  </ToggleButton>
                ))}
            </Flex>
          )}
          <Flex hide="s">
            {display.time && <TimeDisplay timeZone={person.location} />}
          </Flex>
        </Flex>
        <style>{`
                    @media (max-width: 600px) {
                        .sted-logo-responsive {
                            justify-content: center !important;
                            align-items: center !important;
                            margin-left: auto !important;
                            margin-right: auto !important;
                            width: 100% !important;
                        }
                        header[class*='position'] {
                            flex-direction: column !important;
                            align-items: center !important;
                        }
                    }
                    @media (min-width: 601px) {
                        .sted-logo-responsive {
                            justify-content: flex-start !important;
                            align-items: flex-start !important;
                            margin-left: 0 !important;
                            margin-right: auto !important;
                            width: auto !important;
                        }
                        header[class*='position'] {
                            flex-direction: row !important;
                            align-items: center !important;
                        }
                    }
                `}</style>
      </Flex>
    </>
  );
};
