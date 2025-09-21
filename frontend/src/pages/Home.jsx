import React from "react";
import ChartContainer from "../components/ChartContainer";
import LowerSection from "../components/LowerSection";
import Desc from "../components/Desc";

const Home = () => {
  return (
    <div>
      {/* Pass stats and setters to Desc */}
      <Desc
      />

      {/* Pass stats to ChartContainer */}
      <ChartContainer />

      <LowerSection />
    </div>
  );
};

export default Home;
