import React, { useRef, useEffect, useState } from "react";
import styles from './SupportModal.module.css';
import CloseButton from "../../UI/CloseButton/CloseButton";
import FormPair from "../../FormPair/FormPair";
import RegularButton from "../../UI/RegularButton/RegularButton";

const SupportModal = ({supportModalVisible, setSupportModalVisible, alerts, setAlerts}) => {
    const modalRef = useRef(null);

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setSupportModalVisible(false);
        }
    };

    const handleSend = () => {
        if (!name) {

            return
        }
        if (!email) {

            return
        }
        if (!message) {

            return
        }

        setSupportModalVisible(false)
        showAlert('Ваш отзыв успешно отправлен)', 'accepted')
    }

    return (
        <>
            {supportModalVisible && <div className={styles.modalBackground}></div>}
            <div
                className={styles.modalWrapper}
                style={
                    {
                    ...(supportModalVisible ? { display: "flex" } : { display: "none" }),
                    }
                }
                ref={modalRef}
            >
                <div className={styles.whiteBlock}>
                    <div className={styles.closeBtnRow}>
                        <CloseButton 
                            event={() => {
                                setSupportModalVisible(false)
                            }}
                            img={'./svg/close.svg'}
                        />
                    </div>
                    <div className={styles.formBlock}>
                        <span className={styles.title}>
                            Обратная связь
                        </span>
                        <FormPair label={'Имя'} type={'text'} event={(e) => {setName(e.target.value)}} value={name} element={'input'}/>
                        <FormPair label={'E-mail'} type={'text'} event={(e) => {setEmail(e.target.value)}} value={email} element={'input'} />
                        <FormPair label={'Сообщение'} type={'text'} event={(e) => {setMessage(e.target.value)}} value={message} element={'textarea'} />
                    </div>
                </div>
                <div className={styles.greyBlock}>
                    <div className={styles.buttonWrapper}>
                        <RegularButton 
                            text={'Отправить'}
                            type={'grey'}
                                event={() => {
                                handleSend()
                            }}
                        />  
                    </div>
                </div>
            </div>
        </>
    )
}

export default SupportModal