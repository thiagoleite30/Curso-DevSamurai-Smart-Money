/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React from 'react';
import {View, Picker, Button, StyleSheet} from 'react-native';

import BalanceLabel from '../../components/BalanceLabel';
import EntrySummary from '../../components/EntrySummary';
import EntryList from '../../components/EntryList';

const Report = () => {
  const currentBalance = 2064.35;

  const entriesGrouped = [
    { key: '1',description: 'Alimentação', amount: 200 },
    { key: '2',description: 'Combustível', amount: 12 },
    { key: '3',description: 'Aluguel', amount: 120 },
    { key: '4',description: 'Lazer', amount: 250 },
    { key: '5',description: 'Outros', amount: 1200 },
  ];

  const entries = [
    {key: '1',description: 'Padaria Asa Branca', amount: 10},
    {key: '2',description:  'Supermercado Benja', amount: 190},
    {key: '3',description:  'Posto Ipiranga', amount: 291},
  ];
  return (
    <View>
      <BalanceLabel currentBalance={currentBalance} />
      <View>
          <Picker>
              <Picker.Item label="Todas as categorias" />
          </Picker>
          <Picker>
              <Picker.Item label="Últimos 7 dias" />
          </Picker>
      </View>
      <EntrySummary entriesGrouped={entriesGrouped}/>
      <EntryList entries={entries}/>
      <View>
          <Button title="Salvar"/>
          <Button title="Fechar"/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        //flex: 1,
    },
});

export default Report;
