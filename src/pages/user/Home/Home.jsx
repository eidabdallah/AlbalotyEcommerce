import React from "react";
import Categories from "./../../../components/user/Categories/Categories";
import HeroSection from "../../../components/user/HeroSection/HeroSection.jsx";
import Services from "../../../components/user/Services/Services.jsx";
import FeaturedProducts from "../../../components/user/FeaturedProducts/FeaturedProducts.jsx";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Categories />
      <Services />
      <FeaturedProducts />
    </>
  );
}
