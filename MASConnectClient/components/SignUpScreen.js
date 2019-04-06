import React from "react";
import { StyleSheet, View } from "react-native";

import axios from "axios";

import {
  Button,
  Form,
  Item,
  Input,
  H1,
  H3,
  Text,
  Picker,
  Icon
} from "native-base";
import auth from "../helper/auth";

export default class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      selectedChapter: "default",
      chapterList: [],
      inputStatus: {
        username: 0,
        email: 0,
        password: 0,
        chapter: 0
      },
      errorMessage: {
        usernameMessage: "",
        emailMessage: "",
        passwordMessage: ""
      }
    };
  }

  /*
   * Validate Users form responses
   * SHOULD WE VALIDATE ON INPUT DATA CHANGE???
   */
  validateFormResponse() {
    var newInputStatus = Object.assign({}, this.state.inputStatus);
    var newErrorMessage = Object.assign({}, this.state.errorMessage);

    //@@ DO VAILDATION HERE

    //Username Validation
    if (this.state.username.length == 0) {
      newErrorMessage.usernameMessage = "Please enter valid username";
      newInputStatus.username = -1;
    } else {
      newErrorMessage.usernameMessage = "";
      newInputStatus.username = 1;
    }

    //Email Validation
    if (this.state.email.length == 0) {
      newErrorMessage.emailMessage = "Please enter valid email address";
      newInputStatus.email = -1;
    } else {
      newErrorMessage.emailMessage = "";
      newInputStatus.email = 1;
    }

    //Password Validation
    if (this.state.password.length == 0) {
      newErrorMessage.passwordMessage = "Password too short";
      newInputStatus.password = -1;
    } else {
      newErrorMessage.passwordMessage = "";
      newInputStatus.password = 1;
    }

    //Chapter Validation
    if (this.state.selectedChapter == "default") {
      newInputStatus.chapter = -1;
    } else {
      newInputStatus.chapter = 1;
    }

    //SetState with new Form Errors/Success
    this.setState({
      inputStatus: newInputStatus,
      errorMessage: newErrorMessage
    });

    //return True if an error in any form is present, otherwise false
    if (Object.values(newInputStatus).indexOf(-1) > -1) return true;
    else return false;
  }

  /*
   * On SignUp createUser and Login
   */
  createUser() {
    //Validate Form Response
    let formErrors = this.validateFormResponse();
    //only allow a user to be created if no error is present
    if (formErrors) return;

    axios
      .post("http://127.0.0.1:8000/api/users/", {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        main_chapter: this.state.selectedChapter
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
        // console.log(this.state.chapterList);
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
          <Item
            error={this.state.inputStatus.username == -1 ? true : false}
            success={this.state.inputStatus.username == 1 ? true : false}
          >
            <Input
              placeholder="Username"
              onChangeText={text => this.setState({ username: text })}
              name="username"
              value={this.state.username}
            />
            {this.state.inputStatus.username == -1 && (
              <Icon name="close-circle" />
            )}
            {this.state.inputStatus.username == 1 && (
              <Icon name="checkmark-circle" />
            )}
          </Item>
          {this.state.inputStatus.username == -1 && (
            <Text style={styles.errorMessage}>
              {this.state.errorMessage.usernameMessage}
            </Text>
          )}
          <Item
            error={this.state.inputStatus.email == -1 ? true : false}
            success={this.state.inputStatus.email == 1 ? true : false}
          >
            <Input
              placeholder="Email"
              onChangeText={text => this.setState({ email: text })}
              name="email"
              value={this.state.email}
            />
            {this.state.inputStatus.email == -1 && <Icon name="close-circle" />}
            {this.state.inputStatus.email == 1 && (
              <Icon name="checkmark-circle" />
            )}
          </Item>
          {this.state.inputStatus.email == -1 && (
            <Text style={styles.errorMessage}>
              {this.state.errorMessage.emailMessage}
            </Text>
          )}
          <Item
            error={this.state.inputStatus.password == -1 ? true : false}
            success={this.state.inputStatus.password == 1 ? true : false}
          >
            <Input
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={text => this.setState({ password: text })}
              name="password"
              value={this.state.password}
            />
            {this.state.inputStatus.password == -1 && (
              <Icon name="close-circle" />
            )}
            {this.state.inputStatus.password == 1 && (
              <Icon name="checkmark-circle" />
            )}
          </Item>
          {this.state.inputStatus.password == -1 && (
            <Text style={styles.errorMessage}>
              {this.state.errorMessage.passwordMessage}
            </Text>
          )}
          <Item
            last
            error={this.state.inputStatus.chapter == -1 ? true : false}
            success={this.state.inputStatus.chapter == 1 ? true : false}
          >
            <Picker
              note
              mode="dropdown"
              style={styles.picker}
              selectedValue={this.state.selectedChapter}
              onValueChange={selectedVal => {
                this.setState({ selectedChapter: selectedVal }, () => {
                  // console.log(this.state.selectedChapter);
                });
              }}
            >
              <Picker.Item label="Select a chapter" value="default" />
              {this.state.chapterList.map(function(chapter) {
                // console.log("chapter" + String(chapter.id));
                return (
                  <Picker.Item
                    label={chapter.name}
                    value={chapter.id}
                    key={String(chapter.id)}
                  />
                );
              })}
            </Picker>
            {this.state.inputStatus.chapter == -1 && (
              <Icon name="close-circle" />
            )}
            {this.state.inputStatus.chapter == 1 && (
              <Icon name="checkmark-circle" />
            )}
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
  },
  errorMessage: {
    color: "red",
    marginRight: 10
  }
});
