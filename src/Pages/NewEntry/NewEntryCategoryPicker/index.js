/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, Modal, FlatList, StyleSheet } from 'react-native';

import { getDebitCategories, getCreditCategories } from '../../../services/Categories';

import Colors from '../../../../styles/Colors';

const NewEntryCategoryPicker = ({ debit, category, onChangeCategory }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [debitCategories, setDebitCategories] = useState([]);//State que vai guardar todos os items da coleção Categories. Inicia com um array vazio
    const [creditCategories, setCreditCategories] = useState([]);//State que vai guardar todos os items da coleção Categories. Inicia com um array vazio

    console.log(`NewEntryCategoryPicker :: O amount é ${debit ? 'negativo' : 'positivo'} então vamos carregar as categorias ${debit ? 'debito' : 'credito'}`);//PODE APAGAR
    //useEffect é um hook do react-native que será executado sempre ao final da renderização
    useEffect(() => {
        async function loadCategories() {
            setDebitCategories(await getDebitCategories());
            setCreditCategories(await getCreditCategories());
        }

        loadCategories();

        console.log('NewEntryCategoryPicker :: useEffect');
    }, []);

    const onCategoryPress = item => {
        onChangeCategory(item);
        onClosePress();
    };

    const onClosePress = () => {
        setModalVisible(false);
    };

    return (
        <View>
            <TouchableOpacity
                style={styles.pickerButton}
                onPress={() => {
                    setModalVisible(true);
                }}
            >
                <Text style={styles.pickerButtonText}>{category.name}</Text>
            </TouchableOpacity>
            {/*Aqui mostramos como utilizar o Modal*/}
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
            >
                <View style={styles.modal}>
                    <FlatList
                        data={debit ? debitCategories : creditCategories}//Aqui decide quais categorias carregar de acordo com o sinal do amount -/+
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.modalItem}
                                onPress={() => onCategoryPress(item)}>
                                <Text style={[styles.modalItemText, { color: item.color }]}>{item.name}</Text>
                            </TouchableOpacity>
                        )} />
                    {/*Este TouchableOpacity altera a propriedade setModalVisible para false para tirar o modal da frente (fechar o modal)*/}
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={onClosePress}>
                        <Text style={styles.closeButtonText}>Fechar</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    modalItem: {
        backgroundColor: Colors.asphalt,
        borderRadius: 15,
        marginVertical: 10,
        marginHorizontal: 20,
        padding: 20,
    },
    modalItemText: {
        fontSize: 22,
        textShadowColor: Colors.black,
        textShadowRadius: 2,
        color: Colors.white,
        textAlign: 'center',
    },
    closeButton: {
        alignSelf: 'center',
        backgroundColor: Colors.background,
        borderColor: Colors.green,
        borderWidth: 1,
        borderRadius: 15,
        marginVertical: 10,
        marginHorizontal: 20,
        paddingVertical: 3,
        paddingHorizontal: 5,
    },
    closeButtonText: {
        fontSize: 14,
        color: Colors.green,
        textAlign: 'center',
    },
    pickerButton: {
        backgroundColor: Colors.asphalt,
        borderRadius: 15,
        marginVertical: 10,
        marginHorizontal: 20,
        padding: 20,
    },
    pickerButtonText: {
        fontSize: 28,
        color: Colors.white,
        textAlign: 'center',
    },
});

export default NewEntryCategoryPicker;
