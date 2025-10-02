import { Metadata } from "next";
import { Flex, Heading, Text, Tag, Grid, Icon } from "@/once-ui/components";
import { baseURL } from "@/app/resources/config";
import { renderContent } from "@/app/resources";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations();
  const { products } = renderContent(t);

  const title = "Products & Services - Sted Studio";
  const description =
    "Explore our innovative products and comprehensive services for digital transformation";
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}/${locale}/products`,
      images: [{ url: ogImage, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

interface ProductCardProps {
  product: {
    title: string;
    description: string;
    image: string;
    status: string;
    tags: string[];
    url?: string;
  };
}

interface ServiceCardProps {
  service: {
    title: string;
    description: string;
    icon: string;
    features: string[];
    pricing: string;
  };
}

function ProductCard({ product }: ProductCardProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "live":
        return "green";
      case "beta":
        return "orange";
      case "in development":
        return "blue";
      case "coming soon":
        return "purple";
      default:
        return "neutral";
    }
  };

  const cardContent = (
    <Flex
      direction="column"
      background="surface"
      border="neutral-medium"
      borderStyle="solid-1"
      radius="l"
      padding="l"
      gap="m"
      style={{ 
        height: "100%",
        minWidth: "280px",
        maxWidth: "320px",
        flexShrink: 0,
        flexBasis: "300px",
        transition: "all 0.2s ease",
        cursor: product.url ? "pointer" : "default"
      }}
    >
      <Flex direction="column" gap="s">
        <Flex justifyContent="space-between" alignItems="flex-start">
          <Heading variant="heading-strong-s">{product.title}</Heading>
          <Tag
            variant="neutral"
            size="s"
            style={{
              backgroundColor: `var(--${getStatusColor(
                product.status
              )}-alpha-weak)`,
              color: `var(--${getStatusColor(product.status)}-solid-strong)`,
            }}
          >
            {product.status}
          </Tag>
        </Flex>

        <Text variant="body-default-s" onBackground="neutral-weak">
          {product.description}
        </Text>
      </Flex>

      <Flex wrap gap="xs">
        {product.tags.map((tag, index) => (
          <Tag key={index} variant="neutral" size="s">
            {tag}
          </Tag>
        ))}
      </Flex>
    </Flex>
  );

  if (product.url && product.url !== '#') {
    return (
      <a
        href={product.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none" }}
      >
        {cardContent}
      </a>
    );
  }

  return cardContent;
}

function ConsultationCard({ consultation }: { consultation: any }) {
  if (!consultation) {
    return null;
  }

  return (
    <Flex
      direction="column"
      background="brand-weak"
      border="brand-medium"
      borderStyle="solid-2"
      radius="xl"
      padding="xl"
      gap="l"
      style={{ 
        height: "100%",
        textAlign: "center",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <Flex direction="column" gap="m">
        <Flex alignItems="center" gap="m" justifyContent="center">
          <Icon name={consultation.icon as any} size="xl" />
          <Heading variant="heading-strong-m" onBackground="brand-strong">
            {consultation.title}
          </Heading>
        </Flex>

        <Text variant="body-default-m" onBackground="brand-medium">
          {consultation.description}
        </Text>
      </Flex>

      <Flex direction="column" gap="s">
        <Text variant="label-default-s" onBackground="brand-strong">
          What's Included:
        </Text>
        {consultation.features?.map((feature: string, index: number) => (
          <Flex key={index} alignItems="center" gap="xs" justifyContent="flex-start">
            <Icon name="check" size="xs" />
            <Text variant="body-default-xs" onBackground="brand-medium">
              {feature}
            </Text>
          </Flex>
        ))}
      </Flex>

      <a
        href={consultation.ctaUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none" }}
      >
        <Flex
          background="brand-strong"
          onBackground="brand-weak"
          padding="l"
          radius="l"
          gap="xs"
          alignItems="center"
          justifyContent="center"
          style={{
            transition: "all 0.2s ease",
            cursor: "pointer",
          }}
        >
          <Icon name="arrow-right" size="s" />
          <Text variant="label-default-m">{consultation.ctaText}</Text>
        </Flex>
      </a>
    </Flex>
  );
}

function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Flex
      direction="column"
      background="surface"
      border="neutral-medium"
      borderStyle="solid-1"
      radius="l"
      padding="xl"
      gap="l"
      style={{ height: "100%" }}
    >
      <Flex direction="column" gap="m">
        <Flex alignItems="center" gap="m">
          <Icon name={service.icon as any} size="l" />
          <Heading variant="heading-strong-s">{service.title}</Heading>
        </Flex>

        <Text variant="body-default-s" onBackground="neutral-weak">
          {service.description}
        </Text>
      </Flex>

      <Flex direction="column" gap="s">
        <Text variant="label-default-s" onBackground="neutral-strong">
          What's Included:
        </Text>
        {service.features.map((feature, index) => (
          <Flex key={index} alignItems="center" gap="xs">
            <Icon name="check" size="xs" />
            <Text variant="body-default-xs" onBackground="neutral-medium">
              {feature}
            </Text>
          </Flex>
        ))}
      </Flex>

      <Flex
        background="accent-weak"
        padding="m"
        radius="m"
        justifyContent="center"
      >
        <Text variant="label-default-s" onBackground="accent-strong">
          {service.pricing}
        </Text>
      </Flex>
    </Flex>
  );
}

function Banner({
  title,
  subtitle,
  ctaText,
  href,
  isDark = false,
}: {
  title: string;
  subtitle: string;
  ctaText: string;
  href: string;
  isDark?: boolean;
}) {
  return (
    <Flex
      direction="column"
      gap="l"
      paddingY="xl"
      paddingX="xl"
      background={isDark ? "neutral-strong" : "brand-weak"}
      border="neutral-medium"
      borderStyle="solid-1"
      radius="xl"
      fillWidth
      style={{ textAlign: "center" }}
    >
      <Flex direction="column" gap="m">
        <Heading
          variant="heading-strong-l"
          onBackground={isDark ? "neutral-weak" : "brand-strong"}
        >
          {title}
        </Heading>
        <Text
          variant="body-default-l"
          onBackground={isDark ? "neutral-medium" : "brand-medium"}
        >
          {subtitle}
        </Text>
      </Flex>

      <a
        href={href}
        style={{
          textDecoration: "none",
          alignSelf: "center",
        }}
      >
        <Flex
          background={isDark ? "accent-strong" : "brand-strong"}
          onBackground={isDark ? "accent-weak" : "brand-weak"}
          padding="l"
          paddingX="xl"
          radius="l"
          gap="xs"
          alignItems="center"
          style={{
            transition: "all 0.2s ease",
            cursor: "pointer",
          }}
        >
          <Icon name="arrow-right" size="s" />
          <Text variant="label-default-m">{ctaText}</Text>
        </Flex>
      </a>
    </Flex>
  );
}

export default async function Products({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = await params;
  unstable_setRequestLocale(locale);
  const t = await getTranslations();
  const { products, web2Services, web3Services } = renderContent(t);

  return (
    <Flex
      fillWidth
      gap="xl"
      direction="column"
      alignItems="center"
      maxWidth="m"
    >
      {/* Hero Section */}
      <Flex
        direction="column"
        gap="m"
        paddingY="l"
        style={{ textAlign: "center" }}
      >
        <Heading variant="display-strong-s">Products & Services</Heading>
        <Text
          variant="heading-default-xl"
          onBackground="neutral-medium"
          style={{ maxWidth: "var(--static-space-l)" }}
        >
          Innovative solutions and comprehensive services for your digital
          transformation journey
        </Text>
      </Flex>

      {/* Products Section */}
      <Flex fillWidth direction="column" gap="xl">
        <Flex direction="column" gap="m" style={{ textAlign: "center" }}>
          <Heading variant="heading-strong-l">{products.headline}</Heading>
          <Text
            variant="body-default-l"
            onBackground="neutral-medium"
            style={{ maxWidth: "var(--static-space-l)", textAlign: "center" }}
          >
            {products.subline}
          </Text>
        </Flex>

        <Flex
          direction="row"
          gap="l"
          fillWidth
          style={{
            overflowX: "auto",
            paddingBottom: "1rem",
            scrollbarWidth: "thin",
            scrollbarColor: "var(--neutral-medium) transparent"
          }}
        >
          {products.items.map((product: any, index: number) => (
            <ProductCard key={index} product={product} />
          ))}
        </Flex>
      </Flex>

      {/* Web2 Services Section */}
      <Flex fillWidth direction="column" gap="xl" paddingY="xl">
        <Flex direction="column" gap="m" style={{ textAlign: "center" }}>
          <Heading variant="heading-strong-l">{web2Services.headline}</Heading>
          <Text
            variant="body-default-l"
            onBackground="neutral-medium"
            style={{ maxWidth: "var(--static-space-l)", textAlign: "center" }}
          >
            {web2Services.subline}
          </Text>
        </Flex>

        {/* Consultation Card */}
        {web2Services.consultationCard && (
          <Flex justifyContent="center" fillWidth>
            <Flex style={{ maxWidth: "600px", width: "100%" }}>
              <ConsultationCard consultation={web2Services.consultationCard} />
            </Flex>
          </Flex>
        )}

        <Flex direction="column" gap="m" style={{ textAlign: "center" }}>
          <Text variant="heading-strong-m" onBackground="brand-strong">
            Web2 Solutions - Indian Market Rates
          </Text>
        </Flex>

        <Grid columns="repeat(auto-fit, minmax(300px, 1fr))" gap="l" fillWidth>
          {web2Services.offerings.map((service: any, index: number) => (
            <ServiceCard key={index} service={service} />
          ))}
        </Grid>
      </Flex>

      {/* Zero to One Journey Banner */}
      <Banner
        title="Ready for Your Zero to One Journey?"
        subtitle="Transform your ideas into reality with our comprehensive solutions. Prices start from ₹50,000 INR."
        ctaText="Start Your Journey"
        href="mailto:lucky3aeon@yahoo.com"
      />

      {/* Web3 Services Section */}
      <Flex fillWidth direction="column" gap="xl" paddingY="xl">
        <Flex direction="column" gap="m" style={{ textAlign: "center" }}>
          <Heading variant="heading-strong-l">{web3Services.headline}</Heading>
          <Text
            variant="body-default-l"
            onBackground="neutral-medium"
            style={{ maxWidth: "var(--static-space-l)", textAlign: "center" }}
          >
            {web3Services.subline}
          </Text>
          <Text variant="heading-strong-m" onBackground="accent-strong">
            Web3 Solutions - Global Market Rates
          </Text>
        </Flex>

        <Grid columns="repeat(auto-fit, minmax(300px, 1fr))" gap="l" fillWidth>
          {web3Services.offerings.map((service: any, index: number) => (
            <ServiceCard key={index} service={service} />
          ))}
        </Grid>
      </Flex>

      {/* Freelance Force Banner */}
      <Banner
        title="Hire Our Freelance Force"
        subtitle="Get things rolling on demand. One workshop for all your technological needs."
        ctaText="Hire Freelancers"
        href="mailto:lucky3aeon@yahoo.com"
        isDark={true}
      />

      {/* Final CTA Section */}
      <Flex
        direction="column"
        gap="m"
        paddingY="xl"
        background="surface"
        border="neutral-medium"
        borderStyle="solid-1"
        radius="l"
        padding="xl"
        fillWidth
        style={{ textAlign: "center" }}
      >
        <Heading variant="heading-strong-m">
          Ready to Start Your Project?
        </Heading>
        <Text variant="body-default-m" onBackground="neutral-medium">
          Whether you need Web2 or Web3 solutions, products built or services to
          accelerate your business, we're here to help. Let's discuss your
          vision and bring it to life.
        </Text>
        <Flex gap="m" justifyContent="center" wrap>
          <a
            href="mailto:lucky3aeon@yahoo.com"
            style={{
              textDecoration: "none",
              transition: "all 0.2s ease",
              borderRadius: "var(--radius-m)",
            }}
          >
            <Flex
              background="accent-strong"
              onBackground="accent-strong"
              padding="m"
              radius="m"
              gap="xs"
              alignItems="center"
            >
              <Icon name="email" size="s" />
              <Text variant="label-default-s">Get in Touch</Text>
            </Flex>
          </a>
        </Flex>
      </Flex>
    </Flex>
  );
}
