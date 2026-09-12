import type { Metadata } from "next";
import AuthToast from "./components/AuthToast";
import AOSInit from "./components/AosInit";
import ServerWarmer from "./components/ServerWarmer";
import "aos/dist/aos.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Professional Company Liquidation Service in UAE",
  description:
    "Complete solutions for business closure, LLC cancellation, and trade license cancellation in Abu Dhabi and across UAE.",
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
          dangerouslySetInnerHTML={{
            __html: `
              if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                document.documentElement.classList.add('is-mobile-device');
              }
            `,
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

