import React from "react";
import styles from './PlumTrees.module.css'
import TitleBlock from "../../../components/UI/TitleBlock/TitleBlock";

const PlumTrees = () => {

    return (
        <div className={styles.container}>
            <div className={styles.marginWrapper}>
                <TitleBlock text='Загрузить с PlumTree' />
            </div>
        </div>
    )
}

export default PlumTrees