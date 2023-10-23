import React from "react";
import styles from './IntroduceBlock.module.css'
import RegularButton from "../UI/RegularButton/RegularButton";

const IntroduceBlock = ({setSupportModalVisible}) => {

    return (
        <div className={styles.component}>
            <div className={styles.content}>
                <div className={styles.titleBlock}>
                    <span className={styles.title}>
                        Добро пожаловать! Сул-Сул!
                    </span>
                </div>
                <div className={styles.subtitleBlock}>
                    <span className={styles.subtitle}>
                        В связи с закрытием сайта PlumTree мы создали более удобную версию для создания родословных наших SIMов
                    </span>
                    <span className={styles.subtitle}>
                        Тестируйте, рассказывайте друзьям и знакомым, пишите пожелания по работе сервиса - будем рады любой обратной связи!
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