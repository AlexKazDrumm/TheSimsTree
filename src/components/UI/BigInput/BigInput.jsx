import React from "react";
import styles from './BigInput.module.css'

const BigInput = ({event, type, value, disabled}) => {

    return (
        <input type={type ? type : 'text'} className={styles.input} onChange={event} value={value} disabled={disabled}/>
    )
}

export default BigInput