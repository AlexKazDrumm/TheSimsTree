import React, { useState } from "react";
import styles from './Tools.module.css'
import { Instructions } from "../../../entities/lists/InstructionsLK";
import TitleBlock from "../../../components/UI/TitleBlock/TitleBlock";
import BigInput from "../../../components/UI/BigInput/BigInput";
import RegularButton from "../../../components/UI/RegularButton/RegularButton";
import { updateUserData } from "../../../features/features";
import axios from "axios";
import globals from "../../../globals";

const Tools = ({user, setInfoModalVisible, setInfoImg, setInfoTitle, setInfoText}) => {
    const [selectedTheme, setSelectedTheme] = useState(null); 
    const [openedInstruction, setOpenedInstruction] = useState(null);
    const [inlineCode, setInlineCode] = useState('')

    const [approvedAccount, setApprovedAccount] = useState(user.is_verificated)

    const [errors, setErrors] = useState(false)
    const [error, serError] = useState('')

    // console.log({user})

    const toggleInstruction = (instructionTitle) => {
        if (openedInstruction === instructionTitle) {
            setOpenedInstruction(null);
        } else {
            setOpenedInstruction(instructionTitle);
        }
    };

    const showAlert = (message, type) => {
        setErrors(true)
    }

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
                    console.error('Ошибка при обновлении данных пользователя:', updateError);
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

    return (
        <>
            <div className={styles.backgroundContainer}></div>
            <div className={styles.container}>
                <div className={!user.is_verificated ? styles.blurContainer : styles.notBlur}>
                    <div className={styles.marginWrapper}>
                        <TitleBlock text='Инструкции' />
                    </div>
                    <div className={styles.themesRow}>
                        {Object.entries(Instructions).map(([theme, {icon}]) => (
                            <div className={styles.theme} key={theme} style={theme === selectedTheme ? {border: '3px solid green'} : {border: 'none'}} onClick={() => setSelectedTheme(theme)}>  
                                <div className={styles.imgBlock}>
                                    <img className={styles.logo} src={icon} />
                                </div>
                                <div className={styles.spanBlock}>
                                    <span>{theme}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={styles.instructionsBlock}>
                        {selectedTheme && Instructions[selectedTheme]?.instructions.map(instruction => 
                            <>
                                <div className={styles.dropdownRow} key={instruction.title} onClick={() => toggleInstruction(instruction.title)}>
                                    <span>{instruction.title}</span>
                                    <div className={styles.dropdownButton}>
                                        <img src={openedInstruction === instruction.title ? '/svg/dropdown_up.svg' : '/svg/dropdown_down.svg'} />
                                    </div>
                                </div>
                                {openedInstruction === instruction.title && (
                                    <div className={styles.instruction}>
                                        <span>{instruction.text}</span>
                                    </div>
                                )}
                            </>
                        )}  
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
                                <span className={styles.rememberPassword} onClick={() => {
                                    handleCheckCode(true)
                                }}>Отправить код повторно</span>
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

export default Tools