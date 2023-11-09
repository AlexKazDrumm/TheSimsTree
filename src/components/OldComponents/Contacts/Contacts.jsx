import React from "react";
import styles from './Contacts.module.css';

const Contacts = () => {
    return (
        <div className={styles.container}>
            <div className={styles.titleRow}>
                <span className={styles.title}>С нами всегда просто связаться!</span>
            </div>
            <div className={styles.contactsRow}>
                <a href="https://www.youtube.com/@SLASTIgames" target="_blank" rel="noopener noreferrer" className={`${styles.contact} ${styles.yout}`} style={{ borderColor: '#FF4B4B' }}></a>

                <a href="https://t.me/dynastytree" target="_blank" rel="noopener noreferrer" className={`${styles.contact} ${styles.telegram}`} style={{ borderColor: '#37BBFE' }}></a>

                <div className={`${styles.contact} ${styles.vk}`} style={{ borderColor: '#2789F6' }}></div>
            </div>
        </div>
    );
};

export default Contacts;