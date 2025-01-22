import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AGrayIcon from "@/assets/icons/a-gray.svg";
import AColoredIcon from "@/assets/icons/a-colored.svg";
import BGrayIcon from "@/assets/icons/b-gray.svg";
import BColoredIcon from "@/assets/icons/b-colored.svg";
import CGrayIcon from "@/assets/icons/c-gray.svg";
import CColoredIcon from "@/assets/icons/c-colored.svg";
import DGrayIcon from "@/assets/icons/d-gray.svg";
import DColoredIcon from "@/assets/icons/d-colored.svg";
import { COLORS, TEXT_STYLES } from "@/app/styles";
import PrimaryLargeButton from "../Buttons/PrimaryLargeButton";

type Option = {
  id: string;
  label: string;
};

type OptionsCardProps = {
  options: Option[];
  maxSelections: number;
  onConfirm: (selectedOptions: string[]) => void;
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
    } else {
      if (maxSelections === 1) {
        setSelectedOptions([id]);
      } else if (selectedOptions.length < maxSelections) {
        setSelectedOptions((prev) => [...prev, id]);
      }
    }
  };

  const isSelected = (id: string) => selectedOptions.includes(id);

  const getIconForOption = (id: string, selected: boolean) => {
    const iconMapping: Record<string, { gray: React.ReactNode; colored: React.ReactNode }> = {
      a: { gray: <AGrayIcon />, colored: <AColoredIcon /> },
      b: { gray: <BGrayIcon />, colored: <BColoredIcon /> },
      c: { gray: <CGrayIcon />, colored: <CColoredIcon /> },
      d: { gray: <DGrayIcon />, colored: <DColoredIcon /> },
    };
    return selected ? iconMapping[id].colored : iconMapping[id].gray;
  };

  const handleConfirm = () => {
    const selectedLabels = selectedOptions.map(
      (id) => options.find((option) => option.id === id)?.label || ""
    );
    onConfirm(selectedLabels); // Pass the labels instead of IDs
  };

  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.id}
          onPress={() => handleOptionPress(option.id)}
          style={[
            styles.optionContainer,
            isSelected(option.id) && styles.optionContainerSelected,
          ]}
        >
          <View style={styles.optionInnerContainer}>
            <View style={styles.option}>
              {getIconForOption(option.id, isSelected(option.id))}
              <Text style={styles.optionText}>{option.label}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
      {selectedOptions.length > 0 && (
        <PrimaryLargeButton
          buttonText={`Confirm ${selectedOptions.length}/${maxSelections}`}
          onPress={handleConfirm}
          disabled={selectedOptions.length === 0}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
    flexDirection: "column",
  },
  optionContainer: {
    borderRadius: 14,
    borderWidth: 0.5,
    borderColor: COLORS.suadeShadesCardOutline,
    backgroundColor: "transparent",
    padding: 2,
    gap: 10,
    overflow: "hidden",
  },
  optionContainerSelected: {
    shadowColor: "yellow",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 16,
    elevation: 12,
  },
  optionInnerContainer: {
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 24,
    gap: 12,
    backgroundColor: COLORS.black75,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  optionText: {
    ...TEXT_STYLES.questionOptionsText,
    color: "white",
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