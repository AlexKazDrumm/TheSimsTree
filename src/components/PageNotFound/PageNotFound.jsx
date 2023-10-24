import React from "react";
import styles from './PageNotFound.module.css'

const PageNotFound = () => {

    return (
        <div className={styles.container}>
            <div className={styles.titleRow}>
                <span className={styles.title}>Данная страница находится в разработке. Уже скоро мы покажем её Вам!</span>
            </div>
        </div>
    )
}

export default PageNotFound