import React from "react";

import Hero from "../../components/Hero/";
import PageDemo from "../../components/PageDemo";
import Benefits from "../../components/Benefits";
import Footer from "../../components/Footer";

const Home = () => {
  return (
    <main>
      <Hero />
      <Benefits />
      <PageDemo />
      <Footer />
    </main>
  );
};

export default Home;
