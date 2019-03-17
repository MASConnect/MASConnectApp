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
    value = auth.getToken();
    if (value !== null) {
      this.props.navigation.replace("UserHome");
    }
    this.props.navigation.replace("Login");
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
