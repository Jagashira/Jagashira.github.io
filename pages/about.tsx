import Aboutme from "@/components/about/Aboutme";
import CTA from "@/components/about/CTA";
import AboutProfile from "@/components/about/Profile";
import Slills from "@/components/about/Slills";
import TimeLine from "@/components/about/TimeLine";
import Vision from "@/components/about/Vision";
import Layout from "@components/ui/Layout";

export default function About() {
  return (
    <Layout>
      <Aboutme />
      <AboutProfile />
      <Slills />
      <TimeLine />
      <Vision />
      <CTA />
    </Layout>
  );
}
