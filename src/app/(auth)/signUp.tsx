import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";
import Colors from "@/src/constants/Colors";
import Button from "@/src/components/Button";
import { Link } from "expo-router";

const SignUp = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  // Handle sign-in logic here, e.g., API call to authenticate user
  async function handleSignUp() {
    // Example: Call your authentication API here
  }

  return (
    <View style={styles.cotnainer}>
      <Text style={styles.title}>Create an account!</Text>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        autoCapitalize="none"
        autoComplete="password"
        textContentType="password"
        returnKeyType="done"
        value={password}
        onChangeText={setPassword}
      />
      <Text style={styles.label}>Confirm password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        autoCapitalize="none"
        autoComplete="password"
        textContentType="password"
        returnKeyType="done"
        value={password}
        onChangeText={setPassword}
      />
      <View style={{ marginTop: 30 }}>
        <Button text="Sign Up" onPress={SignUp} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cotnainer: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    backgroundColor: "#fff",
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  label: {
    marginTop: 20,
    fontSize: 16,
    color: "gray",
  },
  image: {
    width: "50%",
    aspectRatio: 1,
    alignSelf: "center",
  },
  imageText: {
    textAlign: "center",
    color: Colors.light.tint,
    fontWeight: "bold",
    marginVertical: 10,
  },
});

export default SignUp;
