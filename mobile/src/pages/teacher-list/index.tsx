import React from "react";
import { View } from "react-native";

import PageHeader from "../../components/page-header";
import styles from "./styles";

export default function TeacherList() {
  return (
    <View style={styles.container}>
      <PageHeader title="Proffys disponíveis" />
    </View>
  );
}
