import React from "react";
import styles from './CabinetInput.module.css'

const CabinetInput = ({event, type, value, disabled, white, width, height, textSize}) => {

    const inputStyles = {
        '--width': `${width}`,
        '--height': `${height}`,
        '--text': `${textSize ? textSize : '16px'}`,
        '--bgcolor': `${white}?#FFF:#EFEFEF`
    };

    return (
        <input style={inputStyles} type={type ? type : 'text'} className={styles.input} onChange={event} value={value} disabled={disabled}/>
    )
}

export default CabinetInput