import AboutUs from "@/components/sections/AboutUs";
import Contact from "@/components/sections/Contact";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Transparency from "@/components/sections/Transparency";

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutUs />
      <Projects />
      <Transparency />
      <Contact />
    </main>
  );
}
