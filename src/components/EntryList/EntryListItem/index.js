/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Svg, { Circle, Rect } from 'react-native-svg';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Colors from '../../../../styles/Colors';

//SVG
// Y = distancia do teto - 0 = teto / 50 = base
//Height = distancia da base - 0 = base / 50 = topo

const EntryListItem = ({ entry, isFirstItem, isLastItem, onEntryPress }) => {
  const bulletLineY = isFirstItem ? 25 : 0; //Verifica se é o primeiro item, se sim ele começa com a distancia do topo em 25, se não é 0
  const bulletLineHeight = isLastItem ? 25 : 50;
  const showBulletLine = !(isFirstItem && isLastItem);
  const bulletColor = entry.category.color || Colors.white;

  return (
    <TouchableOpacity
      onPress={() => {
        onEntryPress && onEntryPress(entry); //If para verificar se o onEntryPress é diferente de NULL (Aula 6 - Ajustando a tela principal (MAIN) list. Part 3)
      }}
    >
      <View style={styles.container}>
        <View style={styles.bullet}>
          <Svg height="50" width="30">
            {showBulletLine && (
              <Rect
                x="9"
                y={bulletLineY}
                width="1.5"
                height={bulletLineHeight}
                fill={Colors.background}
              />
            )}

            <Circle
              cx="10"
              cy="25"
              r={8}
              stroke={Colors.background} //Contorno da bolinha
              strokeWidth="1.5" //espessura da bolinha
              fill={bulletColor}
            />
          </Svg>
        </View>

        <View style={styles.description}>
          <Text style={styles.descriptionText}>{entry.description}</Text>

          <View style={styles.details}>
            <Icon style={styles.entryAtIcon} name="access-time" size={12} />
            <Text style={styles.entryAtText}>{entry.entryAt.toString()}</Text>

            {entry.address && ( //Quando o address estiver vazio a sua informação não será mostrada. Até porque o Address é opcional
              <>{/*Difrente das View um componente Icon e Text não podem ficar um adjacente do outro, por isso colocamos ele entre <> ... </> */}
                <Icon style={styles.addressIcon} name="person-pin" size={12} />
                <Text style={styles.addressText}>{entry.address}</Text>
              </>
            )}
          </View>
        </View>

        <View style={styles.amount}>
          <Text style={styles.amountText}>{entry.amount}</Text>
        </View>

      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  bullet: {
  },
  description: {
    flex: 1,//flex 1 faz a view da descrição tomar todo espaço pra ela, deixando só o que a bullet e amount precisam
    justifyContent: 'center',
  },
  descriptionText: {
    fontSize: 14,
    color: Colors.white,
  },
  details: {
    flexDirection: 'row',
  },
  entryAtIcon: {
    color: Colors.metal,
    marginTop: 2,
    marginRight: 2,
  },
  entryAtText: {
    fontSize: 12,
    color: Colors.metal,
  },
  addressIcon: {
    color: Colors.metal,
    marginTop: 2,
    marginRight: 2,
    marginLeft: 5,
  },
  addressText: {
    fontSize: 12,
    color: Colors.metal,
  },
  amount: {
    justifyContent: 'center',
  },
  amountText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.white,
  },
});

export default EntryListItem;
