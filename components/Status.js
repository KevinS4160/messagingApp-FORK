import { NetInfo, Platform, StatusBar, Text, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'
import { Constants } from 'expo'

export default class Status extends React.Component {
  state = {
    info: null,
  }

  render() {
    const {info} = this.state

    const isConnected = info !== 'none'
    const backgroundColor = isConnected ? 'white' : 'red'
    
    if (Platform.OS == 'ios'){
        return(
            <View style={[styles.status, {backgroundColor}]}></View>
        )
    }
    return null //Temporary

    // return (
    //   <View>
    //     <Text>StatusBar</Text>
    //   </View>
    // );
  }
}

const statusHeight = Platform.OS == "ios" ? Constants.statusBarHeight : 0;

const styles = StyleSheet.create({
  status: {
    zIndex: 1,
    height: statusHeight,
  },
});