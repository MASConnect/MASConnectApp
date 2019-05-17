import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { createStackNavigator, createAppContainer } from "react-navigation";

import auth from "./helper/auth";

import LoginScreen from "./components/LoginScreen";
import SignUpScreen from "./components/SignUpScreen";
import TabNavigator from "./components/TabNavigator";
import {Provider, connect} from "react-redux"
import store from './store'

class Home extends React.Component {
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
    screen: Home
  },
  Login: {
    screen: LoginScreen
  },
  SignUp: {
    screen: SignUpScreen,
    navigationOptions: ({ navigation }) => ({
     header: null
    }),
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

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
