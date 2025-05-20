// pages/index.tsx
import AboutOutline from "@/components/top/AboutOutline";
import Hero from "@/components/top/Hero";
import ProjectOutline from "@/components/top/ProjectOutline";
import Layout from "@/components/ui/Layout";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  return (
    <Layout heroRef={heroRef}>
      <div className="min-h-screen bg-white text-gray-900">
        <Hero ref={heroRef} />
        <AboutOutline />
        <ProjectOutline />
      </div>
    </Layout>
  );
}
