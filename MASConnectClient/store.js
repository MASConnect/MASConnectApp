import React from "react";
import { createContext } from "react";
import axios from "axios";


export const StoreContext = createContext({hello: "world"});

export class StoreProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      actions: {
        loadUser: this.loadUser
      }
    };
  }

  loadUser(id) {
    axios.get("http://127.0.0.1:8000/api/users/" + id + "/").then(
      res => {
        this.setState({ user: res.data });
      },
      err => {
        this.setState({ user: null });
      }
    );
    // alert("loaded user");
    // call axios to get the JSON serialization of this User
    // and store it in this.state.user
  }

  setUser(newUser) {
    this.setState({ user: newUser });
  }

  render() {
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
      return (
        <StoreProvider>
          <StoreContext.Consumer>
            {(store) => {
              return (
                <Comp {...this.props} store={store}/>
              )
            }
            }
          </StoreContext.Consumer>
        </StoreProvider>
      );
    }
  };
}
