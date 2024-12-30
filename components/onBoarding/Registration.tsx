import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { CustomDatePicker } from "./CustomDatePicker";

interface FormData {
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: Date;
  country: string;
  zipCode: string;
}

interface ValidationState {
  firstName: boolean;
  lastName: boolean;
  gender: boolean;
  dateOfBirth: boolean;
  country: boolean;
  zipCode: boolean;
}

interface RegistrationProps {
  onValidationChange: (isValid: boolean) => void;
}

export default function Registration({ onValidationChange }: RegistrationProps) {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: new Date(),
    country: "",
    zipCode: "",
  });

  const [touched, setTouched] = useState<ValidationState>({
    firstName: false,
    lastName: false,
    gender: false,
    dateOfBirth: false,
    country: false,
    zipCode: false,
  });

  const [errors, setErrors] = useState<ValidationState>({
    firstName: false,
    lastName: false,
    gender: false,
    dateOfBirth: false,
    country: false,
    zipCode: false,
  });

  const validateField = (name: keyof FormData, value: string | Date) => {
    if (value instanceof Date) {
      return value <= new Date();
    }
    return value.trim().length > 0;
  };

  const validateForm = () => {
    const newErrors = Object.keys(formData).reduce((acc, key) => ({
      ...acc,
      [key]: !validateField(key as keyof FormData, formData[key as keyof FormData]),
    }), {} as ValidationState);
    
    const isValid = !Object.values(newErrors).some(error => error);
    onValidationChange(isValid);
    return isValid;
  };

  const handleChange = (name: keyof FormData, value: string | Date) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: !validateField(name, value),
      }));
      validateForm();
    }
  };

  const handleBlur = (name: keyof FormData) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({
      ...prev,
      [name]: !validateField(name, formData[name]),
    }));
    validateForm();
  };

  const getInputStyle = (fieldName: keyof FormData) => {
    if (!touched[fieldName]) {
      return styles.input;
    }
    return {
      ...styles.input,
      backgroundColor: errors[fieldName] ? "#FEE2E2" : "#D1FAE5",
    };
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={getInputStyle("firstName")}
        placeholder="First Name..."
        placeholderTextColor="#6B7280"
        value={formData.firstName}
        onChangeText={(value) => handleChange("firstName", value)}
        onBlur={() => handleBlur("firstName")}
      />

      <TextInput
        style={getInputStyle("lastName")}
        placeholder="Last Name..."
        placeholderTextColor="#6B7280"
        value={formData.lastName}
        onChangeText={(value) => handleChange("lastName", value)}
        onBlur={() => handleBlur("lastName")}
      />

      <TextInput
        style={getInputStyle("gender")}
        placeholder="Gender"
        placeholderTextColor="#6B7280"
        value={formData.gender}
        onChangeText={(value) => handleChange("gender", value)}
        onBlur={() => handleBlur("gender")}
      />

      <CustomDatePicker
        value={formData.dateOfBirth}
        onDateChange={(date) => handleChange("dateOfBirth", date)}
        containerStyle={getInputStyle("dateOfBirth")}
      />

      <TextInput
        style={getInputStyle("country")}
        placeholder="Current Country"
        placeholderTextColor="#6B7280"
        value={formData.country}
        onChangeText={(value) => handleChange("country", value)}
        onBlur={() => handleBlur("country")}
      />

      <TextInput
        style={getInputStyle("zipCode")}
        placeholder="Zip Code..."
        placeholderTextColor="#6B7280"
        keyboardType="numeric"
        value={formData.zipCode}
        onChangeText={(value) => handleChange("zipCode", value)}
        onBlur={() => handleBlur("zipCode")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: "#FFF",
  }
});