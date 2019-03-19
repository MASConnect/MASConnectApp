import React from "react";
import { StyleSheet, View } from "react-native";

import axios from "axios";
import { Button, Form, Item, Input, H1, H3, Text } from "native-base";
import auth from "../helper/auth";

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  loginUser() {
    console.log(
      "username: " + this.state.username + " password: " + this.state.password
    );
    axios
      .post("http://127.0.0.1:8000/api/token-auth/", {
        username: this.state.username,
        password: this.state.password
      })
      .then(
        res => {
          console.log(res.data.token);
          return auth.storeToken(res.data.token);
        },
        err => {
          return new Promise((res, rej) => rej("Failed to store Token"));
        }
      )
      .then(
        res => {
          this.props.navigation.replace("UserHome");
        },
        err => {
          console.log(err);
        }
      );
  }
  render() {
    return (
      <View>
        <H1 style={styles.headerTextStyle}>Welcome to MAS Connect</H1>
        <H3 style={styles.headerTextStyle}>Login</H3>
        <Form>
          <Item>
            <Input
              placeholder="Username"
              onChangeText={text => this.setState({ username: text })}
            />
          </Item>
          <Item last>
            <Input
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={text => this.setState({ password: text })}
            />
          </Item>
        </Form>
        <Button primary style={styles.button} onPress={() => this.loginUser()}>
          <Text>Login</Text>
        </Button>
        <Text
          onPress={() => this.props.navigation.replace("SignUp")}
          style={styles.loginText}
        >
          Sign Up
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    alignSelf: "center"
  },
  loginText: {
    marginTop: 10,
    alignSelf: "center"
  },
  headerTextStyle: {
    marginBottom: 5,
    alignSelf: "center"
  }
});
