import React, { useRef, useEffect, useState } from "react";
import styles from './ChangePasswordModal.module.css';
import CloseButton from "../../UI/CloseButton/CloseButton";
import FormPair from "../../FormPair/FormPair";
import RegularButton from "../../UI/RegularButton/RegularButton";
import BigInput from "../../UI/BigInput/BigInput";
import { sendVerificationCode, changePassword } from "../../../features/features";

const ChangePasswordModal = ({email, changePasswordModalVisible, setChangePasswordModalVisible, setInfoModalVisible, setInfoTitle, setInfoText}) => {
    const modalRef = useRef(null);

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [isVerificationSent, setIsVerificationSent] = useState(false);
    const [verificationError, setVerificationError] = useState('');

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

    const handleSendVerificationCode = async () => {
        const token = localStorage.getItem('authToken');
        if (newPassword === repeatPassword && newPassword !== '') {
            const sent = await sendVerificationCode(token, 'Подтверждение смены пароля');
            if (sent) {
                setIsVerificationSent(true);
            } else {
                // Обработка ошибки отправки кода верификации
            }
        } else {
            // Обработка несовпадения паролей или пустых полей
        }
    };

    const handleChangePassword = async () => {
        const token = localStorage.getItem('authToken');
        if (verificationCode && oldPassword && newPassword === repeatPassword) {
            const passwordChanged = await changePassword(token, oldPassword, newPassword, verificationCode);
            if (passwordChanged) {
                setChangePasswordModalVisible(false);
                setInfoTitle('Поздравляем!');
                setInfoText('Ваш пароль успешно обновлен.');
                setInfoModalVisible(true);
            } else {
                setVerificationError('Введён неверный код или старый пароль неверен.');
            }
        } else {
            // Обработка пустого поля кода верификации или несовпадения паролей
        }
    };

    const formatEmail = (email) => {
        const [localPart, domain] = email.split('@');
        const hiddenPart = localPart.slice(1, -2).replace(/./g, '*');
        return `${localPart[0]}${hiddenPart}${localPart.slice(-2)}@${domain}`;
    };

    return (
        <>
            {changePasswordModalVisible && <div className={styles.modalBackground}></div>}
            <div
                className={styles.modalWrapper}
                style={{...(changePasswordModalVisible ? { display: "flex" } : { display: "none" })}}
                ref={modalRef}
            >
                <div className={styles.whiteBlock}>
                    <div className={styles.closeBtnRow}>
                        <CloseButton 
                            event={() => setChangePasswordModalVisible(false)}
                            img={'./svg/x_blue.svg'}
                        />
                    </div>
                    {isVerificationSent ? (
                        <div className={styles.formBlock}>
                            <span className={styles.title}>
                                Введите код
                            </span>
                            <span className={styles.emailMessage}>
                                Пожалуйста, введите код, который был отправлен на вашу почту <b>{formatEmail(email)}</b>
                            </span>
                            <BigInput 
                                type={'text'} 
                                event={(e) => setVerificationCode(e.target.value)} 
                                value={verificationCode} 
                                error={verificationError} 
                            />
                        </div>
                    ) : (
                        <div className={styles.formBlock}>
                            <span className={styles.title}>
                                Смена пароля
                            </span>
                            <FormPair label={'Старый пароль'} type={'password'} event={(e) => {setOldPassword(e.target.value)}} value={oldPassword} element={'input'}/>
                            <FormPair label={'Новый пароль'} type={'password'} event={(e) => {setNewPassword(e.target.value)}} value={newPassword} element={'input'} />
                            <FormPair label={'Подтвердите новый пароль'} type={'password'} event={(e) => {setRepeatPassword(e.target.value)}} value={repeatPassword} element={'input'} />
                        </div>
                    )}
                </div>
                <div className={styles.greyBlock}>
                    <div className={styles.buttonWrapper}>
                        {isVerificationSent ? (
                            <RegularButton 
                                text={'Готово'}
                                type={'grey'}
                                event={handleChangePassword}
                            />
                        ) : (
                            <RegularButton 
                                text={'Сменить пароль'}
                                type={'grey'}
                                event={handleSendVerificationCode}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChangePasswordModal;