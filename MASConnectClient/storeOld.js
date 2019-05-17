import React from "react";
import { createContext } from "react";
import axios from "axios";
import auth from "./helper/auth";

export const StoreContext = createContext();

export class StoreProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      actions: {
        fetchUser: this.fetchUser.bind(this)
      }
    };
  }


  setUser(newUser) {
    this.setState({ user: newUser });
  }

  fetchUser() {
    console.log("clicked")
    auth.getToken()
      .then(tokenVal => {
        axios
          .get("http://127.0.0.1:8000/api/users/me/", {
            headers: {Authorization: "Token " + tokenVal}
          })
          .then(
            (res => {
            let userData = res.data
            this.setUser(userData)
          }),
(err) => {
            console.log("failed")
          }
          )
      })
  }

  render() {
    console.log("provider:", this.state.user)
    return (
      <StoreContext.Provider value={this.state}>
        {this.props.children}
      </StoreContext.Provider>
    );
  }
}

export function withStore(Comp) {
  return class extends React.Component {
    constructor(props) {
      super(props);
    }


    render() {
      console.log("With store render")
      return (
        <StoreProvider>
          <StoreContext.Consumer>
            {store => {
              console.log("with store:", store.user)
              return <Comp {...this.props} store={store} />;
            }}
          </StoreContext.Consumer>
        </StoreProvider>
      );
    }
  };
}
