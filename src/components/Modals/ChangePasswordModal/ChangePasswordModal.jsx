import React, { useRef, useEffect, useState } from "react";
import styles from './ChangePasswordModal.module.css';
import CloseButton from "../../UI/CloseButton/CloseButton";
import RegularButton from "../../UI/RegularButton/RegularButton";
import CabinetInput from "../../UI/CabinetInput/CabinetInput";
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

    const modalStyles = {
        ...(changePasswordModalVisible ? { display: "flex" } : { display: "none" }),
        '--width': !isVerificationSent ? '334px' : '424px',
        '--contentWidth': !isVerificationSent ? '286px' : '378px', 
    };

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
                style={modalStyles}
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
                                width={'378px'}
                                height={'30px'}
                                textSize={'20px'}
                            />
                        </div>
                    ) : (
                        <div className={styles.formBlock}>
                            <span className={styles.title}>
                                Смена пароля
                            </span>
                            <span className={styles.emailMessage}>
                                Старый пароль
                            </span>
                            <CabinetInput type={'password'} event={(e) => {setOldPassword(e.target.value)}} value={oldPassword} white={true} width={'286px'} height={'30px'} textSize={'16px'}/>
                            <div style={{marginBottom: '24px'}}></div>
                            <span className={styles.emailMessage}>
                                Новый пароль
                            </span>
                            <CabinetInput type={'password'} event={(e) => {setNewPassword(e.target.value)}} value={newPassword} white={true} width={'286px'} height={'30px'} textSize={'16px'} />
                            <div style={{marginBottom: '24px'}}></div>
                            <span className={styles.emailMessage}>
                                Подтвердите новый пароль
                            </span>
                            <CabinetInput type={'password'} event={(e) => {setRepeatPassword(e.target.value)}} value={repeatPassword} white={true} width={'286px'} height={'30px'} textSize={'16px'} />
                            <div style={{marginBottom: '24px'}}></div>
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
                                width={'166px'}
                                height={'28px'}
                            />
                        ) : (
                            <RegularButton 
                                text={'Сменить пароль'}
                                type={'grey'}
                                event={handleSendVerificationCode}
                                width={'166px'}
                                height={'28px'}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChangePasswordModal;