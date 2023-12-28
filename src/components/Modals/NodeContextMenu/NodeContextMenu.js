import React, { useState } from "react";
import styles from './NodeContextMenu.module.css'
import CloseButton from "../../UI/CloseButton/CloseButton";

const NodeContextMenu = ({showNodeContextMenu, setShowNodeContextMenu, character, setShowEditCharacterModal}) => {

    console.log({character})

    const [step, setStep] = useState(1)

    const handleEdit = () => {
        setShowEditCharacterModal(true)
        setShowNodeContextMenu(false)
    };

    return(
        <>
            {showNodeContextMenu && <div className={styles.modalBackground}></div>}
            <div
                className={styles.modalWrapper}
                style={
                    {
                    ...(showNodeContextMenu ? { display: "flex" } : { display: "none" }),
                    }
                }
            >
                <div className={styles.whiteBlock}>
                    <div className={styles.closeBtnRow}>
                        <CloseButton 
                            event={() => {
                                setShowNodeContextMenu(false)
                            }}
                            img={'./svg/x_blue.svg'}
                        />
                    </div>
                </div>
                <div className={styles.content}>
                    {step == 1 &&
                        <div className={styles.options}>
                            <div onClick={handleEdit}>
                                <img src='./svg/icon-edit.svg' />
                                <span>Редактировать</span>
                            </div>
                            <div>
                                <img src='./svg/icon-plus.svg' />
                                <span>Добавить персонажа</span>
                            </div>
                    
                            <div>
                                <img src='./svg/link.svg' />
                                <span>Ссылка на другое древо</span>
                            </div>
                
                            <div>
                                <img src='./svg/trash.svg' />
                                <span>Удалить персонажа</span>
                            </div>
                        </div>
                    }
                    {step == 2 &&
                        <div>

                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default NodeContextMenu