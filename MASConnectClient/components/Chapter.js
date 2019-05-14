import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, H1, H2, H3, List, ListItem, Button, Icon } from "native-base";
import { withStore, loadUser } from "../store";

class Chapter extends React.Component {
  render() {
    return (
      <View>
        <View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View>
              <H1 style={styles.MASText}>MAS</H1>
              <H3 style={styles.ChapterNameText}> Urbana-Champaign</H3>
            </View>
            <View>
              <Text style={styles.contactText}>Contact: Arken is Kool</Text>
              <Text style={styles.contactText}>Email: </Text>
              <Text style={styles.contactText}>Phone: </Text>
            </View>
          </View>
          <Text style={styles.addressText}>
            1234 Main St. Islamville, Kentucky 40513
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-evenly" }}
          >
            <Text style={styles.addressText}>128 Members</Text>
            <Text style={styles.addressText}>13 Events</Text>
          </View>
        </View>
        <View>
          <List>
            <ListItem style={{ justifyContent: "space-between" }}>
              <Text>Event 1</Text>
              <Text>Details</Text>
            </ListItem>
            <ListItem style={{ justifyContent: "space-between" }}>
              <Text>Event 2</Text>
              <Text>Details</Text>
            </ListItem>
            <ListItem style={{ justifyContent: "space-between" }}>
              <Text>Event 3</Text>
              <Text>Details</Text>
            </ListItem>
            <ListItem style={{ justifyContent: "space-between" }}>
              <Text>11 more events...</Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ marginRight: 10 }}>Go to events</Text>
                <Icon name="arrow-forward" />
              </View>
            </ListItem>
          </List>
          <Button bordered style={styles.button}>
            <Text>32 Unread Posts!</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    alignSelf: "center"
  },
  contactText: {
    alignSelf: "flex-start",
    marginRight: 10
  },
  addressText: {
    marginTop: 10,
    alignSelf: "center"
  },
  MASText: {
    marginBottom: 5,
    alignSelf: "flex-start",
    fontSize: 40,
    padding: 10
  },
  ChapterNameText: {
    marginBottom: 5,
    alignSelf: "flex-start"
  }
});

export default withStore(Chapter);
