import type { Metadata, Viewport } from "next";
import AuthToast from "./components/AuthToast";
import AOSInit from "./components/AosInit";
import ServerWarmer from "./components/ServerWarmer";
import "aos/dist/aos.css";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.abcauh.ae"),
  title: {
    default: "ABC Typing Abu Dhabi | Visa, Business Setup & Typing Services",
    template: "%s | ABC Typing Abu Dhabi",
  },
  description:
    "Fast, accurate & hassle-free typing services in Abu Dhabi. New visa typing, Emirates ID, medical typing, 30/60 days visit visa, family & Golden visa, certificate attestation, PRO services, business setup, accounts & auditing, and company liquidation across UAE.",
  keywords: [
    "ABC Typing",
    "ABC Typing Abu Dhabi",
    "ABC Typing Center",
    "Visa typing Abu Dhabi",
    "New visa typing service",
    "Emirates ID typing",
    "Medical typing Abu Dhabi",
    "Entry permit typing",
    "Status change UAE",
    "Visit visa 30 days 60 days",
    "Tourist visa Abu Dhabi",
    "Family visa UAE",
    "Golden Visa nomination Abu Dhabi",
    "Residency application UAE",
    "Certificate attestation UAE",
    "Document clearing Abu Dhabi",
    "PRO services Abu Dhabi",
    "Business setup Abu Dhabi",
    "Company formation UAE",
    "Company liquidation UAE",
    "Trade license cancellation",
    "Accounts and auditing UAE",
    "VAT consultancy Abu Dhabi",
    "TAMM Abu Dhabi services",
    "Tasheel services Abu Dhabi",
    "Musaffah ME9 typing center",
  ],
  authors: [{ name: "ABC Typing Services", url: "https://www.abcauh.ae" }],
  creator: "ABC Typing Services",
  publisher: "ABC Typing Services",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "https://www.abcauh.ae",
  },
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: "https://www.abcauh.ae",
    siteName: "ABC Typing Services Abu Dhabi",
    title: "ABC Typing Abu Dhabi | Visa, Business Setup & Typing Services",
    description:
      "Expert government typing & PRO services in Abu Dhabi. New visa typing, Emirates ID, 30/60 days visit visa, Golden Visa, certificate attestation, business setup, accounts, and company liquidation.",
    images: [
      {
        url: "/hero.jpg",
        width: 1200,
        height: 630,
        alt: "ABC Typing Services Abu Dhabi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ABC Typing Abu Dhabi | Visa, Business Setup & Typing Services",
    description:
      "Expert government typing, visa services, Emirates ID, visit visas, certificate attestation, and business setup in Abu Dhabi.",
    images: ["/hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", sizes: "500x500", type: "image/png" },
      { url: "/logo.jpg", sizes: "500x500", type: "image/jpeg" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/logo.jpg" },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "ABC Typing",
  alternateName: "ABC Typing Services Abu Dhabi",
  image: "https://www.abcauh.ae/logo.jpg",
  logo: "https://www.abcauh.ae/logo.jpg",
  "@id": "https://www.abcauh.ae",
  url: "https://www.abcauh.ae",
  telephone: "+971 2 642 7667",
  email: "info@abcauh.ae",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "17 Al Asad St - Musaffah - ME9",
    addressLocality: "Abu Dhabi",
    addressRegion: "Abu Dhabi",
    addressCountry: "AE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 24.340738,
    longitude: 54.531342,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "08:00",
    closes: "22:30",
  },
  sameAs: [
    "https://www.facebook.com/abctyping",
    "https://www.instagram.com/abctyping",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "ABC Typing Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "New Visa Typing Service",
          description:
            "Complete assistance for Visa Application Typing, Entry Permit Typing, Medical Typing, Emirates ID Typing, and Status Change Support.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "UAE Visit & Tourist Visa",
          description:
            "Instant 30 Days and 60 Days UAE Visit Visas for family, friends, and tourists.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Visa and Immigration Services",
          description:
            "Residency Application, Golden Visa (10-Year), Family Visa, Investor & Partner Visa, E-Channel, and Document Clearance.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Certificate Attestation in UAE",
          description:
            "Educational certificates, personal documents, commercial documents, and certified true copy attestation for employment and residency.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Business Setup & PRO Services",
          description:
            "Mainland & Free Zone company formation, trade license renewal, corporate banking, TAMM & Tasheel processing.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Accounts, Auditing & VAT Consultancy",
          description:
            "Corporate tax advisory, VAT registration, financial accounts & auditing, and WPS payroll compliance.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Company Liquidation & License Cancellation",
          description:
            "Official LLC and commercial license cancellation, liquidator appointment, and clearance reports in Abu Dhabi & UAE.",
        },
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </head>
      <body>
        <ServerWarmer />
        <AOSInit />
        <AuthToast />
        {children}
      </body>
    </html>
  );
}

