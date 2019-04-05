import React from "react";
import { StyleSheet, View, Text } from "react-native";

import { List, ListItem, Container, Header, Body, Title } from "native-base";

import Chapter from "./Chapter";

export default class HomeScreen extends React.Component {
  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>Home</Title>
          </Body>
        </Header>
        <Chapter />
      </Container>
    );
  }
}
