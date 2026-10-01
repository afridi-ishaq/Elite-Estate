import Hero from "@/components/Hero";
import SearchSection from "@/components/SearchSection";
import StatsSection from "@/components/StatsSection";
import FeaturedProperties from "@/components/FeaturedProperties";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import AIAssistant from "@/components/AIAssistant";
import { getFeaturedProperties } from "@/lib/property-service";

export default async function HomePage() {
  const featuredProperties = await getFeaturedProperties();

  return (
    <>
      <main>
        <Hero featuredProperties={featuredProperties} />

        <SearchSection />

        <StatsSection />

        <FeaturedProperties />

        <AIAssistant />

        <WhyChooseUs />

        <Testimonials />
      </main>
    </>
  );
}