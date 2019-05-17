import React from "react";
import {Text} from "react-native";
import { List, ListItem, Container, Header, Body, Title, Button } from "native-base";
import Chapter from "./Chapter";
import { connect } from 'react-redux'




class HomeScreenComponent extends React.Component {

  render() {
    console.log(this.props.user)
    return(

            <Container>
              <Header style={{ height: 40 }}>
                <Body>
                <Title>Header</Title>
                <Button>
                  <Text>Click</Text>
                </Button>
                </Body>
              </Header>
              <Chapter />

            </Container>
          );

  }
}


const mapStateToProps = (state) => {
    return {
      user: state.user
    }
}
export default connect(mapStateToProps)(HomeScreenComponent)





