import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { createStackNavigator, createAppContainer } from "react-navigation";

import auth from "./helper/auth";

import LoginScreen from "./components/LoginScreen";
import SignUpScreen from "./components/SignUpScreen";
import HomeScreen from "./components/HomeScreen";
import TabNavigator from "./components/TabNavigator";

class App extends React.Component {
  componentDidMount() {
    auth
      .getToken()
      .then(tokenVal => {
        console.log("token from promise: " + tokenVal);
        if (tokenVal !== null) {
          this.props.navigation.replace("UserHome");
        } else {
          this.props.navigation.replace("Login");
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>MAS Connect</Text>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: App
  },
  Login: {
    screen: LoginScreen
  },
  SignUp: {
    screen: SignUpScreen
  },
  UserHome: {
    screen: TabNavigator
  }
});

const AppContainer = createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default AppContainer;
