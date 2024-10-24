import {
  Platform,
  StatusBar,
  Text,
  StyleSheet,
  View,
  Animated,
  Easing,
} from "react-native";
import React, { Component, useState, useEffect, useRef } from "react";
import Constants from "expo-constants";
import NetInfo from "@react-native-community/netinfo";



const Status = () => {
  state = {
    info: null,
  };
  
  const AnimatedStatusBar = Animated.createAnimatedComponent(StatusBar)
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const barAnim = useRef(new Animated.Value(0)).current;
  const fade = () => {
    Animated.timing(fadeAnim, {
      toValue: isConnected ? 0 : 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    Animated.timing(barAnim, {
      toValue: isConnected ? 0 : 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const unsubscribe = NetInfo.addEventListener((net) => {
    this.state.info = net.type;
    console.log("Connection type", net.type);
    console.log("Is connected?", net.isConnected);
  });
  const isConnected = this.state.info !== "none";

  const backgroundColor = barAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(255,0,0,0)','rgba(255,0,0,1)'],
  });

  isConnected ? fade() : fade();
  
  const statusBar = (
    <Animated.View style={{ backgroundColor: backgroundColor }}>
      <AnimatedStatusBar
        barStyle={isConnected ? "dark-content" : "light-content"}
        animated={true}
        backgroundColor={backgroundColor}
      />
    </Animated.View>
  );
  
  const messageContainer = (
    <View style={styles.messageContainer} pointerEvents={"none"}>
      {statusBar}
      <Animated.View style={[styles.bubble, { opacity: fadeAnim }]}>
        <Text style={styles.text}>No Network Connection</Text>
      </Animated.View>
    </View>
  );

  if (Platform.OS == "ios") {
    return (
      <View style={[styles.status, { backgroundColor }]}>
        {messageContainer}
      </View>
    );
  }
  return messageContainer;
};

export default Status;

const statusHeight = Platform.OS == "ios" ? Constants.statusBarHeight : 0;

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
});
