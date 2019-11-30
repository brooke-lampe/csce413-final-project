import React from "react";
import { connect } from "react-redux";
import { Card as SemanticCard, Loader, Dimmer, Icon } from "semantic-ui-react";

const mapStateToProps = state => {
  return { isLoading: state.loading };
};

const ConnectedCard = ({ title, isLoading, icon, children }) => {
  return (
    <SemanticCard fluid>
      <SemanticCard.Content>
        <SemanticCard.Header>
          {" "}
          <Icon name={icon} /> {title}
        </SemanticCard.Header>
      </SemanticCard.Content>
      <SemanticCard.Content className="body">
        <Dimmer active={isLoading}>
          <Loader active={isLoading} inverted content="Loading" />
        </Dimmer>
        {children}
      </SemanticCard.Content>
    </SemanticCard>
  );
};

const Card = connect(mapStateToProps)(ConnectedCard);

export default Card;
