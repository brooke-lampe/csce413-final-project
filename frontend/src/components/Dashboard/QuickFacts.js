import React from "react";
import { connect } from "react-redux";
import { Grid, Icon } from "semantic-ui-react";

const mapStateToProps = (state, { dataKey }) => {
  return { data: state.data[dataKey] };
};

const ConnectedQuickFacts = ({ data }) => {
  return (
    <Grid className="card-grid" columns={4} relaxed="very" stackable>
      {data
        ? data.map((d, i) => (
            <Grid.Column key={i} verticalAlign="middle">
              <div className="quick-fact">
                <div className="text">
                  <Icon name={d.icon} /> {d.text}
                </div>
                <div className="value">{d.value}</div>
              </div>
            </Grid.Column>
          ))
        : "No data to display"}
    </Grid>
  );
};

const QuickFacts = connect(mapStateToProps)(ConnectedQuickFacts);

export default QuickFacts;
