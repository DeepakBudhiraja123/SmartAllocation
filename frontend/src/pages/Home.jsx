import React from "react";
import ChartContainer from "../components/ChartContainer";
import LowerSection from "../components/LowerSection";
import Desc from "../components/Desc";

const Home = ({ stats, setStats, lastModelTime, setLastModelTime }) => {
  return (
    <div>
      {/* Pass stats and setters to Desc */}
      <Desc
        stats={stats}
        setStats={setStats}
        lastModelTime={lastModelTime}
        setLastModelTime={setLastModelTime}
      />

      {/* Pass stats to ChartContainer */}
      <ChartContainer {...stats} />

      <LowerSection stats={stats}
        setStats={setStats}
        lastModelTime={lastModelTime}
        setLastModelTime={setLastModelTime}/>
    </div>
  );
};

export default Home;
