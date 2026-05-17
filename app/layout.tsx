import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SkipLink } from "@/components/layout/skip-link";
import { BRAND } from "@/lib/brand";
import { COPY } from "@/lib/copy";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: {
    default: COPY.brand.fullName,
    template: `%s | ${COPY.brand.name}`,
  },
  description: COPY.brand.tagline,
  icons: {
    icon: [
      { url: BRAND.assets.favicon32, sizes: "32x32", type: "image/png" },
      { url: BRAND.assets.favicon512, sizes: "512x512", type: "image/png" },
    ],
    apple: BRAND.assets.favicon512,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-MX"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col font-sans antialiased">
        <TooltipProvider>
          <SkipLink />
          {children}
          <Toaster richColors position="top-center" toastOptions={{}} />
        </TooltipProvider>
      </body>
    </html>
  );
}
