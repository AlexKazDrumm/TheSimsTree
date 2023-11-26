import React from "react"
import styles from './FormPair.module.css'
import RegularInput from "../UI/RegularInput/RegularInput";
import RegularTextarea from  "../UI/RegularTextarea/RegularTextarea";

const FormPair = ({label, event, type, value, element, error}) => {
    return (
        <div className={styles.formPair}>
            <span className={styles.label}>{label}</span>
            {element == 'input' && <RegularInput type={type} event={event} value={value}/>}
            {element == 'textarea' && <RegularTextarea type={type} event={event} value={value}/>}
            {error &&
                <div className={styles.errorBlock}>
                    <span className={styles.error}>{error?error:null}</span>
                </div>
            }
        </div>
    );
}

export default FormPair