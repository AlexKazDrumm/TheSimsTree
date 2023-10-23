import React from "react";
import styles from './RegularInput.module.css'

const RegularInput = ({event, type, value}) => {

    return (
        <>
            <input type={type} className={styles.input} onChange={event} value={value}/>
        </>
    );
}

export default RegularInput