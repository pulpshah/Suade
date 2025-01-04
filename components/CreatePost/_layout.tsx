// _layouts.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#181818",
  },
  content: {
    flex: 1,
    paddingTop: 10,
  },
});
