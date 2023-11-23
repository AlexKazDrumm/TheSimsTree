import React from "react";
import styles from './RightBar.module.css'

const RightBar = () => {

    return(
        <div className={styles.container}>
            <div className={styles.group}>
                <div className={styles.up}>
                    <img src='./svg/icon-tree-settings.svg' />
                </div>
                <div className={styles.down}>
                    <img src='./svg/share.svg' />
                </div>
            </div>
            <div className={styles.space}>

            </div>
            <div className={styles.group}>
                <div className={styles.up}>
                    <img src='./svg/free_moving.svg' />
                </div>
                <div className={styles.left}>
                    <img src='./svg/share_left.svg' />
                </div>
                <div className={styles.left}>
                    <img src='./svg/share_right.svg' />
                </div>
                <div className={styles.down}>
                    <img src='./svg/group_reload.svg' /> 
                </div>
            </div>
        </div>
    )
}

export default RightBar