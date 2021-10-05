import React, { FC } from "react";
import { Image, View, Text, TouchableHighlight, Alert } from "react-native";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { Permission } from "../src/@types/types";
import { Feather } from "@expo/vector-icons";

interface Props {
  route: any;
}

const getPermissions = async () => {
  const permissionPromise = await MediaLibrary.requestPermissionsAsync();

  return permissionPromise as Permission | null;
};

const downloadFile = async (image: string) => {
  const permission: Permission | null = await getPermissions();

  if (!permission || !permission.granted)
    return Alert.alert("Please enable Permissions in the Settings");

  const uriArray = image.split("/");
  const filename = uriArray[uriArray.length - 1];
  const fileUri = `${FileSystem.documentDirectory}${filename}`;
  const downloadedFile = await FileSystem.downloadAsync(image, fileUri);

  if (downloadedFile.status != 200) {
    Alert.alert("Download failed");
    return;
  }

  try {
    const asset = await MediaLibrary.createAssetAsync(downloadedFile.uri);
    const album = await MediaLibrary.getAlbumAsync("Download");
    if (album == null) {
      await MediaLibrary.createAlbumAsync("Download", asset, false);
    } else {
      await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
    }
    Alert.alert("Download successfully!");
  } catch (e) {
    Alert.alert("Download failed");
    return false;
  }
};

export const ProfileImage: FC<Props> = ({ route }) => {
  const image: string = route.params.image;

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",
      }}
    >
      <Image
        style={{
          width: "100%",
          height: 400,
          resizeMode: "contain",
        }}
        source={{ uri: image }}
      />
      <TouchableHighlight
        style={{
          backgroundColor: "white",
          justifyContent: "center",
          width: "100%",
          height: 45,
          borderRadius: 50,
          marginTop: 5,
          position: "absolute",
          bottom: 15,
        }}
        onPress={() => downloadFile(image)}
        underlayColor="#ffffff95"
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
          <Text style={{ textAlign: "center" }}>Download</Text>
          <Feather
            name="download"
            size={20}
            color="black"
            style={{ position: "absolute", right: 20 }}
          />
        </View>
      </TouchableHighlight>
    </View>
  );
};
