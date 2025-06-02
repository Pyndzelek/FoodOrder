import { View, Text, StyleSheet, TextInput, Image } from "react-native";
import React, { useState } from "react";
import Button from "@/src/components/Button";
import Colors from "@/src/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { Stack } from "expo-router";

const defaultPizzaImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

const CreateScreen = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [erors, setErrors] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const validateInput = () => {
    if (!name.trim()) {
      setErrors("Name is required");
      return false;
    }
    if (!price.trim() || isNaN(Number(price)) || Number(price) <= 0) {
      setErrors("Price must be a valid number greater than 0");
      return false;
    }
    setErrors("");
    return true;
  };

  const onCreate = () => {
    if (!validateInput()) {
      return;
    }
    // Handle the creation logic here
    console.log("Creating product:", { name, price });
    // Reset fields after creation
    setName("");
    setPrice("");
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Create Product",
          headerStyle: { backgroundColor: Colors.light.tint },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <Image
        style={styles.image}
        source={{ uri: image || defaultPizzaImage }}
      />
      <Text onPress={pickImage} style={styles.imageText}>
        Select image
      </Text>

      <Text style={styles.label}>create</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholder="Name"
      ></TextInput>

      <Text style={styles.label}>Price ($)</Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        style={styles.input}
        placeholder="$9.99"
        keyboardType="numeric"
        inputMode="numeric"
      ></TextInput>

      <Text style={{ color: "red" }}>{erors}</Text>

      <Button text="create" onPress={onCreate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
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

export default CreateScreen;
