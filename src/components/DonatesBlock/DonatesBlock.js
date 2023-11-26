import React from "react";
import styles from './DonatesBlock.module.css'
import RegularButton from "../UI/RegularButton/RegularButton";

const DonatesBlock = () => {

    return (
        <div className={styles.component}>
            <div className={styles.content}>
                <div className={styles.subtitleBlock}>
                    <div className={styles.polaroidRow}>
                        <img src='/images/2.png' />
                        <img src='/images/1.png' />
                        <span className={styles.subtitleLeft}>
                            Мы — разработчики и создатели сайта — как никто другой понимаем, какую ценность представляет древо династии для каждого истинного фаната The Sims. Это долгие часы, проведенные в игре, кропотливый труд и трогательные воспоминания. Это хроника, которой хочется поделиться, и которая заслуживает того, чтобы ее сохранить!
                        </span>
                    </div>
                    <div className={styles.polaroidRow}>
                        <span className={styles.subtitleRight}>
                            Поэтому мы делаем все что в наших силах, чтобы история каждого персонажа продолжала рассказываться. Для этого наш сервис должен исправно функционировать, развиваться и дополняться новыми функциями. Это возможно только с вашей помощью — поддержите проект донатом и общими усилиями мы сохраним нашу историю!
                        </span>
                        <img src='/images/5.png' />
                        <img src='/images/3.png' />
                    </div>
                </div>
                <div className={styles.buttonBlock}>
                    <RegularButton type={'grey'} text={'Помочь проекту'} width={'250px'} height={'38px'} textSize={'16px'}/>
                </div>
            </div>
        </div>
    );
}

export default DonatesBlock