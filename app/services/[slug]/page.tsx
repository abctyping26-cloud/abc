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

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

async function fetchServiceData(slug: string) {
  const fallback = getServiceDetail(slug);
  if (slug === "template") return fallback;

  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/client/services/${slug}`, {
      next: { revalidate: 0 },
    });
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data?.service) {
        const s = json.data.service;
        return {
          slug: s.slug || fallback.slug,
          id: s.serviceId || fallback.id,
          name: s.name || fallback.name,
          category: s.category || fallback.category,
          tagline: s.tagline || fallback.tagline,
          requiredDocuments:
            s.requiredDocuments && s.requiredDocuments.length > 0
              ? s.requiredDocuments.map((d: { title: string; description?: string; mandatory?: boolean }) => ({
                  title: d.title,
                  description: d.description || "",
                  mandatory: Boolean(d.mandatory),
                }))
              : fallback.requiredDocuments,
          faqs:
            s.faqs && s.faqs.length > 0
              ? s.faqs.map((f: { question: string; answer: string }) => ({
                  question: f.question,
                  answer: f.answer,
                }))
              : fallback.faqs,
        };
      }
    }
  } catch {
    // If backend is unavailable or during static export, seamlessly use catalog fallback
  }

  return fallback;
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
  const service = await fetchServiceData(slug);

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
  const service = await fetchServiceData(slug);

  return (
    <>
      <ServiceDetailView
        service={service}
        isTemplateMode={slug === "template"}
      />
      <Footer />
      <FloatingActions serviceContext={service.name} />
    </>
  );
}

