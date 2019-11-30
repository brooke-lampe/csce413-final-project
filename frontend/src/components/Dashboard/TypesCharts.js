import React from "react";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import PowerCharts from "fusioncharts/fusioncharts.powercharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.candy";

ReactFC.fcRoot(FusionCharts, Charts, PowerCharts, FusionTheme);

const mapStateToProps = state => {
  return { data: state.data.typesDistribution };
};

const getDataSource = (title, total, prefix) => {
  return {
    chart: {
      showBorder: "0",
      showShadow: "0",
      use3DLighting: "0",
      showLabels: "0",
      showValues: "0",
      paletteColors: "#0B5345, #2980b9, #641E16, #f39c12, #939393, #8e44ad",
      bgAlpha: "0",
      canvasBgAlpha: "0",
      doughnutRadius: "60",
      pieRadius: "110",
      plotBorderAlpha: "0",
      toolTipBgcolor: "#000",
      toolTipColor: "#FDFDFD",
      toolTipPadding: "7",
      toolTipBorderRadius: "3",
      toolTipBorderAlpha: "30",
      tooltipBorderThickness: "0.7",
      baseFontSize: "12",
      baseFontColor: "#e3e3e3",
      showLegend: "1",
      legendNumColumns: "2",
      legendShadow: "0",
      legendBorderAlpha: "0",
      drawCustomLegendIcon: "1",
      legendBgAlpha: "0",
      chartTopMargin: "-10",
      canvasTopMargin: "-10",
      chartBottomMargin: "20",
      canvasBottomMargin: "20",
      defaultCenterLabel: `${title} <br> ${total}`,
      numberPrefix: prefix,
      centerLabel: "$value",
      centerLabelBold: "1",
      centerLabelFontSize: "16",
      enableRotation: "0",
      transposeAnimation: "1"
    },
    data: []
  };
};

const ConnectedTypesCharts = ({ data }) => {
  const chartConfig = {
    type: "doughnut2d",
    className: "fc-doughnut2d",
    dataFormat: "JSON",
    width: "100%",
    height: "350"
  };

  const salesChart = {
    ...chartConfig,
    dataSource: {
      ...getDataSource("Total Sales", data ? data.sales.total : 0, "$"),
      data: data ? data.sales.data : []
    }
  };

  const countChart = {
    ...chartConfig,
    dataSource: {
      ...getDataSource("Total Sold", data ? data.count.total : 0, ""),
      data: data ? data.count.data : []
    }
  };

  return (
    <Grid className="card-grid" columns={2} relaxed="very" stackable>
      <Grid.Column verticalAlign="middle">
        <ReactFC {...salesChart} />
      </Grid.Column>
      <Grid.Column verticalAlign="middle">
        <ReactFC {...countChart} />
      </Grid.Column>
    </Grid>
  );
};

const TypesCharts = connect(mapStateToProps)(ConnectedTypesCharts);

export default TypesCharts;
