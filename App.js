import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Status from './components/Status'

export default function App() {

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text>Content</Text>
      </View>
      <View style={styles.inputMethodEditor}>
        <Text>Input Method Editor</Text>
      </View>
      <View style={styles.toolbar}>
        <Text>Toolbar</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "red",
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
    borderWidth: 2,
    borderColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },
});
