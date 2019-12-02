import React from "react";
import Card from "../UI/Card";
import TypesCharts from "./TypesCharts";
import QuickFacts from "./QuickFacts";
import BarChart from "../Trends/BarChart";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Card title="Statistics" icon="dashboard">
        <QuickFacts dataKey="overview" />
      </Card>

      <Card title="Types Distribution" icon="chart pie">
        <TypesCharts />
      </Card>

      <Card title="Trends At Glance" icon="chart line">
        <QuickFacts dataKey="trendsGlance" />
      </Card>

      <BarChart
        title="Cities Distribution"
        icon="chart bar"
        dataKey="citesDistribution"
      />
    </div>
  );
};

export default Dashboard;
