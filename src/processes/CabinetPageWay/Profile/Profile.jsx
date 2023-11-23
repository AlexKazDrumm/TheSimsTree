import React, { useState, useRef, useEffect } from "react";
import AvatarEditor from 'react-avatar-editor';
import styles from './Profile.module.css'
import RegularButton from '../../../components/UI/RegularButton/RegularButton'
import CabinetInput from "../../../components/UI/CabinetInput/CabinetInput";
import TitleBlock from '../../../components/UI/TitleBlock/TitleBlock'
import InfoModal from "../../../components/Modals/InfoModal/InfoModal";
import ChangeEmailModal from "../../../components/Modals/ChangeEmailModal/ChangeEmailModal";
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
    const [infoModalVisible, setInfoModalVisible] = useState(false)
    const [changeEmailModalVisible, setChangeEmailModalVisible] = useState(false)

    const [infoTitle, setInfoTitle] = useState('')
    const [infoText, setInfoText] = useState('')

    const [image, setImage] = useState(null);
    const [editor, setEditor] = useState(null);
    const [showEditorModal, setShowEditorModal] = useState(false);
    const [scale, setScale] = useState(1);
    const [borderRadius, setBorderRadius] = useState(0);

    const handleNewImage = e => {
        setImage(e.target.files[0]);
        setShowEditorModal(true); // Открыть модальное окно редактора
    };

    const setEditorRef = editor => setEditor(editor);

    const handleAvatarUpload = async () => {
        if (editor) {
            const canvasScaled = editor.getImageScaledToCanvas();
            canvasScaled.toBlob(async (blob) => {
                const token = localStorage.getItem('authToken');
                await updateAvatar(token, blob);
                setShowEditorModal(false);
                setImage(null); // Очистить выбранное изображение после загрузки
            });
        }
    };

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
        };
        
        const isUpdated = await updateUserData(token, updatedUserData);
    
        if (isUpdated) {
            setInfoTitle('Поздравляем!');
            setInfoText('Ваши изменения успешно сохранены.');
            setInfoModalVisible(true);
        } else {
            // Обработка неудачного обновления данных
            // Например, отображение сообщения об ошибке
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
            {showEditorModal && (
                <div className={styles.editorModal}>
                    <AvatarEditor 
                        ref={setEditorRef}
                        image={image}
                        width={250}
                        height={250}
                        border={50}
                        borderRadius={borderRadius}
                        color={[255, 255, 255, 0.6]} // RGBA
                        scale={scale}
                    />
                    <div>
                        <label>Масштаб: </label>
                        <input type="range" min="1" max="2" step="0.01" value={scale} onChange={(e) => setScale(parseFloat(e.target.value))} />
                    </div>
                    <div style={{marginBottom: '15px'}}>
                        <label>Скругление: </label>
                        <input type="range" min="0" max="125" value={borderRadius} onChange={(e) => setBorderRadius(parseInt(e.target.value, 10))} />
                    </div>
                    <RegularButton 
                        type='grey' 
                        text='Сохранить' 
                        event={handleAvatarUpload}
                    />
                </div>
            )}
            {changePasswordModalVisible && <ChangePasswordModal changePasswordModalVisible={changePasswordModalVisible} setChangePasswordModalVisible={setChangePasswordModalVisible}/>}
            {deleteProfileModalVisible && <DeleteProfileModal deleteProfileModalVisible={deleteProfileModalVisible} setDeleteProfileModalVisible={setDeleteProfileModalVisible} />}
            {infoModalVisible && <InfoModal title={infoTitle} text={infoText} infoModalVisible={infoModalVisible} setInfoModalVisible={setInfoModalVisible} /> }
            {changeEmailModalVisible && <ChangeEmailModal changeEmailModalVisible={changeEmailModalVisible} setChangeEmailModalVisible={setChangeEmailModalVisible}/>}
            <div className={styles.marginWrapper}>
                <TitleBlock text='Личный кабинет' />
            </div>
            <div className={styles.marginWrapper}>
                <div className={styles.logoBlock}>
                    <div className={styles.avatar}>
                        {user?.avatar ? 
                                <img src={`${globals.productionServerDomain}/file/${user.avatar}`} alt="Avatar" onError={(e)=>{ e.target.onerror = null; e.target.src='./svg/user_master_avatar.svg'; }} /> :
                                <img src='./svg/user_master_avatar.svg' alt="Default Avatar" />
                        }
                    </div>
                    <div className={styles.buttons}>
                    <input 
                    type="file" 
                    onChange={handleNewImage}
                    style={{ display: 'none' }}
                    ref={fileInputRef}
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
                    <CabinetInput type="text" value={login} event={handleLoginChange} />
                </div>
                <div className={styles.spanLabel}>Имя</div>
                <div className={styles.inputWrapper}>
                    <CabinetInput type="text" value={name} event={handleNameChange} />
                </div>
                <div className={styles.spanLabel}>Фамилия</div>
                <div className={styles.inputWrapper}>
                    <CabinetInput type="text" value={surname} event={handleSurnameChange} />
                </div>
                <div className={styles.spanLabel}>Почта</div>
                <div className={styles.inputWrapper}>
                    <CabinetInput type="email" value={email} event={handleEmailChange} disabled={true}/>
                </div>
                <span className={styles.linkButton} onClick={() => setChangeEmailModalVisible(true)}>
                    Сменить почту
                </span>
            </div>
            <div className={styles.bottomButtons}>
                <div className={styles.leftBlock}>
                    <span className={styles.linkButton} onClick={() => setChangePasswordModalVisible(true)}>
                        Сменить пароль
                    </span>
                    <span className={styles.linkButton} onClick={() => setDeleteProfileModalVisible(true)}>
                        Удалить профиль
                    </span>
                </div>
                <RegularButton type='grey' text='Сохранить' event={handleUpdateUserData} />
            </div>        
        </div>
    )
}

export default Profile