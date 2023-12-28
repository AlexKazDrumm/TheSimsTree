import React, { useState, useEffect } from "react";
import styles from './MyTrees.module.css'
import TitleBlock from "../../../components/UI/TitleBlock/TitleBlock";
import BigInput from "../../../components/UI/BigInput/BigInput";
import RegularButton from "../../../components/UI/RegularButton/RegularButton";
import EditTree from "../../../components/EditTree/EditTree";
import RightBar from "../../../components/RightBar/RightBar";
import { updateUserData, verificateEmail, createNewTree } from "../../../features/features";
import axios from "axios";
import globals from "../../../globals";

const MyTrees = ({user, userTrees, lifeForms, setInfoModalVisible, setInfoImg, setInfoTitle, setInfoText}) => {

    const [inlineCode, setInlineCode] = useState('')
    const [approvedAccount, setApprovedAccount] = useState(user.is_verificated)

    const [errors, setErrors] = useState(false)
    const [error, serError] = useState('')

    const [timer, setTimer] = useState(0);
    const [canResend, setCanResend] = useState(true);

    const [selectedTree, setSelectedTree] = useState(null)

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

    const handleCreateNewTree = async () => {
        const token = localStorage.getItem('authToken');

        if (token) {
            const success = await createNewTree(token);
            if (success) {
                console.log('Дерево и персонаж успешно созданы.');
                // Дополнительные действия при успешном создании
            } else {
                console.error('Не удалось создать дерево и персонажа.');
                // Обработка ситуации неудачи
            }
        } else {
            console.error('Токен пользователя не найден.');
            // Обработка ситуации, когда токен отсутствует
        }
    };

    return(
        <>
            <div className={styles.backgroundContainer}></div>
            <div className={styles.container}>
                {user.role_id == 2 &&
                    <div className={styles.zaglushka}>
                        <div className={styles.zTitle}>Сул-Сул!</div>
                        <div className={styles.zSubtitle1}>Сейчас тут пустовато. Не пугайтесь!</div>
                        <div className={styles.zSubtitle2}>Основной функционал работы с древом сейчас  в разработке. Мы обязательно уведомим Вас по почте или в нашем <a className={styles.tglink} href="https://t.me/dynastytree" target="_blank" rel="noopener noreferrer">телеграм-канале</a>, когда все будет готово ;)</div>
                        <div className={styles.zSubtitle3}>Спасибо, что ждете и остаетесь с нами!</div>
                    </div>
                }
                {user.role_id == 1 &&
                    <>
                        {selectedTree && <RightBar />}
                        <div className={!user.is_verificated ? styles.blurContainer : styles.notBlur}>
                            {!selectedTree &&
                                <>
                                    <div className={styles.marginWrapper}>
                                        <TitleBlock text='Мои древа' />
                                    </div>
                                    <div className={styles.treesList}>
                                        {userTrees && userTrees.map(tree => 
                                            <div className={styles.tree}>
                                                <div className={styles.treeCover}></div>
                                                <div className={styles.treeTitle}>{tree.title}</div>
                                                <div className={styles.treeControlButtons}>
                                                    <RegularButton type={'grey'} text={'Редактировать'} width={'166px'} height={'28px'} textSize={'14px'} event={() => setSelectedTree(tree)}/>
                                                    <div style={{height: '15px'}}></div>
                                                    <RegularButton type={'grey'} text={'Удалить'} width={'166px'} height={'28px'} textSize={'14px'} />
                                                </div>
                                                
                                            </div>    
                                        )}
                                    </div>
                                    <div className={styles.addTreeButton}>
                                        <RegularButton type={'grey'} text={'Добавить древо'} width={'166px'} height={'28px'} textSize={'14px'} event={() => {handleCreateNewTree()}}/>
                                    </div>
                                </>
                            }
                            {selectedTree &&
                                <EditTree tree={selectedTree} lifeForms={lifeForms} setSelectedTree={setSelectedTree}/>
                            }
                        </div>
                    </>
                }
                
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

export default MyTrees