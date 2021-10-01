/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';


import ActionFooter, { ActionPrimaryButton, ActionSecondaryButton } from '../../components/Core/ActionFooter';


import BalanceLabel from '../../components/BalanceLabel';
import NewEntryInput from './NewEntryInput';
import NewEntryCategoryPicker from './NewEntryCategoryPicker';
import NewEntryDatePicker from './NewEntryDatePicker';
import NewEntryDeleteAction from './NewEntryDeleteAction';

import useEntries from '../../hooks/useEntries';

import Colors from '../../../styles/Colors';

const NewEntry = ({ navigation }) => {
    const entry = navigation.getParam('entry', {
        id: null,//Caso o parâmetro recebido, entry neste caso, seja nulo, aqui passamos os valores que o entry receberá por default
        amount: '',//No original ele passa o 0 como int mesmo
        entryAt: new Date(),
        category: { id: null, name: 'Selecione' },
    });//Método do navigation que recupera o parâmetro passado.
    const isEdit = navigation.getParam('isEdit', false);

    const [, saveEntry, deleteEntry] = useEntries(); //como o entries não é utilizado nós passamos uma coleção nula [ , saveEntry, deleteEntry] junto das funções

    const [debit, setDebit] = useState(entry.amount <= 0);
    const [amount, setAmount] = useState(entry.amount);
    const [category, setCategory] = useState(entry.category);
    const [entryAt, setEntryAt] = useState(entry.entryAt);

    //IF para debugar quando clicar no item listado para editar
    if (isEdit) {
        console.log('Entrou no NewEntry com possibilidade de Editar ou Excluir a entrada', JSON.stringify(entry.category));
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
            entryAt: entryAt,
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

            <View style={styles.formContainer}>
                <NewEntryInput
                    value={amount}
                    onChangeDebit={setDebit}
                    onChangeValue={setAmount}
                />
                <NewEntryCategoryPicker debit={debit} category={category} onChangeCategory={setCategory} />

                <View style={styles.formActionContainer}>
                    <NewEntryDatePicker value={entryAt} onChange={setEntryAt} />
                    {isEdit && (
                        <NewEntryDeleteAction onOkPress={onDelete} />
                    )}
                </View>
            </View>

            <ActionFooter>
                <ActionPrimaryButton
                    title={isEdit ? 'Salvar' : 'Adicionar'}
                    onPress={() => {
                        isValid() && onSave();
                    }}
                />
                <ActionSecondaryButton title="Cancelar" onPress={onClose} />
            </ActionFooter>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: 10,
    },
    formContainer: {
        flex: 1,
        paddingVertical: 20,
    },
    formActionContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10,
    },
});

export default NewEntry;
