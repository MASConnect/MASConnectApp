import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { createBottomTabNavigator } from "react-navigation";

import HomeScreen from "./HomeScreen";
import SettingsScreen from "./SettingsScreen";

const TabNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  Settings: SettingsScreen
});

export default TabNavigator;
