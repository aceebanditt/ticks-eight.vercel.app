import Head from "next/head";
import type { AppProps } from "next/app";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { CookieProvider } from "@/contexts/CookieContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CookieConsent } from "@/components/cookie/CookieConsent";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <CartProvider>
        <CookieProvider>
          <Head>
            <title>Your Choice Tickets - Find and Book Event Tickets</title>
            <meta name="description" content="Book tickets for concerts, sports events, theatre shows and more at Your Choice Tickets" />
            <link 
              rel="icon" 
              href="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=32&h=32&q=80" 
              sizes="32x32"
            />
            <link 
              rel="icon" 
              href="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=16&h=16&q=80" 
              sizes="16x16"
            />
            <link 
              rel="apple-touch-icon" 
              href="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=180&h=180&q=80"
            />
          </Head>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Component {...pageProps} />
            </main>
            <Footer />
            <CookieConsent />
          </div>
        </CookieProvider>
      </CartProvider>
    </AuthProvider>
  );
}