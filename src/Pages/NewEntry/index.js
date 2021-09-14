/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';

import BalanceLabel from '../../components/BalanceLabel';
import NewEntryInput from './NewEntryInput';
import NewEntryCategoryPicker from './NewEntryCategoryPicker';

import { saveEntry, deleteEntry } from '../../services/Entries';

import Colors from '../../../styles/Colors';

const NewEntry = ({ navigation }) => {
    console.log('NewEntry :: Bem-vindo ao NewEntry!!');//PODE APAGAR
    const entry = navigation.getParam('entry', {
        id: null,//Caso o parâmetro recebido, entry neste caso, seja nulo, aqui passamos os valores que o entry receberá por default
        amount: '',//No original ele passa o 0 como int mesmo
        entryAt: new Date(),
        category: {id: null, name: 'Selecione'},
    });//Método do navigation que recupera o parâmetro passado.
    const isEdit = navigation.getParam('isEdit', false);

    const [debit, setDebit] = useState(entry.amount <= 0);
    const [amount, setAmount] = useState(entry.amount);
    const [category, setCategory] = useState(entry.category);

    //IF para debugar quando clicar no item listado para editar
    if (isEdit) {
        console.log('Entrou no NewEntry', JSON.stringify(entry));
    }

    const isValid = () => {
        if (parseFloat(amount) !== 0) {
            return true;
        } else {
            return false;
        }
    };

    const onSave = () => {
        const data = {
            amount: parseFloat(amount), //parseFloat ta transformando a string que vem do useState em número Float
            category: category,
        };
        console.log('NewEntry :: save', data);
        saveEntry(data, entry);//caso o usuário não digite nenhum valor, será enviado também um array opcional o entry
        onClose();
    };

    const onDelete = () => {
        deleteEntry(entry);
        onClose();
    };

    const onClose = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <BalanceLabel />

            <View>
                <NewEntryInput
                    value={amount}
                    onChangeDebit={setDebit}
                    onChangeValue={setAmount}
                />
                <NewEntryCategoryPicker debit={debit} category={category} onChangeCategory={setCategory}/>
                <Button title="GPS" />
                <Button title="Câmera" />
            </View>

            <View>
                <Button
                    title={isEdit ? 'Editar' : 'Adicionar'}
                    onPress={() => {
                        isValid() && onSave();
                    }}
                />
                {isEdit && (
                    <Button
                        title={'Excluir'}
                        //disabled={!isEdit ? true : false} Solução substituída pelo if que abraça esse componente Button
                        onPress={onDelete}
                    />
                )}
                <Button
                    title="Cancelar"
                    onPress={onClose}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: 10,
    },
    input: {
        borderColor: '#000',
        borderWidth: 1,
    },
});

export default NewEntry;
