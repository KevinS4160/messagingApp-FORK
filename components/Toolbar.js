import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native"
import PropTypes from "prop-types"
import React, { Component } from "react"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import FontAwesome6 from "@expo/vector-icons/FontAwesome6"

const ToolbarButton = ({ title, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.button}>{title}</View>
  </TouchableOpacity>
)
ToolbarButton.propTypes = {
  title: PropTypes.element.isRequired,
  onPress: PropTypes.func.isRequired,
}

export default class Toolbar extends Component {
  static propTypes = {
    isFocused: PropTypes.bool.isRequired,
    onChangeFocus: PropTypes.func,
    onSubmit: PropTypes.func,
    onPressCamera: PropTypes.func,
    onPressLocation: PropTypes.func,
  }

  static defaultProps = {
    onChangeFocus: () => {},
    onSubmit: () => {},
    onPressCamera: () => {},
    onPressLocation: () => {},
  }

  state = {
    text: "",
  }

  handleChangeText = (text) => {
    this.setState({ text })
  }

  handleSubmitEditing = () => {
    const { onSubmit } = this.props
    const { text } = this.state
    if (!text) return
    onSubmit(text)
    this.setState({ text: "" })
  }

  setInputRef = (ref) => {
    this.input = ref
  }

  componentDidUpdate(nextProps) {
    if (nextProps.isFocused !== this.props.isFocused) {
      if (nextProps.isFocused) {
        this.input.focus()
      } else {
        this.input.blur()
      }
    }
  }

  handleFocus = () => {
    const { onChangeFocus } = this.props
    console.log("On Focus")
    onChangeFocus(true)
  }

  handleBlur = () => {
    const { onChangeFocus } = this.props
    console.log("On Blur")
    onChangeFocus(false)
  }

  render() {
    const camera = <FontAwesome name="camera" size={24} color="black" />
    const location = (
      <FontAwesome6 name="location-dot" size={24} color="black" />
    )

    const { onPressCamera, onPressLocation } = this.props
    const { text } = this.state
    return (
      <View style={styles.toolbar}>
        <View style={styles.buttonContainer}>
          <ToolbarButton title={camera} onPress={onPressCamera} />
          <ToolbarButton title={location} onPress={onPressLocation} />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            underlineColorAndroid={"transparent"}
            placeholder={"Message"}
            blurOnSubmit={false}
            value={text}
            onChangeText={this.handleChangeText}
            onSubmitEditing={this.handleSubmitEditing}
            ref={this.setInputRef}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    paddingLeft: 16,
    backgroundColor: "#8ACE00",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  button: {
    top: -2,
    marginRight: 12,
    fontSize: 20,
    color: "grey",
  },
  inputContainer: {
    flex: 2,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.4)",
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: "#A7E228",
  },
  input: {
    flex: 1,
    fontWeight: "500",
    fontSize: 16,
  },
})
