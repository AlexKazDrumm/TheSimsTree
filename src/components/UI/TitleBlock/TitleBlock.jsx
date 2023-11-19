import React from "react";
import styles from './TitleBlock.module.css'

const TitleBlock = ({text}) => {

    return (
        <div className={styles.titleBlock}>
            {text}
        </div>
    )
}

export default TitleBlock