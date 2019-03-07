import React from "react";
import { StyleSheet, View } from "react-native";

import axios from "axios";

import { Button, Form, Item, Input, Text, H1, H3 } from "native-base";

export default class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: ""
    };
  }

  createUser() {
    axios
      .post("http://127.0.0.1:8000/api/users/", {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      })
      .then(
        res => {
          return axios.post("http://127.0.0.1:8000/api/token-auth/", {
            username: this.state.username,
            password: this.state.password
          });
        },
        err => {
          return new Promise((res, rej) => rej("Failed to create a user"));
        }
      )
      .then(
        res => {
          console.log(res.data.token);
        },
        err => {
          alert("Failed to create user");
        }
      );
  }

  render() {
    return (
      <View>
        <H1 style={styles.headerTextStyle}>Welcome to MAS Connect</H1>
        <H3 style={styles.headerTextStyle}>Sign Up</H3>
        <Form>
          <Item>
            <Input
              placeholder="Username"
              onChangeText={text => this.setState({ username: text })}
              name="username"
              value={this.state.username}
            />
          </Item>
          <Item>
            <Input
              placeholder="Email"
              onChangeText={text => this.setState({ email: text })}
              name="email"
              value={this.state.email}
            />
          </Item>
          <Item last>
            <Input
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={text => this.setState({ password: text })}
              name="password"
              value={this.state.password}
            />
          </Item>
        </Form>
        <Button primary style={styles.button} onPress={() => this.createUser()}>
          <Text>Sign Up</Text>
        </Button>
        <Text
          onPress={() => this.props.navigation.replace("Login")}
          style={styles.logInText}
        >
          Log In
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
  logInText: {
    marginTop: 10,
    alignSelf: "center"
  },
  headerTextStyle: {
    marginBottom: 5,
    alignSelf: "center"
  }
});
