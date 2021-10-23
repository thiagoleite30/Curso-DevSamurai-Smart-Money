/* eslint-disable prettier/prettier */
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

import BalancePanelLabel from './BalancePanelLabel';
import BalancePanelChart from './BalancePanelChart';

import useBalance from '../../hooks/useBalance';

import Colors from '../../../styles/Colors';

const BalancePanel = ({ onNewEntryPress }) => {
  const [balance] = useBalance();

  return (
    <View style={styles.container}>

      <LinearGradient
        colors={[Colors.violet, Colors.blue]}
        style={styles.panel}>
        <BalancePanelLabel currentBalance={balance} />
        <BalancePanelChart />
      </LinearGradient>

      <TouchableOpacity
        style={styles.button}
        onPress={onNewEntryPress}
      >
        <Icon name="add" size={30} color={Colors.white} />
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: -23,
  },
  panel: {
  },
  button: {
    backgroundColor: Colors.green,
    borderRadius: 150, //Arredonda nosso componente
    alignSelf: 'flex-end', //alignSelf alinha somente o item especifico
    alignItems: 'center', //alignItems alinha os itens filhos de um componente, neste caso o Text com valor de + NO EIXO HORIZONTAL
    justifyContent: 'center', //o justifyContent outro eixo do flex, o eixo VERTICAL
    width: 50, //Largura do componente
    height: 50, //Altura do componente
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.30,
    shadowRadius: 6.50,
    elevation: 5,
    marginTop: -25,//espaçamento externo de cima para colocar o button entre os dois componentes
    marginRight: 10,//espaçamento externo
  },
});

export default BalancePanel;
