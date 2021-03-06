import { AsyncStorage } from "react-native";

export default {
  async storeToken(token) {
    try {
      return await AsyncStorage.setItem("Token", token);
    } catch (error) {
      console.log(error);
    }
  },
  async getToken() {
    try {
      const token = await AsyncStorage.getItem("Token");
      return token;
    } catch (error) {
      console.log(error);
      return -1
    }
  },
  async resetToken() {
    try {
      await AsyncStorage.removeItem("Token");
      return true;
    } catch (error) {
      console.log(error);
    }
  }
};
