/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Colors from '../../../../styles/Colors';

const Container = ({ title, children, actionLabelText, actionButtonText, onPressActionButton }) => {
    return (
        <View style={styles.container}>
            {title && (
                <Text style={styles.title}>{title}</Text>
            )}

            {children}

            {(actionLabelText || actionButtonText) && (
                <View style={styles.actionContainer}>

                    {actionLabelText && (
                        <Text style={styles.actionLabel}>{actionLabelText}</Text>
                    )}

                    {actionButtonText && (
                        <TouchableOpacity
                            style={styles.actionButton}
                            onPress={onPressActionButton}>
                            <Icon name="insert-chart" style={styles.actionButtonIcon} />
                            <Text style={styles.actionButtonText}>{actionButtonText}</Text>
                        </TouchableOpacity>
                    )}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.asphalt,
        borderRadius: 5,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.25)',
        margin: 5,
        padding: 8,
    },
    title: {
        fontSize: 12,
        color: Colors.white,
        marginBottom: 5,
    },
    actionContainer: {
        flexDirection: 'row',//Por padrão o react alinha em coluna, ficando um componente abaixo do outro, este comando alinha em linha, um do lado do outro
    },
    actionLabel: {
        flex: 1, //Faz o label ultimos 7 dias aumentar sua área em 100%, deixando apenas o espaço suficiente para o TouchableOpacity (actionButton)
        fontSize: 12,
        color: Colors.white,
    },
    actionButton: {
        flexDirection: 'row',
    },
    actionButtonIcon: {
        color: Colors.white,
        marginTop: 3,
        marginRight: 2,
    },
    actionButtonText: {
        fontSize: 12,
        color: Colors.white,
    },
});

export default Container;
