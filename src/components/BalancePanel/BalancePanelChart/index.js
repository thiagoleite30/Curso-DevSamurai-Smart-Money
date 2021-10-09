/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import { BarChart } from 'react-native-svg-charts';

const BalancePanelChart = () => {
  const date = [100, 80, 30, 120, 10, 35, 70];
  return (
    <View style={styles.container}>
      <BarChart style={styles.chart} data={date}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  chart: {
    height: 40,
  },
});

export default BalancePanelChart;
