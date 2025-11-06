import CTASection from "@/components/CTASection";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Header />
      <main>
        <Hero />
        <Features />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
