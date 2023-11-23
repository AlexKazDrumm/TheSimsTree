import React from "react";
import styles from './CabinetInput.module.css'

const CabinetInput = ({event, type, value, disabled}) => {

    return (
        <input type={type ? type : 'text'} className={styles.input} onChange={event} value={value} disabled={disabled}/>
    )
}

export default CabinetInput