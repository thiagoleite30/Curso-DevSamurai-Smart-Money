/* eslint-disable prettier/prettier */
import { Alert } from 'react-native';

import { getRealm } from './Realm';
import { getUUID } from './UUID';


export const getEntries = async () =>{ //Método de consultas no Realm DB
    const realm = await getRealm();//Objeto realm é responsável pela conexão com o BD

    const entries = realm.objects('Entry');//Consulta de entradas (todos os objetos da schema entry)

    console.log('getEntries :: entries ', JSON.stringify(entries));

    return entries;
};

export const saveEntry = async (value, entry = {}) => { //Insert do do Realm DB também é UPDATE caso o ID passado já exista
    const realm = await getRealm();
    let data = {};

    console.log('Entries -> saveEntry :: entries ', JSON.stringify(value));

    try {
        realm.write(() => { //função que escreve um array data com as condições abaixo:
            data = {
                id: value.id || entry.id || getUUID(),
                amount: value.amount || entry.amount,
                description: value.description || entry.description, //CRIADO POR MIM PODE APAGAR
                entryAt: value.entryAt || entry.entryAt,
                isInit: false,
                category: value.category || entry.category,
            };
            //console.log('Entries -> saveEntry :: Dentro do try / Depois que o data é montado ', data);

            realm.create('Entry', data, true);
        });

        console.log(
            'saveEntry :: data: ',
            JSON.stringify(data)
        );
    } catch (error) {
        console.error(
            'saveEntry :: error on save object: ',
            JSON.stringify(data),
        );
        Alert.alert('Erro ao salvar os dados de lançamento.');
    }

    return data;
};


export const deleteEntry = async (entry) => {
    const realm = await getRealm();

    try {
        realm.write(() => {
            realm.delete(entry);
        });
    } catch (error) {
        console.error(
            'saveEntry :: error on save object: ',
            JSON.stringify(entry),
        );
        Alert.alert('Erro ao salvar os dados de lançamento.');
    }

};
