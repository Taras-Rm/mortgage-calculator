import React, { useState, useEffect, useCallback } from 'react'
import BanksList from '../components/BanksList';
import CreateForm from '../components/CreateForm';
import Loader from '../components/UI/Loader';
import MyModal from '../components/UI/MyModal';
import { useHttp } from '../hooks/http.hook';
import { useMessasge } from '../hooks/message.hook';

const BanksPage = () => {

    // модальне вікно реєстрації
    const [modal, setModal] = useState(false);
    // дані форми додавання банку
    const [form, setForm] = useState({
        name: "", interestRate: "", maxLoan: "", minDownPay: "", loanTerm: ""
    });

     // зміни в інпутах форми реєстрації
     const changeHandler = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    // модальне вікно оновлення
    const [modalUpd, setModalUpd] = useState(false);
    // дані форми оновлення банку
    const [formUpd, setFormUpd] = useState({});
     // зміни в інпутах форми оновлення
     const changeHandlerUpd = (e) => {
        setFormUpd({ ...formUpd, [e.target.name]: e.target.value });
    }

    const [banks, setBanks] = useState([]);

    // хук для запитів на сервер
    const { loading, request, error, clearError } = useHttp();
    // хук для показу помилок
    const msg = useMessasge();
    // відслідковування помилок
    useEffect(() => {
        msg(error);
        clearError();
    }, [error, msg, clearError])

    // дістати список банків з сервера
    const getBanks = useCallback( async () => {
        const data = await request('/api/banks', 'GET', null);
        setBanks(data);
    }, [])


    useEffect( async () => {
        getBanks();
    }, [])

    // створити новий банк
    const createHandler = useCallback(async () => {
        try {
            const data = await request('/api/banks/create', 'POST', {...form} );
            msg(data.message)

            getBanks();
        } catch (e) {
            console.log(e);
        }
        setModal(false);
    }, [form]);

    // видалити існуючий банк
    const deleteHandler = useCallback(async (id) => {
        try {
            const data = await request(`/api/banks/delete/${id}`, 'DELETE', null);
            msg(`Bank ${data.name} was deleted`);
            getBanks();
        } catch (e) {
            console.log(e);
        }
    }, []);

    // оновити існуючий банк
    const updateHandler = useCallback(async () => {
        try {
            const data = await request(`/api/banks/update`, 'PUT', {...formUpd});
            msg(data.message)
            
            getBanks();
        } catch (e) {
            console.log(e);
        }
        setModalUpd(false);
    }, [formUpd]);


    return (
        <div className="banksPage">
            <a onClick={() => setModal(true)} className="waves-effect waves-light btn-large"><i className="material-icons left">attach_money</i>Create New Bank</a>
            {/* modal for create */}
            <MyModal visible={modal} setVisible={setModal}>
                <CreateForm setVisible={setModal} changeHandler={changeHandler} formData={form} handler={createHandler} loading={loading}/>
            </MyModal>

            {/* modal for update */}
            <MyModal visible={modalUpd} setVisible={setModalUpd}>
                <CreateForm setVisible={setModalUpd} changeHandler={changeHandlerUpd} handler={updateHandler} formData={formUpd} edit={true}/>
            </MyModal>
            {
                loading ?
                    <Loader />
                :
                    <BanksList setModalUpd={setModalUpd} setFormUpd={setFormUpd} deleteHandler={deleteHandler} banksList={banks}/>
            }
        </div>
    )
}

export default BanksPage;