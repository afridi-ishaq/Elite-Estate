import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SearchSection from "@/components/SearchSection";
import StatsSection from "@/components/StatsSection";
import FeaturedProperties from "@/components/FeaturedProperties";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import AIAssistant from "@/components/AIAssistant";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <SearchSection />
        <StatsSection />
        <FeaturedProperties />
        <AIAssistant />
        <WhyChooseUs />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}