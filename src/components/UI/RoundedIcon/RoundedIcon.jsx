import React from "react";
import styles from './RoundedIcon.module.css'

const RoundedIcon = ({img, color}) => {

    return (
        <div className={styles.round} style={{backgroundColor: color}}>
            <img src={img} />
        </div>
    );
}

export default RoundedIcon