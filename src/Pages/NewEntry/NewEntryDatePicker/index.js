/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

import DateTimePicker from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Colors from '../../../../styles/Colors';

const NewEntryDatePicker = ({value, onChange}) => {
    const [modalVisible, setModalVisible] = useState(false);

    const onChangeValue = date => {
        onChange(date);
        console.log('NewEntry :: NewEntryDatePicker :: Date ',date);//APAGAR DEPOIS
        onCancel();
    };

    const onCancel = () => {
        setModalVisible(false);
    };

    return (
        <View>
            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
                <Icon name="today" size={30} color={Colors.white} />
            </TouchableOpacity>

            <DateTimePicker
                mode="date"
                datePickerModeAndroid="calendar"
                titleIOS="Data de vencimento"
                cancelTextIOS="Cancelar"
                confirmTextIOS="Ok"
                date={value}
                isVisible={modalVisible}
                onConfirm={onChangeValue}
                onCancel={onCancel}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.asphalt,
        width: 59,
        height: 59,
        borderRadius: 150, //Deixa a area do button arredondada
        alignItems: 'center',//Duas linhas alinham o icone no centro da area do button
        justifyContent: 'center',
    },
});

export default NewEntryDatePicker;
