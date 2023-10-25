import React, { useState } from "react";
import styles from './Tools.module.css'

const Tools = () => {
    const [selectedTheme, setSelectedTheme] = useState(null);  // 1. State для выбранной темы

    const instructions = {
        "Регистрация и авторизация": ["Шаг 1", "Шаг 2", "Шаг 3"],
        "Создание древа": ["Шаг A", "Шаг B"],
        "Выгрузка и загрузка": ["ауцаа", "уцкпцука"],
        "Общение и коммьюнити": ["фауц", "йцукп"],
        "FAQ": ["1324A", "Ша1234"],
    };

    const themeIcons = {
        "Регистрация и авторизация": '/svg/tools_settings.svg',
        "Создание древа": '/svg/tools_plum_tree.svg',
        "Выгрузка и загрузка": '/svg/tools_download.svg',
        "Общение и коммьюнити": '/svg/tools_chat.svg',
        "FAQ": '/svg/tools_faq.svg',
    };

    return (
        <div className={styles.container}>
            <div className={styles.titleRow}>
                <span className={styles.title}>Инструкции</span>
            </div>
            <div className={styles.themesRow}>
                {["Регистрация и авторизация", "Создание древа", "Выгрузка и загрузка", "Общение и коммьюнити", "FAQ"].map(theme => (
                    <div className={styles.theme} key={theme} style={theme == selectedTheme ? {border: '3px solid green'} : {border: 'none'}} onClick={() => setSelectedTheme(theme)}>  
                        <div className={styles.imgBlock}>
                            <img className={styles.logo} src={themeIcons[theme]} />
                        </div>
                        <div className={styles.spanBlock}>
                            <span>{theme}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.instructionsBlock}>
                {selectedTheme && instructions[selectedTheme]?.map(instruction => 
                    <div className={styles.instruction} key={instruction}>
                        {instruction}
                    </div>
                )}  
            </div>
        </div>
    )
}

export default Tools