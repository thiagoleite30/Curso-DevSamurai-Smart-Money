/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet} from 'react-native';

import BalancePanel from '../../components/BalancePanel';
import EntrySummary from '../../components/EntrySummary';
import EntryList from '../../components/EntryList';

import Colors from '../../../styles/Colors';


const Main = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <BalancePanel onNewEntryPress={() => navigation.navigate('NewEntry')} />
      <EntrySummary onPressActionButton={() => navigation.navigate('Report')}/>
      <EntryList
        onEntryPress={(entry) => navigation.navigate('NewEntry', {
          entry: entry,//Passamos assim para quando chegar no NewEntry já esteja os campos preenchidos só esperando alguma alteração.
          isEdit: true,//Caso o NewEntry seja chamado aqui o isEdit vai assumir true e irá mostrar o botão adicionar como editar e o botão excluir
        })
        }
        onPressActionButton={() => navigation.navigate('Report')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

export default Main;
