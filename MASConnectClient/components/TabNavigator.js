import React from "react";
import { createBottomTabNavigator } from "react-navigation";

import HomeScreen from "../components/HomeScreen";
import SettingsScreen from "./SettingsScreen";

export default createBottomTabNavigator({
  Home: HomeScreen,
  Settings: SettingsScreen
});




