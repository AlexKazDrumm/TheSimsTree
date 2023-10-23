import React from "react"
import styles from './CloseButton.module.css'

const CloseButton = ({event, img}) => {

    return (
        <>
            <span
                className={styles.closeBtn}
                onClick={event}
            >
                <img src={img} />
            </span>
        </>
    );
}

export default CloseButton