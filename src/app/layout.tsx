import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/organisms/Navbar";
import BackToTop from "@/components/main_components/back_to_top";
import Footer from "@/components/main_components/footer";
import { LanguageProvider } from "@/lib/language-context";
import { AppProviders } from "./providers";
import { ConditionalFooter } from "@/components/atoms/ConditionalFooter";

export const metadata: Metadata = {
  title: "Fayida Academy",
  description: "Learning platform for students",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <AppProviders>
          <LanguageProvider>
            <Toaster />

            {/* Header */}
            <Navbar />

            {/* Main content */}
            <main className="flex-grow w-full">{children}</main>

            {/* Back to top button */}
            {/* <div className="fixed bottom-14 right-8 z-50">
              <BackToTop />
            </div> */}

            {/* Footer - only on landing page */}
            <ConditionalFooter />
          </LanguageProvider>
        </AppProviders>
      </body>
    </html>
  );
}
