import React from "react";
import { Grid, Container } from "semantic-ui-react";
import SideBar from "./components/SideBar.js";
import Body from "./components/Body.js";
import "./styles/styles.scss";

const App = () => (
  <Container fluid className="app-container">
    <Grid>
      <Grid.Column className="side-bar-column" width={3}>
        <SideBar />
      </Grid.Column>
      <Grid.Column width={13}>
        <Body />
      </Grid.Column>
    </Grid>
  </Container>
);

export default App;
