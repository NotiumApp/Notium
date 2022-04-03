import type { NextPage } from "next";
import Navbar from "../components/Navbar/Navbar";
import HeroSection from "../components/Section/HeroSection";

const Home: NextPage = () => {
  return (
    <div>
      <Navbar />

      <div className="sm:p-10">
        <HeroSection />
      </div>
    </div>
  );
};

export default Home;
