/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import React from 'react';
import { FlatList } from 'react-native';

import Container from '../Core/Container';

import EntryListItem from './EntryListItem';
import useEntries from '../../hooks/useEntries';

const EntryList = ({ days = 7, category, onEntryPress, onPressActionButton }) => {
  const [entries] = useEntries(days, category);//State que vai guardar todos os items da coleção. Inicia com um array vazio

  console.log('EntryList :: days passados para useEffect ', days);

  return (
    <Container
      title="Últimos lançamentos"
      actionLabelText={`Últimos ${days} dias`}
      actionButtonText="Ver mais"
      onPressActionButton={onPressActionButton}>
      <FlatList
        data={entries}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => ( //atributor renderItem são os itens que serão renderizados no FlatList: neste caso uma view que abraça um text e um button
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
