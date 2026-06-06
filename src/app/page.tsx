import { Hero } from "@/components/hero/Hero";
import { ProductsSection } from "@/components/productos/ProductsSection";
import { HowToOrder } from "@/components/sections/HowToOrder";
import { Wholesale } from "@/components/sections/Wholesale";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <ProductsSection />
      <HowToOrder />
      <Wholesale />
      <Contact />
    </>
  );
}
