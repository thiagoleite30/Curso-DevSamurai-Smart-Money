/* eslint-disable prettier/prettier */
import {useEffect, useState} from 'react';

import {getBalance} from '../services/Balance';

//Criando hook personalisado para somar nosso saldo
const useBalance = () => {
    const [balance, setBalance] = useState();

    useEffect(() => {
        async function loadBalance() {
            const value = await getBalance();
            setBalance(value);
        }

        loadBalance();
    }, []);

    return [balance]; //Este hook só retorna o balance
    //Não retornamos a função setBalance por questão de lógica, o usuário não pode setar o saldo kkk
};

export default useBalance;
