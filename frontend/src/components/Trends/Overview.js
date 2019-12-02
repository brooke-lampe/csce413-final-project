import React from "react";
import { connect } from "react-redux";
import FusionCharts from "fusioncharts";
import TimeSeries from "fusioncharts/fusioncharts.timeseries";
import PowerCharts from "fusioncharts/fusioncharts.powercharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.candy";
import ReactFC from "react-fusioncharts";
import Card from "../UI/Card";

ReactFC.fcRoot(FusionCharts, TimeSeries, PowerCharts, FusionTheme);

const mapStateToProps = (state, { dataKey }) => {
  return { data: state.data[dataKey] };
};

class ConnectedOverview extends React.Component {
  constructor(props) {
    super(props);
    this.getChart = this.getChart.bind(this);
  }

  getChart() {
    const { data } = this.props;
    const schema = [
      {
        name: "Time",
        type: "date",
        format: "%d-%b-%y"
      },
      {
        name: "Type",
        type: "string"
      },
      {
        name: "sale",
        type: "number"
      }
    ];
    const fusionTable = new FusionCharts.DataStore().createDataTable(
      data ? data : [],
      schema
    );
    const dataSource = {
      data: fusionTable,
      extensions: {
        customRangeSelector: {
          enabled: "0"
        }
      },
      chart: {
        theme: "candy",
        style: {
          canvas: { fill: "#1e1e1e" },
          background: { fill: "#1e1e1e" }
        },
        paletteColors: "#0B5345, #2980b9, #641E16, #2c3e50, #8e44ad, #f39c12"
      },
      series: "Type",
      yAxis: [
        {
          plot: [
            {
              value: "sale",
              connectnulldata: true
            }
          ],
          min: "130"
        }
      ]
    };
    return {
      type: "timeseries",
      renderAt: "container",
      width: "100%",
      height: "400",
      dataSource
    };
  }

  render() {
    const chart = this.getChart();
    return (
      <Card title="Trends Overview" icon="chart line">
        <div className="overview-chart">
          <ReactFC {...chart} />
        </div>
      </Card>
    );
  }
}

const Overview = connect(mapStateToProps)(ConnectedOverview);

export default Overview;
