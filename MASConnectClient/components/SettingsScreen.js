import React from "react";
import { View } from "react-native";
import {
  Container,
  Card,
  CardItem,
  Text,
  Icon,
  Right,
  Header,
  Content,
  Body,
  Title,
  Left
} from "native-base";

import auth from "../helper/auth";

export default class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  logout() {
    auth.resetToken();
    this.props.navigation.replace("Home");
  }

  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>Settings</Title>
          </Body>
        </Header>
        <Content>
          <Card>
            <CardItem>
              <Icon active name="logo-googleplus" />
              <Text>Your Chapter</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </CardItem>
            <CardItem button onPress={() => this.logout()}>
              <Icon active name="logo-googleplus" />
              <Text>Logout</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
