import React, { useState, useRef } from "react";
import styles from './Profile.module.css'
import RegularButton from '../../../components/UI/RegularButton/RegularButton'
import TitleBlock from '../../../components/UI/TitleBlock/TitleBlock'
import { updateAvatar } from "../../../features/features";
import globals from "../../../globals";

const Profile = ({user}) => {
    const fileInputRef = useRef();

    const handleAvatarUpload = async () => {
        const token = localStorage.getItem('authToken');
        const file = fileInputRef.current.files[0];
        
        if (file) {
            await updateAvatar(token, file);
        } else {
            console.log('Файл не выбран.');
        }
    };

    return(
        <div className={styles.component}>
            <div className={styles.marginWrapper}>
                <TitleBlock text='Личный кабинет' />
            </div>
            <div className={styles.marginWrapper}>
                <div className={styles.logoBlock}>
                    <div className={styles.avatar}>
                        {user?.avatar ? 
                            <img src={`${globals.productionServerDomain}/file/${user.avatar}`} />:
                            <img src='./svg/user_master_avatar.svg' />
                        }
                    </div>
                    <div className={styles.buttons}>
                        <input 
                            ref={fileInputRef} 
                            type="file" 
                            style={{ display: 'none' }} 
                            onChange={handleAvatarUpload}
                        />
                        <RegularButton 
                            type='grey' 
                            text='Загрузить' 
                            event={() => fileInputRef.current && fileInputRef.current.click()}
                        />
                        <RegularButton type='grey' text='Удалить' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile