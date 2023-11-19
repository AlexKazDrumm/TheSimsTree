import React, { useState, useRef, useEffect } from "react";
import styles from './Profile.module.css'
import RegularButton from '../../../components/UI/RegularButton/RegularButton'
import TitleBlock from '../../../components/UI/TitleBlock/TitleBlock'
import RegularInput from "../../../components/UI/RegularInput/RegularInput";
import { updateAvatar, deleteAvatar, updateUserData } from "../../../features/features";
import globals from "../../../globals";
import ChangePasswordModal from "../../../components/Modals/ChangePasswordModal/ChangePasswordModal";
import DeleteProfileModal from "../../../components/Modals/DeleteProfileModal/DeleteProfileModal"

const Profile = ({user}) => {
    const [login, setLogin] = useState(user?.login)
    const [name, setName] = useState(user?.name)
    const [surname, setSurname] = useState(user?.surname)
    const [email, setEmail] = useState(user?.email)
    const [changePasswordModalVisible, setChangePasswordModalVisible] = useState(false)
    const [deleteProfileModalVisible, setDeleteProfileModalVisible] = useState(false)

    useEffect(() => {
        if (user) {
            setLogin(user.login);
            setName(user.name);
            setSurname(user.surname);
            setEmail(user.email);
        }
    }, [user]);

    console.log({user, login, name, surname, email})

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

    const handleAvatarDelete = async () => {
        const token = localStorage.getItem('authToken');
        
        if (await deleteAvatar(token)) {
            // Обновите состояние для отображения изменений
            // Например, можно обновить состояние пользователя или перезагрузить страницу
        }
    };

    const handleUpdateUserData = async () => {
        const token = localStorage.getItem('authToken');
        const updatedUserData = {
            login,
            name,
            surname,
            email,
        };
        
        if (await updateUserData(token, updatedUserData)) {
            // Можно обновить состояние пользователя или перезагрузить страницу
            // чтобы отразить обновленные данные
        }
    };

    const handleLoginChange = (event) => {
        setLogin(event.target.value);
    };
    
    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    
    const handleSurnameChange = (event) => {
        setSurname(event.target.value);
    };
    
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    return(
        <div className={styles.component}>
            {changePasswordModalVisible && <ChangePasswordModal changePasswordModalVisible={changePasswordModalVisible} setChangePasswordModalVisible={setChangePasswordModalVisible}/>}
            {deleteProfileModalVisible && <DeleteProfileModal deleteProfileModalVisible={deleteProfileModalVisible} setDeleteProfileModalVisible={setDeleteProfileModalVisible} />}
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
                        <RegularButton type='grey' text='Удалить' event={handleAvatarDelete} />
                    </div>
                </div>
            </div>
            <div className={styles.marginWrapper}>
                <div className={styles.spanLabel}>Логин</div>
                <div className={styles.inputWrapper}>
                    <RegularInput type="text" value={login} event={handleLoginChange} />
                </div>
                <div className={styles.spanLabel}>Имя</div>
                <div className={styles.inputWrapper}>
                    <RegularInput type="text" value={name} event={handleNameChange} />
                </div>
                <div className={styles.spanLabel}>Фамилия</div>
                <div className={styles.inputWrapper}>
                    <RegularInput type="text" value={surname} event={handleSurnameChange} />
                </div>
                <div className={styles.spanLabel}>Почта</div>
                <div className={styles.inputWrapper}>
                    <RegularInput type="email" value={email} event={handleEmailChange} />
                </div>
                <RegularButton type='grey' text='Сохранить' event={handleUpdateUserData} />
            </div>
            <div className={styles.inputWrapper}>
                <span className={styles.linkButton} onClick={() => setChangePasswordModalVisible(true)}>
                    Сменить пароль
                </span>
                <span className={styles.linkButton} onClick={() => setDeleteProfileModalVisible(true)}>
                    Удалить профиль
                </span>
            </div>
        </div>
    )
}

export default Profile