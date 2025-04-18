import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native"
import PropTypes from "prop-types"
import MapView, { Marker } from "react-native-maps"
import React from "react"
import { MessageShape } from "../utils/messageUtils"

const keyExtractor = (item) => item.id.toString()

export default class MessageList extends React.Component {
  static propTypes = {
    messages: PropTypes.arrayOf(MessageShape).isRequired,
    onPressMessage: PropTypes.func,
    onLongPressMessage: PropTypes.func,
  }

  static defaultProps = {
    onPressMessage: () => {},
    onLongPressMessage: () => {},
  }

  renderMessageItem = ({ item }) => {
    {
      const { onPressMessage, onLongPressMessage } = this.props
      return (
        <View key={item.id} style={styles.messageRow}>
          <TouchableOpacity
            onPress={() => onPressMessage(item)}
            onLongPress={() => onLongPressMessage(item)}
            delayLongPress={1000}
          >
            {this.renderMessageBody(item)}
          </TouchableOpacity>
        </View>
      )
    }
  }

  renderMessageBody = ({ type, text, uri, coordinate }) => {
    switch (type) {
      case "text":
        return (
          <View style={styles.messageBubble}>
            <Text style={styles.text}>{text}</Text>
          </View>
        )
      case "image":
        return (
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri }} />
          </View>
        )
      case "location":
        return (
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              initialRegion={{
                ...coordinate,
                latitudeDelta: 0.08,
                longitudeDelta: 0.04,
              }}
            >
              <Marker coordinate={coordinate} />
            </MapView>
          </View>
        )
      default:
        return null
    }
  }

  render() {
    const { messages } = this.props
    return (
      <FlatList
        style={styles.container}
        inverted={false}
        data={messages}
        renderItem={this.renderMessageItem}
        keyExtractor={keyExtractor}
        keyboardShouldPersistTaps={"handled"}
      />
    )
  }
}

const green = "#8ACE00"
const blue = "#218aff"
const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "visible",
  },
  messageRow: {
    // borderWidth: 2,
    flexDirection: "row",
    justifyContent: "flex-end",
    marginVertical: 3,
    paddingHorizontal: 5,
    width: "100%",
  },
  messageBubble: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "black",
  },
  image: {
    width: 200,
    aspectRatio: 1,
    resizeMode: "contain",
    overflow: "hidden",
  },
  imageContainer: {
    padding: 5,
    borderRadius: 30,
    backgroundColor: "black",
  },
  map: {
    width: 200,
    aspectRatio: 1,
    overflow: "hidden",
  },
  mapContainer: {
    padding: 10,
    borderRadius: 15,
    backgroundColor: "black",
  },
  text: {
    color: "white",
    fontSize: 15,
  },
})
