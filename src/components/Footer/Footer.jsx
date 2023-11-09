import React from "react";
import styles from './Footer.module.css'

const Footer = () => {

    return (
        <div className={styles.container}>
            <div className={styles.links}>
                <div className={styles.contacts}>
                    {/* <div className={styles.contact}>
                        <img 
                            src='./svg/phone.svg'
                        />
                        <span>
                            +7 (991) 020-03-42
                        </span>
                    </div> */}
                    <div className={styles.contact}>
                        <img 
                            src='./svg/mail.svg'
                        />
                        <span>
                            info@simsdynastytree.com
                        </span>
                    </div>
                </div>
                <div className={styles.rules}>
                    <span>Использование материалов сайта без согласования запрещено</span>
                    <span>SimsDynastyTree 2023 ©</span>
                </div>
                <div className={styles.messengers}>
                    <div className={styles.images}>
                        <a href="mailto:info@simsdynastytree.com" target="_blank" rel="noopener noreferrer">
                            <img src='./svg/greenvelope.svg'/>
                        </a>
                        <a href="https://vk.com/thedynastytree" target="_blank" rel="noopener noreferrer">
                            <img src='./svg/vk.svg'/>
                        </a>
                        <a href="https://t.me/dynastytree" target="_blank" rel="noopener noreferrer">
                            <img src='./svg/telegram.svg' alt="Telegram Icon"/>
                        </a>
                        <a href="https://www.youtube.com/@SLASTIgames" target="_blank" rel="noopener noreferrer">
                            <img src='./svg/youtube.svg'/>
                        </a>
                        {/* <img src='./svg/facebook.svg'/>
                        <img src='./svg/inst.svg'/> */}
                    </div>
                    <div className={styles.privacy}>
                        <span>
                            <a href="https://disk.yandex.ru/d/pJ-4xbAei0zagQ" target="_blank" rel="noopener noreferrer">Политика конфиденциальности</a>
                        </span>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default Footer