import React from "react";
import { connect } from "react-redux";
import Filters from "./Filters/Filters";
import Dashboard from "./Dashboard/Dashboard";
import Trends from "./Trends/Trends";
import Data from "./Data/Data";
import { VIEWS } from "../redux/constants";

const mapStateToProps = state => {
  return { activeView: state.activeView };
};

const ConnectedBody = ({ activeView }) => {
  return (
    <div className="body-wrapper">
      <Filters />

      <div className={activeView === VIEWS.DASHBOARD ? "view active" : "view"}>
        <Dashboard />
      </div>

      <div className={activeView === VIEWS.TRENDS ? "view active" : "view"}>
        <Trends />
      </div>

      <div className={activeView === VIEWS.DATA ? "view active" : "view"}>
        <Data />
      </div>
    </div>
  );
};

const Body = connect(mapStateToProps)(ConnectedBody);

export default Body;
