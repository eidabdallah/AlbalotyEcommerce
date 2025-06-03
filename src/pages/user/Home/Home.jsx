import React from "react";
import HeroSection from "../../../components/user/HeroSection/HeroSection.jsx";
import Services from "../../../components/user/Services/Services.jsx";
import FeaturedProducts from "../../../components/user/FeaturedProducts/FeaturedProducts.jsx";
import FAQs from "../../../components/user/FAQs/FAQs.jsx";
import Categories from "../../../components/user/CategorySection/Categories/Categories.jsx";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Categories />
      <Services />
      <FeaturedProducts />
      <FAQs />
    </>
  );
}
