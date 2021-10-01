/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Modal, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';

import ActionFooter, { ActionPrimaryButton } from '../Core/ActionFooter';

import useCategories from '../../hooks/useCategories';

import Colors from '../../../styles/Colors';

const CategoryModal = ({ categoryType, isVisible, onConfirm, onCancel }) => {
    const [debitCategories, creditCategories, allCategories] = useCategories();

    return (
        <View>
            {/*Aqui mostramos como utilizar o Modal*/}
            <Modal
                animationType="slide"
                transparent={false}
                visible={isVisible}
            >
                <View style={styles.modal}>
                    <FlatList
                        data={categoryType === 'all' ? allCategories : (categoryType === 'debit') ? debitCategories : creditCategories}//If e Else aninhado para saber quais categorias pegar de acordo com a seleção
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.modalItem}
                                onPress={() => onConfirm(item)}>
                                <Text style={[styles.modalItemText, { color: item.color }]}>{item.name}</Text>
                            </TouchableOpacity>
                        )} />
                    {/*Este TouchableOpacity altera a propriedade setModalVisible para false para tirar o modal da frente (fechar o modal)*/}

                    <ActionFooter>
                        <ActionPrimaryButton title="Fechar" onPress={onCancel} />
                    </ActionFooter>
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
});

export default CategoryModal;
