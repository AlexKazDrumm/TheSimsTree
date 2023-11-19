import React from "react";
import styles from './CreateTree.module.css'
import TitleBlock from "../../../components/UI/TitleBlock/TitleBlock";

const CreateTree = () => {

    return(
        <div className={styles.container}>
            <div className={styles.marginWrapper}>
                <TitleBlock text='Название династии' />
            </div>
        </div>
    )
}

export default CreateTree