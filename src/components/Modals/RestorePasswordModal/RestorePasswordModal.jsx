import React, { useRef, useEffect, useState } from "react";
import styles from './RestorePasswordModal.module.css';
import CloseButton from "../../UI/CloseButton/CloseButton";
import FormPair from "../../FormPair/FormPair";
import RegularButton from "../../UI/RegularButton/RegularButton";
import BigInput from "../../UI/BigInput/BigInput";
import { sendRecoveryCode, verifyRecoveryCode, resetPassword } from "../../../features/features";

const RestorePasswordModal = ({ passwordRecoveryModalVisible, setPasswordRecoveryModalVisible, setInfoModalVisible, setInfoTitle, setInfoText }) => {
    const modalRef = useRef(null);

    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [currentStep, setCurrentStep] = useState(1);
    const [verificationError, setVerificationError] = useState('');

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setPasswordRecoveryModalVisible(false);
        }
    };

    const handleSendRecoveryCode = async () => {
        const sent = await sendRecoveryCode(email);
        if (sent) {
            setCurrentStep(2); // Переход к шагу ввода кода
        } else {
            // Обработка ошибки отправки кода
        }
    };

    const handleVerifyRecoveryCode = async () => {
        const verified = await verifyRecoveryCode(email, verificationCode);
        if (verified) {
            setCurrentStep(3); // Переход к шагу смены пароля
        } else {
            setVerificationError('Введён неверный код');
        }
    };

    const handleResetPassword = async () => {
        if (newPassword === confirmNewPassword && newPassword !== '') {
            const reset = await resetPassword(email, newPassword, verificationCode);
            if (reset) {
                setPasswordRecoveryModalVisible(false);
                setInfoTitle('Поздравляем!');
                setInfoText('Ваш пароль успешно обновлен.');
                setInfoModalVisible(true);
            } else {
                setVerificationError('Ошибка смены пароля');
            }
        } else {
            setVerificationError('Пароли не совпадают');
        }
    };

    return (
        <>
            {passwordRecoveryModalVisible && <div className={styles.modalBackground}></div>}
            <div
                className={styles.modalWrapper}
                style={{ ...(passwordRecoveryModalVisible ? { display: "flex" } : { display: "none" }) }}
                ref={modalRef}
            >
                <div className={styles.whiteBlock}>
                    <div className={styles.closeBtnRow}>
                        <CloseButton
                            event={() => setPasswordRecoveryModalVisible(false)}
                            img={'./svg/x_blue.svg'}
                        />
                    </div>
                    {currentStep === 1 && (
                        <div className={styles.formBlock}>
                            <span className={styles.title}>Восстановление пароля</span>
                            <FormPair label={'Введите вашу почту'} type={'email'} event={(e) => setEmail(e.target.value)} value={email} element={'input'} />
                            <RegularButton text={'Отправить код'} type={'grey'} event={handleSendRecoveryCode} />
                        </div>
                    )}
                    {currentStep === 2 && (
                        <div className={styles.formBlock}>
                            <span className={styles.title}>Введите код</span>
                            <span className={styles.subtitle}>На указанную Вами почту отправлен код подтверждения. Введите его в поле ниже</span>
                            <BigInput type={'text'} event={(e) => setVerificationCode(e.target.value)} value={verificationCode} error={verificationError} />
                            <div style={{marginBottom: '10px'}}></div>
                            <RegularButton text={'Подтвердить код'} type={'grey'} event={handleVerifyRecoveryCode} />
                        </div>
                    )}
                    {currentStep === 3 && (
                        <div className={styles.formBlock}>
                            <span className={styles.title}>Смена пароля</span>
                            <FormPair label={'Новый пароль'} type={'password'} event={(e) => setNewPassword(e.target.value)} value={newPassword} element={'input'} />
                            <FormPair label={'Подтвердите новый пароль'} type={'password'} event={(e) => setConfirmNewPassword(e.target.value)} value={confirmNewPassword} element={'input'} />
                            <RegularButton text={'Сменить пароль'} type={'grey'} event={handleResetPassword} />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default RestorePasswordModal;