import React, { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Form } from "../screens/Form";
import { Profile } from "../screens/Profile";
import { ProfileImage } from "../screens/ProfileImage";
import { RootStackParamList } from "./@types/types";
import { About } from "../screens/About";
import { Privacy } from "../screens/Privacy";
import { Terms } from "../screens/Terms";

interface Props {}

const Stack = createStackNavigator<RootStackParamList>();

export const Navigation: FC<Props> = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Form">
        <Stack.Screen
          name="Form"
          options={{
            headerShown: false,
          }}
        >
          {(props) => <Form {...props} />}
        </Stack.Screen>
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ title: "Profile" }}
        />
        <Stack.Screen
          name="ProfileImage"
          component={ProfileImage}
          options={{ title: "Profile Image" }}
        />
        <Stack.Screen
          name="About"
          component={About}
          options={{ title: "About" }}
        />
        <Stack.Screen
          name="Privacy"
          component={Privacy}
          options={{ title: "Privacy Policy" }}
        />
        <Stack.Screen
          name="Terms"
          component={Terms}
          options={{ title: "Terms" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
