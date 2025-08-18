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

  return (
    <Flex
      direction="column"
      background="surface"
      border="neutral-medium"
      borderStyle="solid-1"
      radius="l"
      padding="xl"
      gap="l"
      style={{ height: "100%", transition: "transform 0.2s ease" }}
      className="product-card"
    >
      <Flex direction="column" gap="m">
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

      <style jsx>{`
        .product-card:hover {
          transform: translateY(-2px);
        }
      `}</style>
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
      style={{ height: "100%", transition: "transform 0.2s ease" }}
      className="service-card"
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
        background="accent-alpha-weak"
        padding="m"
        radius="m"
        justifyContent="center"
      >
        <Text variant="label-default-s" onBackground="accent-strong">
          {service.pricing}
        </Text>
      </Flex>

      <style jsx>{`
        .service-card:hover {
          transform: translateY(-2px);
        }
      `}</style>
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
  const { products, services } = renderContent(t);

  return (
    <Flex
      fillWidth
      gap="xl"
      direction="column"
      alignItems="center"
      maxWidth="m"
    >
      {/* Hero Section */}
      <Flex direction="column" gap="m" textAlign="center" paddingY="l">
        <Heading variant="display-strong-s">Products & Services</Heading>
        <Text
          variant="heading-default-xl"
          onBackground="neutral-medium"
          maxWidth="l"
        >
          Innovative solutions and comprehensive services for your digital
          transformation journey
        </Text>
      </Flex>

      {/* Products Section */}
      <Flex fillWidth direction="column" gap="xl">
        <Flex direction="column" gap="m" textAlign="center">
          <Heading variant="heading-strong-l">{products.headline}</Heading>
          <Text
            variant="body-default-l"
            onBackground="neutral-medium"
            maxWidth="l"
            textAlign="center"
          >
            {products.subline}
          </Text>
        </Flex>

        <Grid columns="repeat(auto-fit, minmax(320px, 1fr))" gap="l" fillWidth>
          {products.items.map((product: any, index: number) => (
            <ProductCard key={index} product={product} />
          ))}
        </Grid>
      </Flex>

      {/* Services Section */}
      <Flex fillWidth direction="column" gap="xl" paddingY="xl">
        <Flex direction="column" gap="m" textAlign="center">
          <Heading variant="heading-strong-l">{services.headline}</Heading>
          <Text
            variant="body-default-l"
            onBackground="neutral-medium"
            maxWidth="l"
            textAlign="center"
          >
            {services.subline}
          </Text>
        </Flex>

        <Grid columns="repeat(auto-fit, minmax(300px, 1fr))" gap="l" fillWidth>
          {services.offerings.map((service: any, index: number) => (
            <ServiceCard key={index} service={service} />
          ))}
        </Grid>
      </Flex>

      {/* CTA Section */}
      <Flex
        direction="column"
        gap="m"
        textAlign="center"
        paddingY="xl"
        background="surface"
        border="neutral-medium"
        borderStyle="solid-1"
        radius="l"
        padding="xl"
        fillWidth
      >
        <Heading variant="heading-strong-m">
          Ready to Start Your Project?
        </Heading>
        <Text variant="body-default-m" onBackground="neutral-medium">
          Whether you need a product built or services to accelerate your
          business, we're here to help. Let's discuss your vision and bring it
          to life.
        </Text>
        <Flex gap="m" justifyContent="center" wrap>
          <Flex
            as="a"
            href="mailto:lucky3aeon@yahoo.com"
            background="accent-solid"
            color="accent-on-solid"
            padding="m"
            radius="m"
            textDecoration="none"
            gap="xs"
            alignItems="center"
            style={{ transition: "all 0.2s ease" }}
          >
            <Icon name="email" size="s" />
            <Text variant="label-default-s">Get in Touch</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
