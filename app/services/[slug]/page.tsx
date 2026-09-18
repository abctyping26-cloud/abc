import type { Metadata } from "next";
import { CATEGORIES, getServiceDetail, slugify } from "../../data/servicesData";
import ServiceDetailView from "../../components/ServiceDetailView";
import Footer from "../../components/Footer";
import FloatingActions from "../../components/FloatingActions";

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  const serviceParams = CATEGORIES.flatMap((category) =>
    category.services.map((service) => ({
      slug: slugify(service.name),
    }))
  );

  return [{ slug: "template" }, ...serviceParams];
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceDetail(slug);

  return {
    title: `${service.name} in Abu Dhabi & UAE | ABC Typing Services`,
    description: service.tagline,
    openGraph: {
      title: `${service.name} | ABC Typing Services UAE`,
      description: service.tagline,
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceDetail(slug);

  return (
    <>
      <ServiceDetailView
        service={service}
        isTemplateMode={slug === "template"}
      />
      <Footer />
      <FloatingActions />
    </>
  );
}
