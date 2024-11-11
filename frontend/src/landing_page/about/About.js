import React from "react";
import Footer from "../Footer";
import Hero from "./Hero";
import Team from "./Team";
import Navbar from "../Navbar";

function PricingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <div style={{ padding: "20px 0" }}>
        <Team />
      </div>
      <Footer />
    </>
  );
}

export default PricingPage;
