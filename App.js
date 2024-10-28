import { StyleSheet, Text, View, Button } from "react-native"
import { Component, useState } from "react"
import Status from "./components/Status"
import MessageList from "./components/MessageList"
import {
  createTextMessage,
  createImageMessage,
  createLocationMessage,
} from "./utils/messageUtils"

export default function App() {
  const [pressed, setPressed] = useState(false)

  state = {
    messages: [
      createTextMessage("this is a test"),
      createTextMessage("2nd test"),
      createImageMessage(
        "https://www.brmwebdev.com/static/img/web-design/testing/testing.png"
      ),
      createTextMessage("2nd test"),
      createTextMessage("2nd test"),
      createTextMessage("2nd test"),
      createLocationMessage({ latitude: 40.741895, longitude: -73.989308 }),
    ],
  }
  handlePressMessage = () => {}

  renderMessageList = () => {
    const { messages } = this.state
    return (
      <View style={styles.content}>
        <MessageList messages={messages} />
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
