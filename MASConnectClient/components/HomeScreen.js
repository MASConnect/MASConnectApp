import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { StoreProvider, StoreContext } from "../store";

import { List, ListItem, Container, Header, Body, Title } from "native-base";

import Chapter from "./Chapter";

export default class HomeScreen extends React.Component {
  render() {
    return (
            <Container>
              <Header style={{ height: 40 }}>
                <Body>
                  <Title>Header</Title>
                </Body>
              </Header>
              <Chapter />
            </Container>
          );

  }
}
