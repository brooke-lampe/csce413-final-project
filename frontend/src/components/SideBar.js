import React from "react";
import { connect } from "react-redux";
import { Icon } from "semantic-ui-react";
import { setActiveView } from "../redux/actions";
import { VIEWS } from "../redux/constants";

const mapStateToProps = state => {
  return { activeView: state.activeView };
};

function mapDispatchToProps(dispatch) {
  return {
    setActiveView: view => dispatch(setActiveView(view))
  };
}

const ConnectedSideBar = ({ activeView, setActiveView }) => (
  <div className="side-bar">
    <div className="title">Lancaster Realty Analytics</div>
    <div className="items-wrapper">
      <div className={activeView === VIEWS.DASHBOARD ? "item active" : "item"}>
        <span onClick={() => setActiveView(VIEWS.DASHBOARD)}>
          <Icon name="dashboard" /> Overview
        </span>
      </div>
      <div className={activeView === VIEWS.TRENDS ? "item active" : "item"}>
        <span onClick={() => setActiveView(VIEWS.TRENDS)}>
          <Icon name="chart line" /> Trends
        </span>
      </div>
      <div className={activeView === VIEWS.DATA ? "item active" : "item"}>
        <span onClick={() => setActiveView(VIEWS.DATA)}>
          <Icon name="table" /> Data
        </span>
      </div>
    </div>
  </div>
);

const SideBar = connect(mapStateToProps, mapDispatchToProps)(ConnectedSideBar);

export default SideBar;
