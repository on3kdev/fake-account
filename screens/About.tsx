import { StackNavigationProp } from "@react-navigation/stack";
import React, { FC } from "react";
import {
  View,
  Text,
  TouchableHighlight,
  Alert,
  StyleSheet,
  Linking,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { primaryColor, secondaryColor } from "../src/utils";
import { RootStackParamList } from "../src/@types/types";
import { Feather } from "@expo/vector-icons";

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList>;

interface Props {
  navigation: ProfileScreenNavigationProp;
}

export const About: FC<Props> = ({ navigation }) => {
  const styles = StyleSheet.create({
    title: {
      color: "white",
      fontSize: 18,
    },
    text: {
      color: "white",
      marginTop: 10,
      fontSize: 16,
    },
    listItem: {},
  });
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: primaryColor,
        paddingTop: 5,
        paddingBottom: 5,
      }}
    >
      <StatusBar style="auto" />
      <TouchableHighlight
        onPress={() => {
          Alert.alert("Probably a future easter egg!");
        }}
        style={{
          paddingLeft: 12,
          paddingRight: 12,
        }}
        underlayColor={secondaryColor}
      >
        <View
          style={{
            paddingTop: 12,
            paddingBottom: 12,
            borderBottomWidth: 0.5,
            borderColor: "white",
          }}
        >
          <Text style={{ color: "white", fontSize: 15 }}>App Version</Text>
          <Text style={{ color: "white", fontSize: 12 }}>1.0.0</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() => {
          navigation.navigate("Terms");
        }}
        style={{
          paddingLeft: 12,
          paddingRight: 12,
        }}
        underlayColor={secondaryColor}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 12,
            paddingBottom: 12,
            borderBottomWidth: 0.5,
            borderColor: "white",
          }}
        >
          <View>
            <Text style={{ color: "white", fontSize: 15 }}>Terms of use</Text>
          </View>
          <View>
            <Feather name="chevron-right" size={20} color="white" />
          </View>
        </View>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() => {
          navigation.navigate("Privacy");
        }}
        style={{
          paddingLeft: 12,
          paddingRight: 12,
        }}
        underlayColor={secondaryColor}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 12,
            paddingBottom: 12,
            borderBottomWidth: 0.5,
            borderColor: "white",
          }}
        >
          <View>
            <Text style={{ color: "white", fontSize: 15 }}>Privacy Policy</Text>
          </View>
          <View>
            <Feather name="chevron-right" size={20} color="white" />
          </View>
        </View>
      </TouchableHighlight>
      <View
        style={{
          paddingLeft: 12,
          paddingRight: 12,
          marginTop: 25,
        }}
      >
        <Text style={styles.title}>Notes:</Text>
        <View style={styles.listItem}>
          <Text style={styles.text}>
            - We take no responsibility for actions taken with accounts created
            with information provided by us.
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.text}>
            - This app does not provide login information but data that can be
            used as sample data for logins to platforms.
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.text}>
            - All pictures, names and other information are fictitious. These
            people in the pictures do not exist - they are generated
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.text}>
            - The information come from "Random User Generator":{" "}
          </Text>
          <TouchableHighlight
            onPress={() => {
              Linking.openURL("https://randomuser.me/");
            }}
            underlayColor="#ffffff95"
            style={{
              backgroundColor: "white",
              width: "100%",
              justifyContent: "center",
              height: 45,
              borderRadius: 50,
              marginTop: 25,
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                position: "relative",
              }}
            >
              <Text
                style={{
                  color: primaryColor,
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: 18,
                }}
              >
                Go To Random User Generator
              </Text>
              <Feather
                name="external-link"
                size={24}
                color={primaryColor}
                style={{ position: "absolute", right: 20 }}
              />
            </View>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};
