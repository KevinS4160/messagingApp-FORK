import {
  Platform,
  StatusBar,
  Text,
  StyleSheet,
  View,
  Animated,
  Easing,
} from "react-native"
import React, { Component, useState, useEffect, useRef } from "react"
import Constants from "expo-constants"
import NetInfo from "@react-native-community/netinfo"

const Status = () => {
  const [isConnected, setIsConnected] = useState(true)

  const AnimatedStatusBar = Animated.createAnimatedComponent(StatusBar)
  const fadeAnim = useRef(new Animated.Value(0)).current
  const barAnim = useRef(new Animated.Value(0)).current
  const yMove = useRef(new Animated.Value(0)).current

  const fade = (connected) => {
    Animated.timing(fadeAnim, {
      toValue: connected ? 0 : 1,
      duration: 1000,
      delay: connected ? 1000 : 0,
      useNativeDriver: true,
    }).start()

    Animated.timing(barAnim, {
      toValue: connected ? 0 : 1,
      duration: 1000,
      useNativeDriver: false,
    }).start()

    Animated.timing(yMove, {
      toValue: connected ? 0 : 1,
      duration: 1000,
      delay: connected ? 1000 : 0,
      useNativeDriver: true,
    }).start()
  }

  const backgroundColor = barAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(255,0,0,0)", "rgba(255,0,0,1)"],
  })
  const yMovement = yMove.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 0],
  })

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((net) => {
      setIsConnected(net.isConnected)
    })
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    fade(isConnected)
  }, [isConnected])

  const statusBar = (
    <Animated.View style={{ backgroundColor: backgroundColor }}>
      <AnimatedStatusBar
        barStyle={isConnected ? "dark-content" : "light-content"}
        animated={true}
        backgroundColor={backgroundColor}
      />
    </Animated.View>
  )

  const messageContainer = (
    <View style={styles.messageContainer} pointerEvents={"none"}>
      {statusBar}
      <Animated.View
        style={[
          styles.bubble,
          {
            opacity: fadeAnim,
            transform: [{ translateY: yMovement }],
            backgroundColor: isConnected ? "green" : "red",
          },
        ]}
      >
        <Text style={styles.text}>
          {isConnected ? "Connected" : "No Network Connectivity"}
        </Text>
      </Animated.View>
    </View>
  )

  if (Platform.OS == "ios") {
    return (
      <View style={[styles.status, { backgroundColor }]}>
        {messageContainer}
      </View>
    )
  }
  return messageContainer
}

export default Status

const statusHeight = Platform.OS == "ios" ? Constants.statusBarHeight : 0

const styles = StyleSheet.create({
  status: {
    zIndex: 1,
    height: statusHeight,
  },
  messageContainer: {
    zIndex: 1,
    position: "absolute",
    top: statusHeight + 20,
    right: 0,
    left: 0,
    height: 80,
    alignItems: "center",
  },
  bubble: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "red",
  },
  text: {
    color: "white",
  },
})
