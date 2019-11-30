import React from "react";
import Card from "../UI/Card";
import TypesCharts from "./TypesCharts";
import CitiesChart from "./CitiesChart";
import QuickFacts from "./QuickFacts";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Card title="Overview" icon="dashboard">
        <QuickFacts dataKey="overview" />
      </Card>

      <Card title="Types Distribution" icon="chart pie">
        <TypesCharts />
      </Card>

      <Card title="Trends At Glance" icon="chart line">
        <QuickFacts dataKey="trendsGlance" />
      </Card>

      <Card title="Cities Distribution" icon="chart bar">
        <CitiesChart />
      </Card>
    </div>
  );
};

export default Dashboard;
