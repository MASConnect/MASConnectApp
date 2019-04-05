import React from "react";
import { StyleSheet, View } from "react-native";

import axios from "axios";

import { Button, Form, Item, Input, H1, H3, Text, Picker } from "native-base";
import auth from "../helper/auth";

export default class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      selectedChapter: "0",
      chapterList: []
    };
  }

  //@@ TODO
  //on signup, need to send selected chapter with user info
  createUser() {
    axios
      .post("http://127.0.0.1:8000/api/users/", {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      })
      .then(
        res => {
          console.log(
            "username: " +
              this.state.username +
              " password: " +
              this.state.password
          );
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
          return auth.storeToken(res.data.token);
        },
        err => {
          alert("Failed to create user");
        }
      )
      .then(
        res => {
          auth
            .getToken()
            .then(tokenVal => {
              if (tokenVal !== null) {
                this.props.navigation.replace("UserHome");
              } else {
                alert("Failed to login user");
              }
            })
            .catch(error => {
              console.log(error);
            });
        },
        err => {
          console.log(err);
        }
      );
  }

  getChapterList() {
    axios.get("http://127.0.0.1:8000/api/chapters/").then(
      res => {
        // console.log(res.data[1]);
        this.setState({ chapterList: res.data });
        console.log(this.state.chapterList);
      },
      err => {
        return new Promise((res, rej) =>
          rej("Failed to retrieve chapter list")
        );
      }
    );
  }

  componentDidMount() {
    this.getChapterList();
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
          {/* <Text>Please select a chapter</Text> */}
          <Item>
            <Picker
              note
              mode="dropdown"
              style={styles.picker}
              selectedValue={this.state.selectedChapter}
              onValueChange={selectedVal => {
                this.setState({ selectedChapter: selectedVal });
              }}
            >
              <Picker.Item label="Select a chapter" value="0" />
              {this.state.chapterList.map(function(chapter) {
                // console.log("chapter" + String(chapter.id));
                return (
                  <Picker.Item
                    label={chapter.name}
                    value={chapter.name}
                    key={String(chapter.id)}
                  />
                );
              })}
            </Picker>
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
  },
  picker: {
    width: 300
  }
});
