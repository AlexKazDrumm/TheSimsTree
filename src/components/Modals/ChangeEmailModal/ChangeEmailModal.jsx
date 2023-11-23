import React, { useRef, useEffect, useState } from "react";
import styles from './ChangeEmailModal.module.css';
import CloseButton from "../../UI/CloseButton/CloseButton";
import FormPair from "../../FormPair/FormPair";
import RegularButton from "../../UI/RegularButton/RegularButton";
import { changeEmail } from "../../../features/features";

const ChangeEmailModal = ({changeEmailModalVisible, setChangeEmailModalVisible}) => {
    const modalRef = useRef(null);

    const [newEmail, setNewEmail] = useState('')

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setChangeEmailModalVisible(false);
        }
    };

    const handleSend = async () => {
        const token = localStorage.getItem('authToken');

        

        setChangeEmailModalVisible(false);
    };

    return (
        <>
            {changeEmailModalVisible && <div className={styles.modalBackground}></div>}
            <div
                className={styles.modalWrapper}
                style={
                    {
                    ...(changeEmailModalVisible ? { display: "flex" } : { display: "none" }),
                    }
                }
                ref={modalRef}
            >
                <div className={styles.whiteBlock}>
                    <div className={styles.closeBtnRow}>
                        <CloseButton 
                            event={() => {
                                setChangeEmailModalVisible(false)
                            }}
                            img={'./svg/x_blue.svg'}
                        />
                    </div>
                    <div className={styles.formBlock}>
                        <span className={styles.title}>
                            Смена почты
                        </span>
                        <FormPair label={'Введите новую почту'} type={'email'} event={(e) => {setNewEmail(e.target.value)}} value={newEmail} element={'input'}/>
                    </div>
                </div>
                <div className={styles.greyBlock}>
                    <div className={styles.buttonWrapper}>
                        <RegularButton 
                            text={'Сменить почту'}
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

export default ChangeEmailModal