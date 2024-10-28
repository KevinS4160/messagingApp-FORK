import { StyleSheet, Text, View, Button, Alert } from "react-native"
import { Component, useState } from "react"
import Status from "./components/Status"
import MessageList from "./components/MessageList"
import {
  createTextMessage,
  createImageMessage,
  createLocationMessage,
} from "./utils/messageUtils"

export default function App() {
  const dummies = [
    createTextMessage("this is a test"),
    createTextMessage("2nd test"),
    createImageMessage(
      "https://www.brmwebdev.com/static/img/web-design/testing/testing.png"
    ),
    createTextMessage("2nd test"),
    createTextMessage("2nd test"),
    createTextMessage("2nd test"),
    createLocationMessage({ latitude: 40.741895, longitude: -73.989308 }),
  ]
  const [pressed, setPressed] = useState(false)
  const [messages, setMessages] = useState(dummies)

  deleteMessage = ({ id }) => {
    setMessages((prevMessage) => prevMessage.filter((item) => item.id !== id))
    console.log(messages)
  }

  handlePressMessage = (item) => {
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

  renderMessageList = () => {
    return (
      <View style={styles.content}>
        <MessageList
          messages={messages}
          onPressMessage={this.handlePressMessage}
        />
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <Status />
      {this.renderMessageList()}
      <View style={styles.inputMethodEditor}>
        <Text>Input Method Editor</Text>
      </View>
      <View style={styles.toolbar}>
        <Text>toolbar</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    backgroundColor: "white",
    // borderWidth: 2,
    // borderColor: "red",
    alignItems: "center",
    justifyContent: "center",
    transform: [{ translateY: 0 }],
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
    borderWidth: 2,
    borderColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },
})
