import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { createStackNavigator, createAppContainer } from "react-navigation";

import auth from "./helper/auth";

import LoginScreen from "./components/LoginScreen";
import SignUpScreen from "./components/SignUpScreen";
import HomeScreen from "./components/HomeScreen";
import TabNavigator from "./components/TabNavigator";
import { StoreProvider, StoreContext } from "./store";

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

function withStore(Comp) {
  return class extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      return (
        <StoreProvider>
          <StoreContext.Consumer>
            {store => {
              return <Comp {...this.props} />;
            }}
          </StoreContext.Consumer>
        </StoreProvider>
      );
    }
  };
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: App
  },
  Login: {
    screen: LoginScreen
  },
  SignUp: {
    screen: withStore(SignUpScreen)
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
