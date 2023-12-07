import React from "react";
import styles from './Footer.module.css'

const Footer = ({selectedBlock, setSelectedBlock}) => {

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
                            src='./svg/foot_envelope.svg'
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
                    
                   
                        <span className={styles.privacy}>
                            <a onClick={() => setSelectedBlock(6)} >Политика конфиденциальности</a>
                        </span>
                    
                </div>
            </div>

            <div className={styles.svgs}>
                <div className={styles.images}>
                    <img src='./svg/foot_row.svg' />
                    <a href="mailto:info@simsdynastytree.com" target="_blank" rel="noopener noreferrer">
                        <img src='./svg/foot_mail.svg'/>
                    </a>
                    <a href="https://vk.com/thedynastytree" target="_blank" rel="noopener noreferrer">
                        <img src='./svg/foot_vk.svg'/>
                    </a>
                    <a href="https://t.me/dynastytree" target="_blank" rel="noopener noreferrer">
                        <img src='./svg/foot_tg.svg' alt="Telegram Icon"/>
                    </a>
                    <a href="https://www.youtube.com/@SLASTIgames" target="_blank" rel="noopener noreferrer">
                        <img src='./svg/foot_yout.svg'/>
                    </a>
                    {/* <img src='./svg/facebook.svg'/>
                        <img src='./svg/inst.svg'/> */}
                    <img src='./svg/foot_row.svg' />
                </div>
            </div>
            
        </div>
    );
}

export default Footer