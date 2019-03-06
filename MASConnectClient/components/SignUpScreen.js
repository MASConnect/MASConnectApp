import React from "react";
import { StyleSheet, View } from "react-native";

import { Button, Form, Item, Input, Text, H1, H3 } from "native-base";

export default class SignUpScreen extends React.Component {
  render() {
    return (
      <View>
        <H1 style={styles.headerTextStyle}>Welcome to MAS Connect</H1>
        <H3 style={styles.headerTextStyle}>Sign Up</H3>
        <Form>
          <Item>
            <Input placeholder="Email" />
          </Item>
          <Item last>
            <Input placeholder="Password" secureTextEntry={true} />
          </Item>
        </Form>
        <Button primary style={styles.button}>
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
