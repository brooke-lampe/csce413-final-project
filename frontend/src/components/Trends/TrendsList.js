import React from "react";
import { connect } from "react-redux";
import { List } from "semantic-ui-react";
import { setActiveTrend } from "../../redux/actions";
import { TRENDS } from "../../redux/constants";

const mapStateToProps = state => {
  return { activeTrend: state.activeTrend };
};

function mapDispatchToProps(dispatch) {
  return {
    setActiveTrend: trend => dispatch(setActiveTrend(trend))
  };
}

const ConnectedTrendsList = ({ activeTrend, setActiveTrend }) => (
  <div className="trends-list-wrapper">
    <List className="trends-list" horizontal relaxed>
      <List.Item
        className={
          activeTrend === TRENDS.OVERVIEW ? "list-item active" : "list-item"
        }
        onClick={() => setActiveTrend(TRENDS.OVERVIEW)}
      >
        Overview
      </List.Item>
      <List.Item
        className={
          activeTrend === TRENDS.DAYS ? "list-item active" : "list-item"
        }
        onClick={() => setActiveTrend(TRENDS.DAYS)}
      >
        Days
      </List.Item>
      <List.Item
        className={
          activeTrend === TRENDS.MONTHS ? "list-item active" : "list-item"
        }
        onClick={() => setActiveTrend(TRENDS.MONTHS)}
      >
        Months
      </List.Item>
      <List.Item
        className={
          activeTrend === TRENDS.YEARS ? "list-item active" : "list-item"
        }
        onClick={() => setActiveTrend(TRENDS.YEARS)}
      >
        Years
      </List.Item>
    </List>
  </div>
);

const TrendsList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedTrendsList);

export default TrendsList;
