import React from "react";
import { connect } from "react-redux";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import PowerCharts from "fusioncharts/fusioncharts.powercharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.candy";
import Card from "../UI/Card";

ReactFC.fcRoot(FusionCharts, Charts, PowerCharts, FusionTheme);

const mapStateToProps = (state, { dataKey }) => {
  return { data: state.data[dataKey] };
};

const getChart = (categories, dataset) => {
  return {
    type: "scrollcolumn2d",
    dataFormat: "JSON",
    width: "100%",
    height: "400",
    dataSource: {
      chart: {
        bgAlpha: "0",
        paletteColors: "#0B5345, #2980b9, #641E16, #2c3e50, #8e44ad, #f39c12",
        toolTipBgcolor: "#000",
        toolTipColor: "#FDFDFD",
        toolTipPadding: "7",
        toolTipBorderRadius: "3",
        toolTipBorderAlpha: "30",
        tooltipBorderThickness: "0.7",
        baseFontSize: "12",
        baseFontColor: "#e3e3e3",
        xAxisNameFontColor: "#e3e3e3",
        xAxisValueFontColor: "#e3e3e3",
        yAxisNameFontColor: "#e3e3e3",
        yAxisValueFontColor: "#e3e3e3",
        theme: "candy",
        yaxisname: "Median Sale Price",
        numvisibleplot: "35",
        labeldisplay: "auto"
      },
      categories,
      dataset
    }
  };
};

const ConnectedBarChart = ({ title, icon, data }) => {
  const chart = getChart(data ? data.categories : [], data ? data.dataset : []);

  return (
    <Card title={title} icon={icon}>
      <ReactFC {...chart} />
    </Card>
  );
};

const BarChart = connect(mapStateToProps)(ConnectedBarChart);

export default BarChart;
