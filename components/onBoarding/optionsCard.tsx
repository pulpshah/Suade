import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
} from "react-native";

type Option = {
  id: string;
  label: string;
};

type OptionsCardProps = {
  options: Option[];
  maxSelections: number; // Maximum number of options user can select
  onConfirm: (selectedOptions: string[]) => void; // Callback when user confirms selection
};

export default function OptionsCard({
  options,
  maxSelections,
  onConfirm,
}: OptionsCardProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleOptionPress = (id: string) => {
    if (selectedOptions.includes(id)) {
      setSelectedOptions((prev) => prev.filter((option) => option !== id));
    } else if (selectedOptions.length < maxSelections) {
      setSelectedOptions((prev) => [...prev, id]);
    }
  };

  const isSelected = (id: string) => selectedOptions.includes(id);

  const getImageForOption = (id: string) => {
    const imageMapping: Record<string, any> = {
      a: require("@/assets/images/a.png"),
      b: require("@/assets/images/b.png"),
      c: require("@/assets/images/c.png"),
      d: require("@/assets/images/d.png"),
    };
    return imageMapping[id];
  };

  return (
    <View style={styles.container}>
      <Text style={styles.instructionText}>
        Which notifications are you most tempted to tap on first?
      </Text>
      {options.map((option) => (
        <TouchableOpacity
          key={option.id}
          onPress={() => handleOptionPress(option.id)}
          style={styles.optionContainer}
        >
          {isSelected(option.id) ? (
            <ImageBackground
              source={require("@/assets/images/Flow Shadow.png")}
              style={styles.optionSelected}
              imageStyle={styles.optionBackgroundImage}
            >
              <View style={styles.optionContent}>
                <Image
                  source={getImageForOption(option.id)}
                  style={styles.optionIcon}
                />
                <Text style={[styles.optionText, styles.optionTextSelected]}>
                  {option.label}
                </Text>
              </View>
            </ImageBackground>
          ) : (
            <View style={[styles.option]}>
              <View style={styles.optionContent}>
                <Image
                  source={getImageForOption(option.id)}
                  style={styles.optionIcon}
                />
                <Text style={styles.optionText}>{option.label}</Text>
              </View>
            </View>
          )}
        </TouchableOpacity>
      ))}
      {selectedOptions.length > 0 && (
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => onConfirm(selectedOptions)}
        >
          <Text style={styles.confirmButtonText}>
            Confirm ({selectedOptions.length}/{maxSelections})
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1a1a1a",
    padding: 16,
    borderRadius: 12,
    marginVertical: 16,
  },
  instructionText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  optionContainer: {
    marginVertical: 8,
    flexWrap: "wrap",
  },
  option: {
    backgroundColor: "#333",
    padding: 12,
    borderRadius: 8,
  },
  optionSelected: {
    padding: 12,
    borderRadius: 8,
    overflow: "hidden",
  },
  optionBackgroundImage: {
    resizeMode: "cover",
    borderRadius: 8,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionIcon: {
    width: 18,
    height: 18,
    marginRight: 18,
  },
  optionText: {
    color: "white",
    fontSize: 16,
    flexShrink: 1,
  },
  optionTextSelected: {
    fontWeight: "bold",
  },
  confirmButton: {
    marginTop: 16,
    backgroundColor: "#5a5aff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
