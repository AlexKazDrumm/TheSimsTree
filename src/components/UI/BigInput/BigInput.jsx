import React from "react";
import styles from './BigInput.module.css'

const BigInput = ({ event, type, value, disabled, error, width, height }) => {
    const inputStyles = error ? `${styles.input} ${styles.error}` : styles.input;

    const inputStyle = {
        '--width': `${width}`,
        '--height': `${height}`,
        ...(error ? { borderColor: '#FF7070' } : {})
    };

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <input 
                type={type ? type : 'text'}
                className={inputStyles}
                onChange={event}
                value={value}
                disabled={disabled}
                style={inputStyle}
            />
            {error && <span style={{ color: '#FF7070' }}>{error}</span>}
        </div>
    )
}

export default BigInput;