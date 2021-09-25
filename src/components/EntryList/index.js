/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import {FlatList} from 'react-native';

import Container from '../Core/Container';

import EntryListItem from './EntryListItem';

import { getEntries } from '../../services/Entries';

const EntryList = ({days = 7, category, onEntryPress, onPressActionButton}) => {
  [entries, setEntries] = useState([]);//State que vai guardar todos os items da coleção. Inicia com um array vazio

  console.log('EntryList :: days passados para useEffect ',days);
  //useEffect é um hook do react-native que será executado sempre ao final da renderização
  useEffect(() => {
    async function loadEntries() { //Precisa criar essa função loadEntries do tipo async pois o getEntries() é do tipo async
      console.log('EntryList :: dentro do useEffect : days ',days);
      const data = await getEntries(days, category);
      setEntries(data);
    }

    loadEntries();

    console.log('EntryList :: useEffect ');
  }, [days, category]);//o [days,category] cria duas dependências que colocam condições extras para o useEffect executar novamente, quando days ou category mudar

  return (
    <Container
    title="Últimos lançamentos"
    actionLabelText={`Últimos ${days} dias`}
    actionButtonText="Ver mais"
    onPressActionButton={onPressActionButton}>
      <FlatList
        data ={entries}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => ( //atributor renderItem são os itens que serão renderizados no FlatList: neste caso uma view que abraça um text e um button
          <EntryListItem
          entry={item}
          isFirstItem={index === 0}//Verifica a posição do item a ser renderizado, passa como props o valor true se for o item(index identico a 0)
          isLastItem={index === entries.length - 1} //Verifica a posição do item a ser renderizado, passa como props o valor true se for o item(index identico ao ultimo item)
          onEntryPress={onEntryPress}
          />
        )}
      />
    </Container>
  );
};

export default EntryList;
