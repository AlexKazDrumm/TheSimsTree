import React from "react";
import styles from './IntroduceBlock.module.css'
import RegularButton from "../UI/RegularButton/RegularButton";

const IntroduceBlock = ({setSupportModalVisible}) => {

    return (
        <div className={styles.component}>
            <div className={styles.content}>
                <div className={styles.titleBlock}>
                    <span className={styles.title}>
                        Сул-сул! — и добро пожаловать!
                    </span>
                </div>
                <div className={styles.subtitleBlock}>
                    <span className={styles.subtitle}>
                        В связи с закрытием сайта PlumTreeApp мы сделали более современную и удобную версию для создания родословных наших любимых SIMов.
                    </span>
                    <span className={styles.subtitle}>
                        Тестируйте функции, создавайте свой дизайн, рассказывайте друзьям — и обязательно делитесь впечатлениями! Мы сделали этот сайт специально для фанатов The Sims, поэтому внимательно относимся к вашим мнениям и предложениям.
                    </span>
                    <span className={styles.subtitle}>
                        Давайте развиваться вместе!
                    </span>
                </div>
                <div className={styles.buttonBlock}>
                    <RegularButton type={'grey'} text={'Обратная связь'} event={() => {setSupportModalVisible(true)}}/>
                </div>
            </div>
        </div>
    );
}

export default IntroduceBlock