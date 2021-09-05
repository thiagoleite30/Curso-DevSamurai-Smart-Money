/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { TextInputMask } from 'react-native-masked-text';

import Colors from '../../../../styles/Colors';

const NewEntryInput = ({ value, onChangeValue }) => { //value será o state 'amount'
    const [debit, setDebit] = useState((value < 0) ? -1 : 1); //Se o value for menor que 0 o debit será -1 senão o debit será 1
    const [debitPrefix, setDebitPrefix] = useState((value < 0) ? '-' : '');

    const onChangeDebitCredit = () => {
        if (debit < 0) {
            setDebit(1);
            setDebitPrefix('');
        } else {
            setDebit(-1);
            setDebitPrefix('-');
        }

        onChangeValue(value * -1);//Chama a função onChangeValue que carrega o setAmount do NewEntry para alterar o valor de negativo para positivo ou o contrário
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.debitButton}
                onPress={onChangeDebitCredit}
            >

                <Text style={styles.debitButtonPrefix}>{debitPrefix}</Text>

                <Text style={styles.debitButtonText}>R$</Text>
            </TouchableOpacity>
            <TextInputMask
                style={styles.input}
                type={'money'}
                placeholder={'Valor'}
                options={{
                    precision: 2, //Max casas decimais depois da virgula
                    separator: ',', //Nacionalização com separador por virgula por defaut vem com '.'
                    delimiter: '.', //Delimitador de milhares 1000 sem o delimitador e 1.000 com o delimitador
                    unit: '', //Aqui eu poderia definir R$ ou $ ou outros
                    suffixUnit: '', //Caso queira colocar o unit depois do valor
                }}
                value={value}
                includeRawValueInChangeText={true} //para incluir o rawValue dentro do onChangeText
                onChangeText={(maskedValue, rawValue) => { //(maskedValue, rawValue) :: maskedValue 1.000,00 / rawValue 1000
                    onChangeValue(rawValue * debit);//o debit vai ser -1 ou 1 definido na função onChangeDebitCredit quando clicado no TouchableOpacity
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: Colors.asphalt,
        borderRadius: 15,
        marginHorizontal: 20,
        marginVertical: 10,
    },
    debitButton: {
        flexDirection: 'row',
        paddingVertical: 20,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    debitButtonPrefix: {
        fontSize: 28,
        color: Colors.white,
        minWidth: 8,//Da uma largura minima para o componente no layout, evita que o R$ se movimente quando clicar e remover o sinal de negativo
    },
    debitButtonText: {
        fontSize: 28,
        color: Colors.white,
        paddingLeft: 2,
    },
    input: {
        flex: 1,
        fontSize: 28,
        color: Colors.white,
        textAlign: 'right',
        paddingLeft: 0,
        paddingRight: 20,
    },
});

export default NewEntryInput;
