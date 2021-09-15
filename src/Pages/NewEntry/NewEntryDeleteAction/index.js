/* eslint-disable prettier/prettier */
import React from 'react';
import {Alert, View, TouchableOpacity, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Colors from '../../../../styles/Colors';

const NewEntryDeleteAction = ({onOkPress}) => {
    const onDelete = () => {
        Alert.alert(
            'Apagar?',
            'Você deseja realmente apagar este lançamento?',
            [
                {text: 'Não', style: 'cancel'},
                {text: 'Sim', onPress: () => onOkPress()},
            ],
            {cancelable: false},
        );
    };

    return (
        <View>
            <TouchableOpacity style={styles.button} onPress={onDelete}>
                <Icon name="delete" size={30} color={Colors.white} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.red,
        width: 59,
        height: 59,
        borderRadius: 150, //Deixa a area do button arredondada
        alignItems: 'center',//Duas linhas alinham o icone no centro da area do button
        justifyContent: 'center',
        margin: 2,
    },
});

export default NewEntryDeleteAction;
