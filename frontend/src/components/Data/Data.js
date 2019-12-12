import React from "react";
import { connect } from "react-redux";
import { Pagination, Table, Icon } from "semantic-ui-react";

const mapStateToProps = state => {
  return { data: state.data.salesData };
};

class ConnectedData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startIndex: 0,
      endIndex: 15
    };

    this.onPageChange = this.onPageChange.bind(this);
  }

  onPageChange(e, d) {
    const startIndex = 15 * (d.activePage - 1);
    const endIndex =
      startIndex + 15 > this.props.data.length
        ? this.props.data.length
        : startIndex + 15;

    this.setState({ startIndex, endIndex });
  }

  render() {
    const { data } = this.props;
    const { startIndex, endIndex } = this.state;
    return (
      <div className="data">
        <Table celled inverted selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>City</Table.HeaderCell>
              <Table.HeaderCell>Property Type</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {data ? (
              data.slice(startIndex, endIndex).map(d => (
                <Table.Row key={d.id}>
                  <Table.Cell>{d.date}</Table.Cell>
                  <Table.Cell>{d.city}</Table.Cell>
                  <Table.Cell>{d.type}</Table.Cell>
                  <Table.Cell>{d.price}</Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell colSpan="4">No data to display</Table.Cell>
              </Table.Row>
            )}
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="4">
                <Pagination
                  inverted
                  floated="right"
                  defaultActivePage={1}
                  ellipsisItem={{
                    content: <Icon name="ellipsis horizontal" />,
                    icon: true
                  }}
                  firstItem={{
                    content: <Icon name="angle double left" />,
                    icon: true
                  }}
                  lastItem={{
                    content: <Icon name="angle double right" />,
                    icon: true
                  }}
                  prevItem={{ content: <Icon name="angle left" />, icon: true }}
                  nextItem={{
                    content: <Icon name="angle right" />,
                    icon: true
                  }}
                  totalPages={
                    this.props.data ? Math.ceil(this.props.data.length / 15) : 0
                  }
                  onPageChange={this.onPageChange}
                />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </div>
    );
  }
}

const Data = connect(mapStateToProps)(ConnectedData);

export default Data;
