import AboutHero from "@/components/AboutHero";
import MissionAndFeatures from "@/components/MissionAndFeatures";
import StatsAndTeam from "@/components/StatsAndTeam";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Header />
      <main>
        <AboutHero />
        <MissionAndFeatures />
        <StatsAndTeam />
      </main>
      <Footer />
    </div>
  );
}
