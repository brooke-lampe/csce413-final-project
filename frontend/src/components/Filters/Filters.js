import React from "react";
import { connect } from "react-redux";
import { Form, Button } from "semantic-ui-react";
import FilterItem from "./FilterItem";
import "../../styles/Filters.scss";
import { applyFilters } from "../../redux/actions";

const mapStateToProps = state => {
  return { filters: state.filters };
};

function mapDispatchToProps(dispatch) {
  return {
    applyFilters: filters => dispatch(applyFilters(filters))
  };
}

class ConnectedFilters extends React.Component {
  constructor(props) {
    super(props);

    this.onApplyFilters = this.onApplyFilters.bind(this);
  }

  componentDidMount() {
    const { applyFilters, filters } = this.props;
    applyFilters(filters);
  }

  onApplyFilters() {
    const { applyFilters, filters } = this.props;
    applyFilters(filters);
  }

  render() {
    return (
      <div className="filters-wrapper">
        <Form>
          <Form.Group>
            <FilterItem
              filterKey={"cities"}
              label={"Cities"}
              filterType={"dropdown"}
              placeholder={"Select Cities"}
            />
            <FilterItem
              filterKey={"propertyTypes"}
              label={"Property Types"}
              filterType={"dropdown"}
              placeholder={"Select Property types"}
            />
            <FilterItem
              filterKey={"startDate"}
              label={"Start Date"}
              filterType={"date"}
              placeholder={"Start Date"}
            />
            <FilterItem
              filterKey={"endDate"}
              label={"End Date"}
              filterType={"date"}
              placeholder={"End Date"}
            />
          </Form.Group>
          <Button floated="right" size="large" onClick={this.onApplyFilters}>
            Apply Filters
          </Button>
          <div style={{ clear: "both" }}></div>
        </Form>
      </div>
    );
  }
}

const Filters = connect(mapStateToProps, mapDispatchToProps)(ConnectedFilters);

export default Filters;
