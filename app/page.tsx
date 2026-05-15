import Hero from "@/components/home/Hero";
import ProofStrip from "@/components/home/ProofStrip";
import AudienceTabs from "@/components/home/AudienceTabs";
import ThreeOperations from "@/components/home/ThreeOperations";
import Testimonials from "@/components/home/Testimonials";
import FinalCta from "@/components/home/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <ProofStrip />
      <AudienceTabs />
      <ThreeOperations />
      <Testimonials />
      <FinalCta />
    </>
  );
}
