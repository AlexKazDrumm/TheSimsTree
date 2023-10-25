import React from "react";
import styles from './Footer.module.css'

const Footer = () => {

    return (
        <div className={styles.container}>
            <div className={styles.links}>
                <div className={styles.contacts}>
                    <div className={styles.contact}>
                        <img 
                            src='./svg/phone.svg'
                        />
                        <span>
                            +7 (991) 020-03-42
                        </span>
                    </div>
                    <div className={styles.contact}>
                        <img 
                            src='./svg/mail.svg'
                        />
                        <span>
                            alexdrumm13@gmail.com
                        </span>
                    </div>
                </div>
                <div className={styles.rules}>
                    <span>Использование материалов сайта без согласования запрещено</span>
                    <span>SimsDynastyTree 2023 ©</span>
                </div>
                <div className={styles.messengers}>
                    <div className={styles.images}>
                        <img src='./svg/vk.svg'/>
                        <a href="https://t.me/dynastytree" target="_blank" rel="noopener noreferrer">
                            <img src='./svg/telegram.svg' alt="Telegram Icon"/>
                        </a>
                        <img src='./svg/youtube.svg'/>
                        {/* <img src='./svg/facebook.svg'/>
                        <img src='./svg/inst.svg'/> */}
                    </div>
                    <div className={styles.privacy}>
                        <span>
                            Политика конфидециальности
                        </span>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default Footer