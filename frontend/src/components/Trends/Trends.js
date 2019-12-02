import React from "react";
import { connect } from "react-redux";
import TrendsList from "./TrendsList";
import Overview from "./Overview";
import BarChart from "./BarChart";
import { TRENDS } from "../../redux/constants";

const mapStateToProps = state => {
  return { activeTrend: state.activeTrend };
};

const ConnectedTrends = ({ activeTrend }) => {
  return (
    <div className="trends">
      <TrendsList />

      <div
        className={activeTrend === TRENDS.OVERVIEW ? "trend active" : "trend"}
      >
        <Overview dataKey="overviewTrends" />
      </div>

      <div className={activeTrend === TRENDS.DAYS ? "trend active" : "trend"}>
        <BarChart title="Day Trends" icon="chart bar" dataKey="daysTrends" />
      </div>

      <div className={activeTrend === TRENDS.MONTHS ? "trend active" : "trend"}>
        <BarChart
          title="Months Trends"
          icon="chart bar"
          dataKey="monthsTrends"
        />
      </div>

      <div className={activeTrend === TRENDS.YEARS ? "trend active" : "trend"}>
        <BarChart title="Years Trends" icon="chart bar" dataKey="yearsTrends" />
      </div>
    </div>
  );
};

const Trends = connect(mapStateToProps)(ConnectedTrends);

export default Trends;
