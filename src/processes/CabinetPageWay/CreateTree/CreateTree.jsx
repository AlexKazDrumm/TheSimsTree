import React from "react";
import styles from './CreateTree.module.css'
import TitleBlock from "../../../components/UI/TitleBlock/TitleBlock";
import RegularButton from "../../../components/UI/RegularButton/RegularButton";
import RightBar from "../../../components/RightBar/RightBar";

const CreateTree = () => {

    return(
        <>
        <div className={styles.backgroundContainer}></div>
        <div className={styles.container}>
            <div className={styles.marginWrapper}>
                <TitleBlock text='Название династии' />
            </div>
            <div className={styles.marginWrapper}>
                <RightBar />
                <div className={styles.topRow}>
                    <div className={styles.buttons}>
                        <div className={styles.button}>
                            <RegularButton text='О династии' type='grey' width={'166px'} height={'28px'}/>
                        </div>
                        <div className={styles.button}>
                            <RegularButton text='Об авторе' type='grey' width={'166px'} height={'28px'} />
                        </div>
                    </div>
                    <div className={styles.selecterBlock}>
                        <span style={{marginRight: '10px', marginBottom: '9px'}}>Предпросмотр</span><img src='./svg/selecter_left.svg' />
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default CreateTree