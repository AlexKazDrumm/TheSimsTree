import React, { useState, useEffect } from "react";
import styles from './PlumTrees.module.css'
import TitleBlock from "../../../components/UI/TitleBlock/TitleBlock";
import BigInput from "../../../components/UI/BigInput/BigInput";
import RegularButton from "../../../components/UI/RegularButton/RegularButton";
import { updateUserData, verificateEmail } from "../../../features/features";
import axios from "axios";
import globals from "../../../globals";

const PlumTrees = ({user, setInfoModalVisible, setInfoImg, setInfoTitle, setInfoText}) => {

    const [inlineCode, setInlineCode] = useState('')
    const [approvedAccount, setApprovedAccount] = useState(user.is_verificated)

    const [errors, setErrors] = useState(false)
    const [error, serError] = useState('')

    const [timer, setTimer] = useState(0);
    const [canResend, setCanResend] = useState(true);

    const showAlert = (message, type) => {
        setErrors(true)
    }

    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer(t => t - 1);
            }, 1000);
        } else {
            setCanResend(true); // Включаем кнопку, когда таймер достигает 0
        }
        return () => clearInterval(interval);
    }, [timer]);

    const handleCheckCode = async (skip) => {
        if (!inlineCode) {
            // console.log('Введите код верификации!', 'error');
            return;
        }
        // console.log(user.login, inlineCode, skip);
        try {
            const response = await axios.post(`${globals.productionServerDomain}/verificateUser`, {
                login: user.login,
                code: inlineCode,
                skip: skip
            });
            // console.log({response});
            if (response.data && response.data.token) {
                // console.log('Успешная верификация!', 'accepted');  
                const token = response.data.token;
                try {
                    // Переносим вызов updateUserData в отдельный try-catch блок
                    await updateUserData(token, {login: user.login, name: user.name, surname: user.surname, is_verificated: true});
                    setApprovedAccount(true);
                    setInfoImg('./svg/congrats.svg');
                    setInfoTitle('Поздравляем!');
                    setInfoText('Вы успешно верифицировали почту на платформе The Dynasty Tree!!!');
                    setInfoModalVisible(true);
                } catch (updateError) {
                    // console.error('Ошибка при обновлении данных пользователя:', updateError);
                }
            } else {
                // console.log('Ответ от сервера не содержит токена', response.data);
            }
        } catch (error) {
            serError(error?.response?.data);
            showAlert(error.response?.data?.message || 'Неправильный код верификации!', 'error');
            // console.log('error', error);
        }
    };

    const handleResendCode = async () => {
        if (!canResend) return;

        const token = localStorage.getItem('authToken');
        if (!token) {
            console.log('Токен не найден. Пользователь не авторизован.');
            return;
        }

        setCanResend(false);
        setTimer(180); // 3 минуты = 180 секунд

        const result = await verificateEmail(token);
        if (result) {
            console.log('Код верификации успешно отправлен на вашу электронную почту.');
        } else {
            console.log('Произошла ошибка при отправке кода верификации.');
            setCanResend(true); // Разрешаем повторную отправку, если произошла ошибка
        }
    }

    return (
        <>
            <div className={styles.backgroundContainer}></div>
            <div className={styles.container}>
                <div className={!user.is_verificated ? styles.blurContainer : styles.notBlur}>
                    <div className={styles.marginWrapper}>
                        <TitleBlock text='Загрузить с PlumTree' />
                    </div>
                </div>
                {!approvedAccount &&
                    <div className={styles.zaglushka}>
                        <div className={styles.formBlock}>
                            <span className={styles.zTitle}>
                                Подтверждение почты
                            </span>
                            <div className={styles.span}>На Вашу почту было отправлено письмо с кодом, введите его здесь</div>
                            <BigInput type={'text'} event={(e) => {setInlineCode(e.target.value)}} value={inlineCode} textSize={'20px'} width={'350px'}/>
                            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', paddingTop: '10px', width: '370px', marginBottom: '15px'}}>
                                <span 
                                    className={`${styles.rememberPassword} ${!canResend ? styles.disabled : ''}`} 
                                    onClick={handleResendCode}
                                >
                                    Отправить код повторно
                                </span>
                                {timer > 0 && (
                                    <span className={styles.timer}>
                                        Повторная отправка через {timer} сек.
                                    </span>
                                )}
                            </div>
                            <div className={styles.buttonWrapper}>
                                <RegularButton 
                                    text={'Отправить'}
                                    type={'grey'}
                                    event={() => {
                                        handleCheckCode(false)
                                    }}
                                    width={'250px'} 
                                    height={'38px'}
                                    textSize={'16px'}
                                />  
                            </div>
                        </div>
                    </div>
                }
                
            </div>
        </>
    )
}

export default PlumTrees