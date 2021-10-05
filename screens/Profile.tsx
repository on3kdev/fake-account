import { StackNavigationProp } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import React, { FC, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TouchableHighlight,
  Animated,
} from "react-native";
import { changeFields, primaryColor } from "../src/utils";
import Clipboard from "expo-clipboard";
import { DataType, FormType, RootStackParamList } from "../src/@types/types";
import { Feather } from "@expo/vector-icons";

interface Props {
  route: any;
  navigation: StackNavigationProp<RootStackParamList>;
}

const styles = StyleSheet.create({
  field: {
    borderColor: "white",
    borderWidth: 1,
    width: "100%",
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 50,
    marginBottom: 7,
    height: 40,
  },
  fieldContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 50,
    marginBottom: 7,
  },
  fieldSmall: {
    width: "50%",
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 15,
    paddingRight: 15,
  },
  fieldRight: {
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
  },
  fieldLeft: {
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
  },
  fieldText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
  fieldTextClicked: {
    color: primaryColor,
    textAlign: "center",
    fontSize: 16,
  },
  fieldIcon: {
    position: "absolute",
    right: 10,
  },
  fieldIconClicked: {
    position: "absolute",
    right: 10,
    color: primaryColor,
  },
  separator: {
    borderRightColor: "white",
    borderRightWidth: 1,
    height: "75%",
    marginTop: 4,
  },
});

export const Profile: FC<Props> = ({ route, navigation }) => {
  const [data, setData] = useState<DataType>();
  const [buttons, setButtons] = useState({
    firstName: false,
    lastname: false,
    email: false,
    username: false,
    password: false,
    phone: false,
    birthday: false,
  });
  const [reload, setReload] = useState(true);
  const [copiedText, setCopiedText] = useState<string>();

  const username = `${data?.firstname
    .slice(0, 3)
    .toLowerCase()}.${data?.lastname.slice(0, 3).toLowerCase()}`;

  const { location, gender }: FormType = route.params.formData;

  const params = new URLSearchParams();

  location && params.append("nat", location);
  gender && params.append("gender", gender);

  const url = "https://randomuser.me/api/?" + params.toString();

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!reload) return;

    fetch(url)
      .then((res) => res.json())
      .then((response) => {
        const modfiedData: DataType = changeFields(response.results[0]);
        setData(modfiedData);
        setReload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [reload]);

  const opacityAnimation = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }, 3000);
  };

  if (!data)
    return (
      <>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            flexDirection: "row",
            padding: 10,
          }}
        >
          <ActivityIndicator size={80} color={primaryColor} />
        </View>
      </>
    );

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 25,
        backgroundColor: primaryColor,
      }}
    >
      <StatusBar style="auto" />
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ProfileImage", { image: data.image })
        }
      >
        <Image
          style={{
            width: 200,
            height: 200,
            borderRadius: 100,
            marginBottom: 25,
          }}
          source={{
            uri: data.image,
          }}
        />
      </TouchableOpacity>
      <TouchableHighlight
        style={styles.field}
        underlayColor="white"
        onHideUnderlay={() => setButtons({ ...buttons, firstName: false })}
        onShowUnderlay={() => setButtons({ ...buttons, firstName: true })}
        onPress={() => {
          Clipboard.setString(data.firstname);
          setCopiedText("Firstname");
          opacityAnimation();
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
            style={
              buttons.firstName ? styles.fieldTextClicked : styles.fieldText
            }
          >
            {data.firstname}
          </Text>
          <Feather
            name="copy"
            size={20}
            color="white"
            style={
              buttons.firstName ? styles.fieldIconClicked : styles.fieldIcon
            }
          />
        </View>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.field}
        underlayColor="white"
        onHideUnderlay={() => setButtons({ ...buttons, lastname: false })}
        onShowUnderlay={() => setButtons({ ...buttons, lastname: true })}
        onPress={() => {
          Clipboard.setString(data.lastname);
          setCopiedText("Lastname");
          opacityAnimation();
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
            style={
              buttons.lastname ? styles.fieldTextClicked : styles.fieldText
            }
          >
            {data.lastname}
          </Text>
          <Feather
            name="copy"
            size={20}
            color="white"
            style={
              buttons.lastname ? styles.fieldIconClicked : styles.fieldIcon
            }
          />
        </View>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.field}
        underlayColor="white"
        onHideUnderlay={() => setButtons({ ...buttons, email: false })}
        onShowUnderlay={() => setButtons({ ...buttons, email: true })}
        onPress={() => {
          Clipboard.setString(data.email);
          setCopiedText("E-Mail");
          opacityAnimation();
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
            style={buttons.email ? styles.fieldTextClicked : styles.fieldText}
          >
            {data.email}
          </Text>
          <Feather
            name="copy"
            size={20}
            color="white"
            style={buttons.email ? styles.fieldIconClicked : styles.fieldIcon}
          />
        </View>
      </TouchableHighlight>
      <View style={styles.fieldContainer}>
        <TouchableHighlight
          style={{ ...styles.fieldSmall, ...styles.fieldLeft }}
          underlayColor="white"
          onHideUnderlay={() => setButtons({ ...buttons, username: false })}
          onShowUnderlay={() => setButtons({ ...buttons, username: true })}
          onPress={() => {
            Clipboard.setString(username);
            setCopiedText("Username");
            opacityAnimation();
          }}
        >
          <Text
            style={
              buttons.username ? styles.fieldTextClicked : styles.fieldText
            }
          >
            {username}
          </Text>
        </TouchableHighlight>
        <View style={styles.separator}></View>
        <TouchableHighlight
          style={{ ...styles.fieldSmall, ...styles.fieldRight }}
          underlayColor="white"
          onHideUnderlay={() => setButtons({ ...buttons, password: false })}
          onShowUnderlay={() => setButtons({ ...buttons, password: true })}
          onPress={() => {
            Clipboard.setString(data.password);
            setCopiedText("Password");
            opacityAnimation();
          }}
        >
          <Text
            style={
              buttons.password ? styles.fieldTextClicked : styles.fieldText
            }
          >
            {data.password}
          </Text>
        </TouchableHighlight>
      </View>
      <View style={styles.fieldContainer}>
        <TouchableHighlight
          style={{ ...styles.fieldSmall, ...styles.fieldLeft }}
          underlayColor="white"
          onHideUnderlay={() => setButtons({ ...buttons, phone: false })}
          onShowUnderlay={() => setButtons({ ...buttons, phone: true })}
          onPress={() => {
            Clipboard.setString(data.phone);
            setCopiedText("Phone number");
            opacityAnimation();
          }}
        >
          <Text
            style={buttons.phone ? styles.fieldTextClicked : styles.fieldText}
          >
            {data.phone}
          </Text>
        </TouchableHighlight>
        <View style={styles.separator}></View>
        <TouchableHighlight
          style={{ ...styles.fieldSmall, ...styles.fieldRight }}
          underlayColor="white"
          onHideUnderlay={() => setButtons({ ...buttons, birthday: false })}
          onShowUnderlay={() => setButtons({ ...buttons, birthday: true })}
          onPress={() => {
            Clipboard.setString(data.birthday);
            setCopiedText("Birthday");
            opacityAnimation();
          }}
        >
          <Text
            style={
              buttons.birthday ? styles.fieldTextClicked : styles.fieldText
            }
          >
            {data.birthday}
          </Text>
        </TouchableHighlight>
      </View>
      <TouchableHighlight
        onPress={() => {
          setReload(true);
        }}
        underlayColor="#ffffff95"
        style={{
          backgroundColor: "white",
          width: "100%",
          justifyContent: "center",
          height: 45,
          borderRadius: 50,
          marginTop: 5,
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
            Reload
          </Text>
          <Feather
            name="rotate-cw"
            size={20}
            color={primaryColor}
            style={{ position: "absolute", right: 20 }}
          />
        </View>
      </TouchableHighlight>
      <Animated.View
        style={[
          {
            position: "absolute",
            bottom: 25,
            backgroundColor: "#e8e8e8",
            paddingBottom: 5,
            paddingTop: 5,
            paddingRight: 10,
            paddingLeft: 10,
            borderRadius: 50,
            opacity: fadeAnim,
          },
        ]}
      >
        <Text>{copiedText} copied!</Text>
      </Animated.View>
    </View>
  );
};
