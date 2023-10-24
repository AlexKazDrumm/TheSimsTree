import React, { useState } from "react";
import styles from './Tools.module.css'

const Tools = () => {
    const [selectedTheme, setSelectedTheme] = useState(null);  // 1. State для выбранной темы

    const instructions = {
        "Регистрация и авторизация": ["Шаг 1", "Шаг 2", "Шаг 3"],
        "Создание древа": ["Шаг A", "Шаг B"],
        "Выгрузка и загрузка": ["ауцаа", "уцкпцука"],
        "Общение и коммьюнити": ["фауц", "йцукп"],
        "Ещё один блок": ["1324A", "Ша1234"],
    };
    return (
        <div className={styles.container}>
            <div className={styles.titleRow}>
                <span className={styles.title}>Инструкции</span>
            </div>
            <div className={styles.themesRow}>
                {["Регистрация и авторизация", "Создание древа", "Выгрузка и загрузка", "Общение и коммьюнити", "Ещё один блок"].map(theme => (
                    <div className={styles.theme} key={theme} style={theme == selectedTheme ? {border: '3px solid green'} : {border: 'none'}} onClick={() => setSelectedTheme(theme)}>  
                        <div className={styles.imgBlock}>
                            <img className={styles.logo} src='/svg/gem.svg' />
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