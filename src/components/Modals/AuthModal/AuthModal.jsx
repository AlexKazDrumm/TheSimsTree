import React, { useRef, useEffect, useState } from "react";
import styles from './AuthModal.module.css';
import CloseButton from "../../UI/CloseButton/CloseButton";
import FormPair from "../../FormPair/FormPair";
import RegularButton from "../../UI/RegularButton/RegularButton";
import globals from '../../../globals'
import axios from 'axios'
import { fetchUserData } from "../../../entities/User";

const AuthModal = ({authModalVisible, setAuthModalVisible, setIsAuth, setUser}) => {
    const verificationCode = '1234'
    const userData = {login: 'Agarey', password: 'Robsalvatore13'}
    
    const [authSteps, setAuthSteps] = useState(true)
    const [regSteps, setRegSteps] = useState(false)
    const [waitCodeMode, setWaitCodeMode] = useState(false)

    const [inlineCode, setInlineCode] = useState('')
    const [login, setLogin] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [password, setPassword] = useState('')
    const [checkPassword, setCheckPassword] = useState('')

    const [errors, setErrors] = useState(false)
    const [error, serError] = useState('')
    
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

    const handleCheckCode = async () => {
        if (!inlineCode) {
            showAlert('Введите код верификации!', 'error')
            return;
        }
        try {
            const response = await axios.post(`${globals.productionServerDomain}/verificateUser`, {
                login,
                code: inlineCode,
            });
            if (response.data) {
                setIsAuth(true);
                setWaitCodeMode(false);
                showAlert('Успешная верификация!', 'accepted');
                setAuthModalVisible(false);
                const token = response.data.token;
                localStorage.setItem('authToken', token);
                await fetchUserData(token);
            }
        } catch (error) {
            serError(error?.response?.data);
            showAlert(error.response?.data?.message || 'Неправильный код верификации!', 'error');
        }
    };

    const handleLogin = async () => {
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
      
        // Проверка логина и пароля на сервере
        try {
          const response = await axios.post(`${globals.productionServerDomain}/login`, {
            login,
            password,
          });
      
          if (response.data) {
            // Успешный вход
            setIsAuth(true)
            setAuthModalVisible(false)
            const token = response.data.token;
            localStorage.setItem('authToken', token);
            const newUser = await fetchUserData(token);
            setUser(newUser)
          } else {
            // Неуспешный вход
            showAlert(response.data.message || 'Неверный логин или пароль!', 'error');
          }
        } catch (error) {
          if (error.response && error.response.status === 401) {
            showAlert('Неверный логин или пароль!', 'error');
          } else if (error.response && error.response.status === 404) {
            showAlert('Пользователь не найден!', 'error');
          } else {
            throw error;
          }
        }
      };

    const handleRegister = async () => {
        if (!login || !email || !password || !checkPassword || password !== checkPassword) {
            showAlert('Заполнены не все обязательные поля', 'error')
            console.log('error?', {login, email, password, checkPassword})
            return;
        }
        try {
            const response = await axios.post(`${globals.productionServerDomain}/registerUser`, {
                login,
                email,
                name,
                surname,
                password
            });
            if (response.data.success) {
                // Вместо немедленного входа в систему, перевести пользователя в режим ожидания ввода кода
                setAuthSteps(false);
                setRegSteps(false);
                setWaitCodeMode(true); // активируем режим ожидания ввода кода
                showAlert('На вашу почту отправлен код подтверждения. Пожалуйста, проверьте вашу почту и введите код.', 'info');
                // здесь можно сбросить поля формы или сделать другие необходимые действия
            } else {
                showAlert(response.data.message, 'error');
            }
        } catch (error) {
            serError(error?.response?.data)
            showAlert(error.response?.data?.message || 'Ошибка регистрации!', 'error');
        }
    };

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
                {/* <button onClick={() => {
                fetchUserData(localStorage.getItem('authToken'))
                console.log(localStorage.getItem('authToken'))
                }}>a</button> */}
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
                                <span className={styles.rememberPassword}>Забыли пароль?</span>
                            </div>
                        </>
                    }
                    {regSteps && !waitCodeMode &&
                        <>
                            <div className={styles.formBlock}>
                                <span className={styles.title}>
                                    Регистрация
                                </span>
                                <FormPair label={'Никнейм'} type={'text'} event={(e) => {setLogin(e.target.value)}} value={login} element={'input'} error={errors && !login?'Введите никнейм!':error == 'Такой логин уже существует.'?error:null} />
                                {/* <FormPair label={'Имя'} type={'text'} element={'input'} event={(e) => {setName(e.target.value)}} value={name} />
                                <FormPair label={'Фамилия'} type={'text'} element={'input'} event={(e) => {setSurname(e.target.value)}} value={surname}  /> */}
                                <FormPair label={'E-mail'} type={'text'} event={(e) => {setEmail(e.target.value)}} value={email} element={'input'} error={errors && !email?'Введите E-mail!!':error == 'Такая почта уже существует.'?error:null} />
                                <FormPair label={'Пароль'} type={'password'} event={(e) => {setPassword(e.target.value)}} value={password} element={'input'} error={errors && !password?'Введите пароль':null} />
                                <FormPair label={'Повторите пароль'} type={'password'} event={(e) => {setCheckPassword(e.target.value)}} value={checkPassword} element={'input'} error={errors && !checkPassword?'Повторите пароль':null} />
                            </div>
                        </>
                    }
                    {waitCodeMode &&
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
                    {waitCodeMode &&
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