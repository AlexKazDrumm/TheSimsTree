import React, { useState, useRef, useEffect } from "react";
import AvatarEditor from 'react-avatar-editor';
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

    const updateSingleUserData = async (key, value) => {
        const token = localStorage.getItem('authToken');
        const updatedUserData = {
            login: user.login,
            name: user.name,
            surname: user.surname,
            email: user.email,
            [key]: value,
        };
        
        await updateUserData(token, updatedUserData);
        // Обновление состояния пользователя после запроса
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
            <div className={styles.marginWrapper}>
                <TitleBlock text='Личный кабинет' />
            </div>
            <div className={styles.marginWrapper}>
                <div className={styles.logoBlock}>
                    <div className={styles.avatar}>
                        {user?.avatar ? 
                                <img src={`${globals.productionServerDomain}/file/${user.avatar}`} alt="Avatar" /> :
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
                <div className={styles.table}>
                    <div className={styles.row}>
                        <div className={styles.cell}>
                            <div className={styles.spanLabel}>Логин</div>
                            <div className={styles.inputWrapper}>
                                <RegularInput type="text" value={login} event={handleLoginChange} />
                                {login !== user?.login && (
                                    <img className={styles.mark} src='./svg/mark.svg' onClick={() => updateSingleUserData('login', login)} />
                                )}
                            </div>
                        </div>
                        <div className={styles.cell}>
                            <div className={styles.spanLabel}>Почта</div>
                            <div className={styles.inputWrapper}>
                                <RegularInput type="email" value={email} event={handleEmailChange} />
                                {email !== user?.email && (
                                    <img className={styles.mark} src='./svg/mark.svg' onClick={() => updateSingleUserData('email', email)}/>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.cell}>
                            <div className={styles.spanLabel}>Имя</div>
                            <div className={styles.inputWrapper}>
                                <RegularInput type="text" value={name} event={handleNameChange} />
                                {name !== user?.name && (
                                    <img className={styles.mark} src='./svg/mark.svg' onClick={() => updateSingleUserData('name', name)}/>
                                )}
                            </div>
                        </div>
                        <div className={styles.cell}>
                            <div className={styles.spanLabel}>Фамилия</div>
                            <div className={styles.inputWrapper}>
                                <RegularInput type="text" value={surname} event={handleSurnameChange} />
                                {surname !== user?.surname && (
                                    <img className={styles.mark} src='./svg/mark.svg' onClick={() => updateSingleUserData('surname', surname)}/>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={styles.row}>
                    <div className={styles.cell}>
                        <div className={styles.linkButtonContainer}>
                            <span className={styles.linkButton} onClick={() => setChangePasswordModalVisible(true)}>
                                Сменить пароль
                            </span>
                        </div>
                    </div>
                    <div className={styles.cell}>
                        <div className={styles.linkButtonContainer}>
                            <span className={styles.linkButton} onClick={() => setDeleteProfileModalVisible(true)}>
                                Удалить профиль
                            </span>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile