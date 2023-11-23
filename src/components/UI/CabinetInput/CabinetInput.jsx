import React from "react";
import styles from './CabinetInput.module.css'

const CabinetInput = ({event, type, value, disabled, white}) => {

    return (
        <input style={white?{background: '#FFF'}:{background: '#EFEFEF'}} type={type ? type : 'text'} className={styles.input} onChange={event} value={value} disabled={disabled}/>
    )
}

export default CabinetInput