import React from "react";
import styles from './MyTrees.module.css'
import TitleBlock from "../../../components/UI/TitleBlock/TitleBlock";

const MyTrees = () => {

    return(
        <div className={styles.container}>
            <div className={styles.marginWrapper}>
                <TitleBlock text='Мои древа' />
            </div>
        </div>
    )
}

export default MyTrees