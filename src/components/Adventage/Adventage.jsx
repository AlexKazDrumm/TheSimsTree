import React from "react";
import styles from './Adventage.module.css'
import RoundedIcon from "../UI/RoundedIcon/RoundedIcon";

const Adventage = ({img, text, color}) => {

    return (
        <div className={styles.item}>
            <div className={styles.imgBlock}>
                <RoundedIcon img={img} color={color} />
            </div> 
            <div className={styles.descriptionBlock}>
                <span>
                    {text}
                </span>
            </div>
        </div>
    )
}

export default Adventage