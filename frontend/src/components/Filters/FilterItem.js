import React from "react";
import { connect } from "react-redux";
import { Form, Dropdown, Input } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setFilter } from "../../redux/actions";

const mapStateToProps = (state, { filterKey }) => {
  return { value: state.filters[filterKey] };
};

function mapDispatchToProps(dispatch) {
  return {
    setFilter: (key, value) => dispatch(setFilter(key, value))
  };
}

class ConnectedFilterItem extends React.Component {
  constructor(props) {
    super(props);
    if (props.filterType === "dropdown") {
      this.state = {
        options: [],
        loading: true
      };
    }
    this.onChange = this.onChange.bind(this);
    this.renderLable = this.renderLable.bind(this);
  }

  componentDidMount() {
    const { filterType, filterKey, label } = this.props;
    if (filterType === "dropdown") {
      const url = `http://csce413.loc/api/${filterKey}/`;
      fetch(url, {
        method: "POST"
      })
        .then(response => response.json())
        .then(data =>
          this.setState({
            options: [{ key: 0, value: 0, text: `All ${label}` }, ...data],
            loading: false
          })
        );
    }
  }

  onChange(e, data) {
    const { setFilter, filterKey } = this.props;
    setFilter(filterKey, data.value);
  }

  renderLable(item) {
    return item.short_text ? item.short_text : item.text;
  }

  getFilterInput() {
    const { value, placeholder, filterType } = this.props;
    switch (filterType) {
      case "dropdown":
        const { loading, options } = this.state;
        return (
          <Dropdown
            placeholder={placeholder}
            fluid
            multiple
            clearable
            renderLabel={this.renderLable}
            search
            selection
            loading={loading}
            options={options}
            value={value}
            onChange={this.onChange}
          />
        );

      case "date":
        return (
          <DatePicker
            selected={value}
            onChange={date => this.onChange({}, { value: date })}
            customInput={<Input placeholder={placeholder} />}
          />
        );
      default:
        return;
    }
  }
  render() {
    const { filterType, label } = this.props;
    return (
      <Form.Field width={filterType === "date" ? 3 : 5}>
        <label>{label}</label>
        {this.getFilterInput()}
      </Form.Field>
    );
  }
}

const FilterItem = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedFilterItem);

export default FilterItem;
