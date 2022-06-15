import type { NextPage } from "next";
import Navbar from "../components/Navbar/Navbar";
import HeroSection from "../components/Section/HeroSection";

const Home: NextPage = () => {
  return (
    <div className="lg:overflow-hidden h-screen">
      <Navbar />

      <div className="p-8 sm:p-10 h-full">
        <HeroSection />
      </div>
    </div>
  );
};

export default Home;
