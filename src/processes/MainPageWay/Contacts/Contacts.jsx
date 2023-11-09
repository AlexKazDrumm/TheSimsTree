import React from "react";
import styles from './Contacts.module.css';

const Contacts = () => {
    return (
        <div className={styles.container}>
            <div className={styles.titleRow}>
                <span className={styles.title}>Сул-сул! Если хочешь с нами связаться, ниже найдешь наши контакты <img src='/svg/smile.svg'/></span>
            </div>
            <div className={styles.contactsRow}>
                <div className={styles.contact}>
                    <img src='/svg/contact_mail.svg'/>
                    <a href="mailto:info@simsdynastytree.com" target="_blank" rel="noopener noreferrer">info@simsdynastytree.com</a>
                </div>
                <div className={styles.contact}>
                    <img src='/svg/contact_phone.svg'/>
                    <a href="https://t.me/dynastytree" target="_blank" rel="noopener noreferrer">https://t.me/dynastytree</a>
                </div>
                <div className={styles.contact}>
                    <img src='/svg/contact_youtube.svg'/>
                    <a href="https://www.youtube.com/@SLASTIgames" target="_blank" rel="noopener noreferrer">https://www.youtube.com/@SLASTIgames</a>
                </div>
                
                {/* <a href="https://www.youtube.com/@SLASTIgames" target="_blank" rel="noopener noreferrer" className={`${styles.contact} ${styles.yout}`} style={{ borderColor: '#FF4B4B' }}></a>

                <a href="https://t.me/dynastytree" target="_blank" rel="noopener noreferrer" className={`${styles.contact} ${styles.telegram}`} style={{ borderColor: '#37BBFE' }}></a>

                <div className={`${styles.contact} ${styles.vk}`} style={{ borderColor: '#2789F6' }}></div> */}
            </div>
        </div>
    );
};

export default Contacts;