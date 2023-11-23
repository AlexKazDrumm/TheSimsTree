import React, { useRef, useEffect, useState } from "react";
import styles from './ChangePasswordModal.module.css';
import CloseButton from "../../UI/CloseButton/CloseButton";
import FormPair from "../../FormPair/FormPair";
import RegularButton from "../../UI/RegularButton/RegularButton";
import { changePassword } from "../../../features/features";

const ChangePasswordModal = ({changePasswordModalVisible, setChangePasswordModalVisible}) => {
    const modalRef = useRef(null);

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setChangePasswordModalVisible(false);
        }
    };

    const handleSend = async () => {
        const token = localStorage.getItem('authToken');

        if (!oldPassword || !newPassword || !repeatPassword) {
            // Handle empty fields
            return;
        }

        if (newPassword !== repeatPassword) {
            // Handle password mismatch
            return;
        }

        const passwordChanged = await changePassword(token, oldPassword, newPassword);
        if (passwordChanged) {
            // Handle successful password change
        } else {
            // Handle failed password change
        }

        setChangePasswordModalVisible(false);
    };

    return (
        <>
            {changePasswordModalVisible && <div className={styles.modalBackground}></div>}
            <div
                className={styles.modalWrapper}
                style={
                    {
                    ...(changePasswordModalVisible ? { display: "flex" } : { display: "none" }),
                    }
                }
                ref={modalRef}
            >
                <div className={styles.whiteBlock}>
                    <div className={styles.closeBtnRow}>
                        <CloseButton 
                            event={() => {
                                setChangePasswordModalVisible(false)
                            }}
                            img={'./svg/x_blue.svg'}
                        />
                    </div>
                    <div className={styles.formBlock}>
                        <span className={styles.title}>
                            Смена пароля
                        </span>
                        <FormPair label={'Старый пароль'} type={'password'} event={(e) => {setOldPassword(e.target.value)}} value={oldPassword} element={'input'}/>
                        <FormPair label={'Новый пароль'} type={'password'} event={(e) => {setNewPassword(e.target.value)}} value={newPassword} element={'input'} />
                        <FormPair label={'Подтвердите новый пароль'} type={'password'} event={(e) => {setRepeatPassword(e.target.value)}} value={repeatPassword} element={'input'} />
                    </div>
                </div>
                <div className={styles.greyBlock}>
                    <div className={styles.buttonWrapper}>
                        <RegularButton 
                            text={'Сменить пароль'}
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

export default ChangePasswordModal