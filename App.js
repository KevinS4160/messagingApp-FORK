import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  ImageBackground,
  TouchableHighlight,
  BackHandler,
  Platform,
  PermissionsAndroid,
} from "react-native"
import { Component, useState, useEffect } from "react"
import Geolocation from "react-native-geolocation-service"
import * as Location from "expo-location"
import Status from "./components/Status"
import MessageList from "./components/MessageList"
import Toolbar from "./components/Toolbar"
import {
  createTextMessage,
  createImageMessage,
  createLocationMessage,
} from "./utils/messageUtils"

const dummies = [
  createTextMessage("this is a test"),
  createTextMessage("2nd test"),
  createImageMessage(
    "https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U"
  ),
  createTextMessage("2nd test"),
  createTextMessage("2nd test"),
  createTextMessage("2nd test"),
  createLocationMessage({ latitude: 40.741895, longitude: -73.989308 }),
]

export default function App() {
  const [messages, setMessages] = useState(dummies)
  const [fullscreenImageId, setFullscreenImageId] = useState(null)
  const [isInputFocused, setIsInputFocused] = useState(false)

  // Log on fullscreen ID change
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (fullscreenImageId) {
          this.dismissFullscreenImage()
          return true
        }
        return false
      }
    )

    return () => backHandler.remove()
  }, [fullscreenImageId])

  deleteMessage = ({ id }) => {
    setMessages((prevMessage) => prevMessage.filter((item) => item.id !== id))
    console.log(messages)
  }

  handlePressMessage = ({ id, type }) => {
    switch (type) {
      case "text":
        break

      case "image":
        setFullscreenImageId(id)
        break

      default:
        break
    }
  }

  handleLongPressMessage = (item) => {
    console.log(item.id)
    Alert.alert("Delete", "Are you sure you want to delete?", [
      {
        text: "Delete",
        onPress: () => deleteMessage(item),
        style: "destructive",
      },
      { text: "Cancel", onPress: () => console.log("cancel"), style: "cancel" },
    ])
  }

  dismissFullscreenImage = () => {
    setFullscreenImageId(null)
  }

  renderMessageList = () => {
    return (
      <View style={styles.content}>
        <ImageBackground
          style={styles.imgBackground}
          resizeMode="contain"
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Charli_XCX_-_Brat_%28album_cover%29.png/800px-Charli_XCX_-_Brat_%28album_cover%29.png",
          }}
        >
          <MessageList
            messages={messages}
            onPressMessage={this.handlePressMessage}
            onLongPressMessage={this.handleLongPressMessage}
          />
        </ImageBackground>
      </View>
    )
  }

  renderFullscreenImage = () => {
    if (!fullscreenImageId) return null
    const image = messages.find((message) => message.id === fullscreenImageId)
    if (!image) return null
    if (isInputFocused) setIsInputFocused(false)
    const { uri } = image
    return (
      <TouchableHighlight
        style={styles.fullscreenOverlay}
        onPress={this.dismissFullscreenImage}
        activeOpacity={1}
        underlayColor={"rgba(0,0,0,0.7)"}
      >
        <Image style={styles.fullscreenImage} source={{ uri }} />
      </TouchableHighlight>
    )
  }
  handlePressToolbarCamera = () => {
    console.log("Camera")
  }

  const hasLocationPermission = async () => {
    if (Platform.OS === "ios") {
      const hasPermission = await hasPermissionIOS()
      return hasPermission
    }

    if (Platform.OS === "android" && Platform.Version < 23) {
      return true
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    )

    if (hasPermission) {
      return true
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    )

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        "Location permission denied by user.",
        ToastAndroid.LONG
      )
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        "Location permission revoked by user.",
        ToastAndroid.LONG
      )
    }

    return false
  }

  handlePressToolbarLocation = async () => {
    const hasPermission = await Location.requestForegroundPermissionsAsync()
    if (!hasPermission) return
    const loc = await Location.getCurrentPositionAsync({})
    const { latitude, longitude } = loc.coords
    setMessages([...messages, createLocationMessage({ latitude, longitude })])
  }

  handleChangeFocus = (isFocused) => {
    setIsInputFocused(isFocused)
  }

  handleSubmit = (text) => {
    setMessages([...messages, createTextMessage(text)])
  }
  renderToolbar = () => {
    return (
      <View style={styles.toolbar}>
        <Toolbar
          isFocused={isInputFocused}
          onSubmit={this.handleSubmit}
          onChangeFocus={this.handleChangeFocus}
          onPressCamera={this.handlePressToolbarCamera}
          onPressLocation={this.handlePressToolbarLocation}
        />
      </View>
    )
  }

  renderInputMethodEditor = () => {
    return (
      <View style={styles.inputMethodEditor}>
        <Text>Input Method Editor</Text>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <Status />
      {this.renderMessageList()}
      {this.renderToolbar()}
      {/* {this.renderInputMethodEditor()} */}
      {this.renderFullscreenImage()}
    </View>
  )
}

const styles = StyleSheet.create({
  imgBackground: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 3,
    backgroundColor: "#8ACE00",
    // borderWidth: 2,
    // borderColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  inputMethodEditor: {
    flex: 1,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
  toolbar: {
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.04)",
    backgroundColor: "white",
    borderColor: "green",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  fullscreenOverlay: {
    paddingHorizontal: 30,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  fullscreenImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
})
