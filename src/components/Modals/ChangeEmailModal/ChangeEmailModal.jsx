import React, { useRef, useEffect, useState } from "react";
import styles from './ChangeEmailModal.module.css';
import CloseButton from "../../UI/CloseButton/CloseButton";
import RegularButton from "../../UI/RegularButton/RegularButton";
import { sendVerificationCode, changeEmail } from "../../../features/features";
import BigInput from "../../UI/BigInput/BigInput";
import CabinetInput from "../../UI/CabinetInput/CabinetInput";

const ChangeEmailModal = ({email, changeEmailModalVisible, setChangeEmailModalVisible, setInfoModalVisible, setInfoTitle, setInfoText}) => {
    const modalRef = useRef(null);

    const [newEmail, setNewEmail] = useState('')
    const [verificationCode, setVerificationCode] = useState('');
    const [isVerificationSent, setIsVerificationSent] = useState(false);
    const [verificationError, setVerificationError] = useState('');

    const modalStyles = {
        ...(changeEmailModalVisible ? { display: "flex" } : { display: "none" }),
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
            setChangeEmailModalVisible(false);
        }
    };

    const handleSendVerificationCode = async () => {
        const token = localStorage.getItem('authToken');
        if (newEmail) {
            const sent = await sendVerificationCode(token, 'Подтверждение смены почты');
            if (sent) {
                setIsVerificationSent(true);
            }
        }
    };

    const handleChangeEmail = async () => {
        const token = localStorage.getItem('authToken');
        if (verificationCode && newEmail) {
            const emailChanged = await changeEmail(token, newEmail, verificationCode);
            if (emailChanged) {
                setChangeEmailModalVisible(false);
                setInfoTitle('Поздравляем!');
                setInfoText('Ваша почта успешно обновлена.');
                setInfoModalVisible(true);
            } else {
                setVerificationError('Введён неверный код');
            }
        } else {
            // Обработка случая, когда код или новая почта не введены
            // Здесь также можно установить сообщение об ошибке
        }
    };

    const formatEmail = (email) => {
        const [localPart, domain] = email.split('@');
        const hiddenPart = localPart.slice(1, -2).replace(/./g, '*');
        return `${localPart[0]}${hiddenPart}${localPart.slice(-2)}@${domain}`;
    };

    const handleChangeVerificationCode = (e) => {
        setVerificationCode(e.target.value);
        if (verificationError) {
            setVerificationError('');
        }
    }

    return (
        <>
            {changeEmailModalVisible && <div className={styles.modalBackground}></div>}
            <div
                className={styles.modalWrapper}
                style={modalStyles}
                ref={modalRef}
            >
                <div className={styles.whiteBlock}>
                    <div className={styles.closeBtnRow}>
                        <CloseButton 
                            event={() => setChangeEmailModalVisible(false)}
                            img={'./svg/x_blue.svg'}
                        />
                    </div>
                    {isVerificationSent ? (
                        <div className={styles.formBlock}>
                            <span className={styles.title}>
                                Введите код
                            </span>
                            <span className={styles.emailMessage}>
                                Пожалуйста, введите код, который был отправлен на вашу предыдущую почту <b>{formatEmail(email)}</b>
                            </span>
                            <BigInput 
                                type={'text'} 
                                event={handleChangeVerificationCode} 
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
                                Смена почты
                            </span>
                            <span className={styles.emailMessage}>
                                Введите новую почту
                            </span>
                            <CabinetInput type={'email'} event={(e) => setNewEmail(e.target.value)} value={newEmail} white={true} width={'286px'} height={'30px'} textSize={'16px'}/>
                        </div>
                    )}
                </div>
                <div className={styles.greyBlock}>
                    <div className={styles.buttonWrapper}>
                        {isVerificationSent ? (
                            <RegularButton 
                                text={'Готово'}
                                type={'grey'}
                                event={handleChangeEmail}
                                width={'166px'}
                                height={'28px'}
                            />
                        ) : (
                            <RegularButton 
                                text={'Сменить почту'}
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
    )
}

export default ChangeEmailModal;