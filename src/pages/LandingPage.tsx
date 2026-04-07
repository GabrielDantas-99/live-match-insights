import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import LivePreviewSection from "@/components/landing/LivePreviewSection";
import Footer from "@/components/layout/Footer";

const LandingPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <LivePreviewSection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
