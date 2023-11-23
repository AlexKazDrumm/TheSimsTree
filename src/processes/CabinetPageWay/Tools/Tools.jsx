import React, { useState } from "react";
import styles from './Tools.module.css'
import { Instructions } from "../../../entities/lists/InstructionsLK";
import TitleBlock from "../../../components/UI/TitleBlock/TitleBlock";

const Tools = () => {
    const [selectedTheme, setSelectedTheme] = useState(null); 
    const [openedInstruction, setOpenedInstruction] = useState(null);

    const toggleInstruction = (instructionTitle) => {
        if (openedInstruction === instructionTitle) {
            setOpenedInstruction(null);
        } else {
            setOpenedInstruction(instructionTitle);
        }
    };

    return (
        <div className={styles.container}>
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
    )
}

export default Tools