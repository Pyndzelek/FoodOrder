import { View, Text, StyleSheet, TextInput, Image, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import Button from "@/src/components/Button";
import Colors from "@/src/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import {
  useCreateProduct,
  useProduct,
  useUpdateProduct,
} from "@/src/api/products";

const defaultPizzaImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

const CreateScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseInt(typeof idString === "string" ? idString : idString?.[0]);
  const isUpdating = !!id;

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [erors, setErrors] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const router = useRouter();

  const { mutate: createProduct } = useCreateProduct();
  const { mutate: updateProduct } = useUpdateProduct();
  const { data: product } = useProduct(id);

  useEffect(() => {
    if (product) {
      setName(product?.name || "");
      setPrice(product?.price.toString() || "");
      setImage(product?.image || null);
    }
  }, [product]);

  const pickImage = async () => {
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
    createProduct(
      {
        name,
        price: parseFloat(price),
      },
      {
        onSuccess: () => {
          router.back();
        },
      }
    );
  };

  const onUpdate = () => {
    if (!validateInput()) {
      return;
    }
    console.log("Updating product with id:", id);
    // Handle the update logic here
    updateProduct(
      {
        id,
        name,
        price: parseFloat(price),
        image,
      },
      {
        onSuccess: () => {
          router.back();
        },
      }
    );
  };

  const onDelete = () => {
    // Handle the deletion logic here
    console.log("Deleting product with id:", id);
    // Reset fields after deletion
    setName("");
    setPrice("");
    setImage(null);
  };

  const confirmDelete = () => {
    // Implement confirmation logic here
    console.log("Confirm delete action");
    Alert.alert(
      "Delete Product",
      "Are you sure you want to delete this product?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: onDelete,
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  const onSubmit = () => {
    if (isUpdating) {
      onUpdate();
    } else {
      onCreate();
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: isUpdating ? "Update product" : "Create Product",
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

      <Button text={isUpdating ? "update" : "create"} onPress={onSubmit} />
      {isUpdating && (
        <Text onPress={confirmDelete} style={styles.imageText}>
          Delete
        </Text>
      )}
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
