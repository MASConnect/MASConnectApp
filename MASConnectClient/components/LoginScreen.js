import React from "react";
import { StyleSheet, View } from "react-native";

import { Button, Form, Item, Input, Text, H1, H3 } from "native-base";

export default class LoginScreen extends React.Component {
  render() {
    return (
      <View>
        <H1 style={styles.headerTextStyle}>Welcome to MAS Connect</H1>
        <H3 style={styles.headerTextStyle}>Login</H3>
        <Form>
          <Item>
            <Input placeholder="Username" />
          </Item>
          <Item last>
            <Input placeholder="Password" secureTextEntry={true} />
          </Item>
        </Form>
        <Button primary style={styles.button}>
          <Text>Login</Text>
        </Button>
        <Text
          onPress={() => this.props.navigation.replace("SignUp")}
          style={styles.signUpText}
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
  signUpText: {
    marginTop: 10,
    alignSelf: "center"
  },
  headerTextStyle: {
    marginBottom: 5,
    alignSelf: "center"
  }
});
