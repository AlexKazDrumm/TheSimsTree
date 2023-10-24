import React, { useRef, useEffect, useState } from "react";
import styles from './AuthModal.module.css';
import CloseButton from "../../UI/CloseButton/CloseButton";
import FormPair from "../../FormPair/FormPair";
import RegularButton from "../../UI/RegularButton/RegularButton";

const AuthModal = ({authModalVisible, setAuthModalVisible, setIsAuth}) => {
    const verificationCode = '1234'
    const userData = {login: 'Agarey', password: 'Robsalvatore13'}
    
    const [authSteps, setAuthSteps] = useState(true)
    const [regSteps, setRegSteps] = useState(false)
    const [waitCodeMode, setWaitCodeMode] = useState(false)

    const [inlineCode, setInlineCode] = useState('')
    const [login, setLogin] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [checkPassword, setCheckPassword] = useState('')

    const [errors, setErrors] = useState(false)
    
    const modalRef = useRef(null);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setAuthModalVisible(false);
        }
    };

    const showAlert = (message, type) => {
        setErrors(true)
    }

    const handleCheckCode = (code) => {
        if (code == verificationCode) {
            setAuthSteps(true)
            setRegSteps(false)
            setWaitCodeMode(false)
            setErrors(false)
            showAlert('Успешная регистрация!', 'accepted')
        } else {
            showAlert('Данный код не подходит!', 'error')
        }
    }

    const handleLogin = () => {
        if (!login && !email) {
            showAlert('Введите логин или E-mail!', 'error')
            return
        } else {
            setErrors(false)
        }
        if (!password) {
            showAlert('Введите пароль!', 'error')
            return
        } else {
            setErrors(false)
        }
        if (login != userData.login || password != userData.password) {
            showAlert('Неверный логин или пароль!', 'error')
            return
        } else {
            setErrors(false)
        }

        setIsAuth(true)
        setAuthModalVisible(false)
    }

    const handleRegister = () => {
        if (!login) {
            showAlert('Введите никнейм!', 'error')
            return
        } else {
            setErrors(false)
        }
        if (!email) {
            showAlert('Введите E-mail!!', 'error')
            return
        } else {
            setErrors(false)
        }
        if (!password) {
            showAlert('Введите пароль', 'error')
            return
        } else {
            setErrors(false)
        }
        if (!checkPassword) {
            showAlert('Повторите пароль', 'error')
            return
        } else {
            setErrors(false)
        }
        if (password != checkPassword) {
            showAlert('Пароли не совпадают!', 'error')
            return
        } else {
            setErrors(false)
        }

        setWaitCodeMode(true)
    }

    return (
        <>
            {authModalVisible && <div className={styles.modalBackground}></div>}
            <div
                className={styles.modalWrapper}
                style={
                    {
                    ...(authModalVisible ? { display: "flex" } : { display: "none" }),
                    }
                }
                ref={modalRef}
            >
                <div className={styles.whiteBlock}>
                    <div className={styles.closeBtnRow}>
                        <CloseButton 
                            event={() => {
                                setAuthModalVisible(false)
                            }}
                            img={'./svg/close.svg'}
                        />
                    </div>
                    {authSteps &&
                        <>
                            <div className={styles.formBlock}>
                                <span className={styles.title}>
                                    Авторизация
                                </span>
                                <FormPair label={'Логин или E-mail'} type={'text'} event={(e) => {setLogin(e.target.value)}} value={login} element={'input'} error={errors && !login && !email?'Введите логин или E-mail':null}/>
                                <FormPair label={'Пароль'} type={'password'} event={(e) => {setPassword(e.target.value)}} value={password} element={'input'} error={errors && !password?'Введите пароль!':null} />
                            </div>
                        </>
                    }
                    {regSteps && !waitCodeMode &&
                        <>
                            <div className={styles.formBlock}>
                                <span className={styles.title}>
                                    Регистрация
                                </span>
                                <FormPair label={'Никнейм'} type={'text'} event={(e) => {setLogin(e.target.value)}} value={login} element={'input'} error={errors && !login?'Введите никнейм!':null} />
                                <FormPair label={'Имя'} type={'text'} element={'input'} />
                                <FormPair label={'Фамилия'} type={'text'} element={'input'} />
                                <FormPair label={'E-mail'} type={'text'} event={(e) => {setEmail(e.target.value)}} value={email} element={'input'} error={errors && !email?'Введите E-mail!!':null} />
                                <FormPair label={'Пароль'} type={'password'} event={(e) => {setPassword(e.target.value)}} value={password} element={'input'} error={errors && !password?'Введите пароль':null} />
                                <FormPair label={'Повторите пароль'} type={'password'} event={(e) => {setCheckPassword(e.target.value)}} value={checkPassword} element={'input'} error={errors && !checkPassword?'Повторите пароль':null} />
                            </div>
                        </>
                    }
                    {regSteps && waitCodeMode &&
                        <>
                            <div className={styles.formBlock}>
                                <span className={styles.title}>
                                    Подтверждение почты
                                </span>
                                <FormPair label={'На Вашу почту было отправлено письмо с кодом, введите его здесь'} type={'text'} event={(e) => {setInlineCode(e.target.value)}} value={inlineCode} element={'input'}/>
                            </div>
                        </>
                    }
                </div>
                <div className={styles.greyBlock}>
                    {authSteps &&
                        <>
                            <div className={styles.buttonWrapper}>
                                <RegularButton 
                                    text={'Войти'}
                                    type={'grey'}
                                    event={() => {
                                        handleLogin()
                                    }}
                                />  
                            </div>
                            <div className={styles.buttonWrapper2}>
                                <RegularButton 
                                    text={'Войти через Google'}
                                    type={'grey'}
                                    event={() => {
                                        handleLogin()
                                    }}
                                />  
                            </div>
                            <div className={styles.buttonWrapper}>
                                <RegularButton 
                                    text={'Регистрация'}
                                    type={'grey'}
                                    event={() => {
                                        setAuthSteps(false)
                                        setRegSteps(true)
                                    }}
                                />
                            </div>
                        </>
                    }
                    {regSteps && !waitCodeMode &&
                        <>
                            <div className={styles.buttonWrapper}>
                                <RegularButton 
                                    text={'Зарегистрироваться'}
                                    type={'grey'}
                                    event={() => {
                                        handleRegister()
                                    }}
                                />  
                            </div>
                            <div className={styles.buttonWrapper2}>
                                <RegularButton 
                                    text={'Войти через Google'}
                                    type={'grey'}
                                    event={() => {
                                        handleLogin()
                                    }}
                                />  
                            </div>
                            <div className={styles.buttonWrapper}>
                                <RegularButton 
                                    text={'Вход'}
                                    type={'grey'}
                                    event={() => {
                                        setAuthSteps(true)
                                        setRegSteps(false)
                                    }}
                                />
                            </div>
                        </>
                    }
                    {regSteps && waitCodeMode &&
                        <>
                            <div className={styles.buttonWrapper}>
                                <RegularButton 
                                    text={'Отправить'}
                                    type={'grey'}
                                    event={() => {
                                        handleCheckCode(inlineCode)
                                    }}
                                />  
                            </div>
                        </>
                    }
                </div>
            </div>
        </>
    );
}

export default AuthModal;