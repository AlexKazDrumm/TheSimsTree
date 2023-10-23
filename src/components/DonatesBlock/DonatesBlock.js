import React from "react";
import styles from './DonatesBlock.module.css'
import RegularButton from "../UI/RegularButton/RegularButton";

const DonatesBlock = () => {

    return (
        <div className={styles.component}>
            <div className={styles.content}>
                <div className={styles.subtitleBlock}>
                    <div className={styles.polaroidRow}>
                        <img src='/images/1.png' />
                        <span className={styles.subtitleLeft}>
                            Создатели сайта как никто другой понимают, какую ценность представляет древо династии для каждого игрока игры The Sims.
                        </span>
                    </div>
                    <div className={styles.polaroidRow}>
                        <span className={styles.subtitleRight}>
                            Это целая история, трогательные воспоминания… Поэтому мы хотим, чтобы история каждого любимого персонажа продолжала рассказываться
                        </span>
                        <img src='/images/2.png' />
                    </div>
                    <div className={styles.polaroidRow}>
                        <img src='/images/3.png' />
                        <span className={styles.subtitleLeft}>
                            А для этого наш сервис должен исправно функционировать и постоянно развиваться.
                        </span>
                    </div>
                    <div className={styles.polaroidRow}>
                        <span className={styles.subtitleRight}>
                            Ну а чтобы наш сайт работал и развивался - вы можете помочь небольшим донатом (или большим) &#128522;
                        </span>
                        <img src='/images/4.png' />
                    </div>
                    
                </div>
                <div className={styles.buttonBlock}>
                    <RegularButton type={'grey'} text={'Помочь проекту'}/>
                </div>
            </div>
        </div>
    );
}

export default DonatesBlock