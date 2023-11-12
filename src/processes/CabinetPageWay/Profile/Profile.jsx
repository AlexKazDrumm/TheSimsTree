import React, { useState } from "react";
import styles from './Profile.module.css'
import RegularButton from '../../../components/UI/RegularButton/RegularButton'

const Profile = () => {
    const [editMode, setEditMode] = useState(false);

    const formStyle = {
        borderBottom: `2px solid #285471`
    }

    return(
        <div className={styles.component}>
            <div className={styles.titleRow}>
                <span className={styles.profileTitle}>Личный кабинет</span>
                <div className={styles.topButtons}>
                {editMode ? (
                        <RegularButton text={'Сохранить'} type={'grey'}/>
                        ) : (
                        <RegularButton text={'Редактировать'} type={'grey'} />
                        )}
                </div>
            </div>

            <div className={styles.logoBlock}>
                <img src='/svg/user.svg' alt="company logo" />
                <input 
                    type="file" 
                    id="logo-upload" 
                    style={{display: 'none'}} 
                />
                <RegularButton text={'Загрузить аватар'} type={'grey'} />
            </div>

            <div className={styles.mainInfoBlock}>
                <div className={styles.infoPair}>
                    <span className={styles.valueTitle}>Логин</span>
                    <input
                        type="text"
                        value='Agarey'
                        disabled={!editMode}
                        className={styles.valueForm}
                        style={formStyle}
                    />
                </div>
                <div className={styles.infoPair}>
                    <span className={styles.valueTitle}>Имя</span>
                    <input
                        type="text"
                        value='Alex'
                        disabled={!editMode}
                        className={styles.valueForm}
                        style={formStyle}
                    />
                </div>
                <div className={styles.infoPair}>
                    <span className={styles.valueTitle}>Фамилия</span>
                    <input
                        type="text"
                        value='Drumm'
                        disabled={!editMode}
                        className={styles.valueForm}
                        style={formStyle}
                    />
                </div>
                <div className={styles.infoPair}>
                    <span className={styles.valueTitle}>Почта</span>
                    <input
                        type="text"
                        value='alexdrumm13@gmail.com'
                        disabled={!editMode}
                        className={styles.valueForm}
                        style={formStyle}
                    />
                </div>
                <div className={styles.infoPair}>
                    <span className={styles.valueTitle}>Пароль</span>
                    <input
                        type="password"
                        value='Agarey'
                        disabled={!editMode}
                        className={styles.valueForm}
                        style={formStyle}
                    />
                </div>
            </div>
        </div>
    )
}

export default Profile