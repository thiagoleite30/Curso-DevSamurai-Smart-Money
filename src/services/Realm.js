/* eslint-disable prettier/prettier */
import Realm from 'realm';

import CategorySchema from '../schemas/CategorySchema';
import EntrySchema from '../schemas/EntrySchema';

import { getDefaultCategories } from './Categories';

export const getRealm = async () => {
    const realm = await Realm.open({ //Inicializa o banco de dados RealmDB. O await burla a assincrocidade da função async.
        schema: [CategorySchema, EntrySchema],
        schemaVersion: 2,
    });

    //dropDB(realm);
    initDB(realm);//Como o método getRealm é sempre chamado, colocamos a função que verifica se as categoras forma preenchidas

    return realm; //retorna o banco inicializado
};

export const initDB = (realm) => {
    //Método consulta a quantidade de categorias existentes no DB
    //se = 0
    //Preenche as categorais
    //Senão, não faço nada

    const categoriesLength = realm.objects('Category').length;
    console.log(`initDB :: categories length: ${categoriesLength}`);//Debbug da quantidade de categorias

    if (categoriesLength === 0) {
        const categories = getDefaultCategories();

        console.log('initDB :: initing db...');
        try {
            realm.write(() => {
                categories.forEach(category => {
                    console.log(`initDB :: creating category: ${JSON.stringify(category)}`);
                    realm.create('Category', category, true);
                });
            });

        } catch (error) {
            console.error(
                'initDB :: error on save category: ',
            );
        }
    } else {
        console.log('initDB :: categories already existing... Skypping.');
    }
};

export const dropDB = realm => {
    console.log('dropDB :: dropping DB...');
    realm.write(() => {
        realm.deleteAll();
    });
};
