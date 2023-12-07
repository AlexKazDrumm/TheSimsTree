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
                <RightBar />
                <div className={styles.blurContainer}>
                    <div className={styles.marginWrapper}>
                        <TitleBlock text='Название династии' />
                    </div>
                    <div className={styles.marginWrapper}>
                        <div className={styles.topRow}>
                            <div className={styles.buttons}>
                                <div className={styles.button}>
                                    <RegularButton text='О династии' type='grey' width={'166px'} height={'28px'} textSize={'12px'}/>
                                </div>
                                <div className={styles.button}>
                                    <RegularButton text='Об авторе' type='grey' width={'166px'} height={'28px'} textSize={'12px'} />
                                </div>
                            </div>
                            <div className={styles.selecterBlock}>
                                <span style={{marginRight: '10px', marginBottom: '9px'}}>Предпросмотр</span><img src='./svg/selecter_left.svg' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.zaglushka}>
                    <div className={styles.zTitle}>Сул-Сул!</div>
                    <div className={styles.zSubtitle1}>Сейчас тут пустовато. Не пугайтесь!</div>
                    <div className={styles.zSubtitle2}>Основной функционал работы с древом сейчас  в разработке. Мы обязательно уведомим Вас по почте или в нашем <a className={styles.tglink} href="https://t.me/dynastytree" target="_blank" rel="noopener noreferrer">телеграм-канале</a>, когда все будет готово ;)</div>
                    <div className={styles.zSubtitle3}>Спасибо, что ждете и остаетесь с нами!</div>
                </div>
                
            </div>
        </>
    )
}

export default CreateTree