import { StackNavigationProp } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import React, { FC, useState } from "react";
import { Text, View, Image, TouchableHighlight } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { primaryColor, secondaryColor } from "../src/utils";
import {
  Countries,
  FormType,
  Gender,
  RootStackParamList,
} from "../src/@types/types";
import { Feather } from "@expo/vector-icons";

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList>;

interface Props {
  navigation: ProfileScreenNavigationProp;
}

export const Form: FC<Props> = ({ navigation }) => {
  const [formData, setFormData] = useState<FormType>({
    location: undefined,
    gender: undefined,
  });

  const [optionsShow, setOptionsShow] = useState(true);

  return (
    <View
      style={{
        flex: 1,
        padding: 25,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: primaryColor,
      }}
    >
      <StatusBar style="light" />
      <TouchableHighlight
        onPress={() => {
          navigation.navigate("About");
        }}
        underlayColor="transparent"
        style={{ position: "absolute", top: 50, right: 25 }}
      >
        <Feather name="info" size={24} color="white" />
      </TouchableHighlight>
      <Image
        style={{ width: 120, height: 120, marginBottom: 75 }}
        source={require("../assets/home-icon.png")}
      />
      <View
        style={{
          backgroundColor: secondaryColor,
          borderRadius: 25,
          width: "100%",
          marginBottom: 10,
        }}
      >
        <TouchableHighlight
          onPress={() => {
            setOptionsShow(!optionsShow);
          }}
          underlayColor={secondaryColor}
          style={{
            backgroundColor: optionsShow ? secondaryColor : primaryColor,
            width: "100%",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: 45,
            borderRadius: 50,
            borderWidth: 2,
            borderColor: optionsShow ? "rgba(255,255,255,0.5)" : "white",
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
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
                fontSize: 18,
              }}
            >
              Options
            </Text>
            <Feather
              name="chevron-down"
              size={24}
              color="white"
              style={[
                { position: "absolute", right: 15 },
                optionsShow ? { transform: [{ rotate: "180deg" }] } : {},
              ]}
            />
          </View>
        </TouchableHighlight>
        {optionsShow && (
          <View
            style={{
              width: "100%",
              padding: 25,
            }}
          >
            <View
              style={{
                borderRadius: 50,
                overflow: "hidden",
                marginBottom: 15,
              }}
            >
              <RNPickerSelect
                onValueChange={(value: Countries | undefined) => {
                  if (!value) return;

                  return setFormData({ ...formData, location: value });
                }}
                items={[
                  { label: "USA", value: "en" },
                  { label: "Australia", value: "au" },
                  { label: "Canada", value: "ca" },
                  { label: "New Zealand", value: "nz" },
                  { label: "Germany", value: "de" },
                  { label: "Denmark", value: "dk" },
                  { label: "France", value: "fr" },
                  { label: "Spain", value: "es" },
                  { label: "Swiss", value: "ch" },
                  { label: "United Kingdom", value: "gb" },
                  { label: "Norway", value: "no" },
                  { label: "Finland", value: "fi" },
                  { label: "Ireland", value: "ie" },
                  { label: "Netherlands", value: "nl" },
                  { label: "Brazil", value: "br" },
                  { label: "Turkey", value: "tr_TR" },
                  { label: "Iran", value: "ir" },
                ]}
                placeholder={{
                  label: "Select Country...",
                  value: undefined,
                }}
                useNativeAndroidPickerStyle={false}
                style={{
                  inputAndroid: {
                    borderRadius: 50,
                    width: "100%",
                    backgroundColor: "#f9f9f9",
                    height: 45,
                    color: "#000000",
                    textAlign: "center",
                    fontSize: 16,
                  },
                }}
              />
            </View>
            <View
              style={{
                borderRadius: 50,
                overflow: "hidden",
              }}
            >
              <RNPickerSelect
                onValueChange={(value: Gender) =>
                  setFormData({ ...formData, gender: value })
                }
                items={[
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
                ]}
                placeholder={{
                  label: "Select Gender...",
                  value: undefined,
                }}
                useNativeAndroidPickerStyle={false}
                style={{
                  inputAndroid: {
                    width: "100%",
                    backgroundColor: "#f9f9f9",
                    height: 45,
                    color: "#000000",
                    textAlign: "center",
                    fontSize: 16,
                  },
                }}
              />
            </View>
          </View>
        )}
      </View>
      <TouchableHighlight
        onPress={() => {
          navigation.navigate("Profile", { formData: formData });
        }}
        underlayColor="#ffffff95"
        style={{
          backgroundColor: "white",
          width: "100%",
          justifyContent: "center",
          height: 45,
          borderRadius: 50,
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
            Get Account
          </Text>
          <Feather
            name="chevron-right"
            size={24}
            color={primaryColor}
            style={[{ position: "absolute", right: 15 }]}
          />
        </View>
      </TouchableHighlight>
    </View>
  );
};
