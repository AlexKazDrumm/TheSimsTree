import React from "react";
import styles from './RegularTextarea.module.css'

const RegularTextarea = ({event, type, value}) => {

    return (
        <>
            <textarea type={type} className={styles.textarea} onChange={event} value={value}></textarea>
        </>
    );
}

export default RegularTextarea