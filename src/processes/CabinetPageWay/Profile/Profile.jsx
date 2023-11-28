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
import CloseButton from "../../../components/UI/CloseButton/CloseButton";

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

    const [isModified, setIsModified] = useState(false);

    const modalRef = useRef(null);

    useEffect(() => {
        if (user) {
            setLogin(user.login);
            setName(user.name);
            setSurname(user.surname);
            setEmail(user.email);
        }
    }, [user]);

    useEffect(() => {
        // Проверяем, изменились ли значения
        setIsModified(
            login !== user?.login || 
            name !== user?.name || 
            surname !== user?.surname
        );
    }, [login, name, surname, user]);

    const handleNewImage = e => {
        setImage(e.target.files[0]);
        setShowEditorModal(true); // Открыть модальное окно редактора
        e.target.value = null; // Сбросить значение input
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

    // console.log({user, login, name, surname, email})

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

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setShowEditorModal(false);
            }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [modalRef, setShowEditorModal]);

    return(
        <div className={styles.component}>
            {showEditorModal && (
                <div
                    className={styles.modalWrapper}
                    ref={modalRef}
                >
                    <div className={styles.whiteBlock}>
                        <div className={styles.closeBtnRow}>
                            <CloseButton 
                                event={() => setShowEditorModal(false)}
                                img={'./svg/x_blue.svg'}
                            />
                        </div>
                        <div className={styles.formBlock}>
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
                        </div>
                    </div>
                    <div className={styles.greyBlock}>
                        <div className={styles.buttonWrapper}>
                            <RegularButton 
                                type='grey' 
                                text='Сохранить' 
                                event={handleAvatarUpload}
                                width={'166px'}
                                height={'28px'}
                            />
                        </div>
                    </div>
                </div>
            )}
            {changePasswordModalVisible && <ChangePasswordModal setInfoModalVisible={setInfoModalVisible} setInfoTitle={setInfoTitle} setInfoText={setInfoText} email={email} changePasswordModalVisible={changePasswordModalVisible} setChangePasswordModalVisible={setChangePasswordModalVisible}/>}
            {deleteProfileModalVisible && <DeleteProfileModal deleteProfileModalVisible={deleteProfileModalVisible} setDeleteProfileModalVisible={setDeleteProfileModalVisible} />}
            {infoModalVisible && <InfoModal title={infoTitle} text={infoText} infoModalVisible={infoModalVisible} setInfoModalVisible={setInfoModalVisible} /> }
            {changeEmailModalVisible && <ChangeEmailModal setInfoModalVisible={setInfoModalVisible} setInfoTitle={setInfoTitle} setInfoText={setInfoText} email={email} changeEmailModalVisible={changeEmailModalVisible} setChangeEmailModalVisible={setChangeEmailModalVisible}/>}
            <div className={styles.marginWrapperTop}>
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
                    width={'166px'}
                    height={'28px'}
                />
                <div style={{marginBottom: '19px'}}></div>
                <RegularButton 
                    type='grey' 
                    text='Удалить' 
                    event={handleAvatarDelete} 
                    width={'166px'}
                    height={'28px'}
                />
                    </div>
                </div>
            </div>
            <div className={styles.marginWrapper}>
                <div className={styles.spanLabel}>Логин</div>
                <div className={styles.inputWrapper}>
                    <CabinetInput type="text" value={login} event={handleLoginChange} width={'290px'} height={'36px'} textSize={'16px'}/>
                </div>
                <div style={{marginBottom: '19px'}}></div>
                <div className={styles.spanLabel}>Имя</div>
                <div className={styles.inputWrapper}>
                    <CabinetInput type="text" value={name} event={handleNameChange} width={'290px'} height={'36px'} textSize={'16px'} />
                </div>
                <div style={{marginBottom: '19px'}}></div>
                <div className={styles.spanLabel}>Фамилия</div>
                <div className={styles.inputWrapper}>
                    <CabinetInput type="text" value={surname} event={handleSurnameChange} width={'290px'} height={'36px'} textSize={'16px'} />
                </div>
                <div style={{marginBottom: '19px'}}></div>
                <div className={styles.spanLabel}>Почта</div>
                <div className={styles.inputWrapper}>
                    <CabinetInput type="email" value={email} event={handleEmailChange} disabled={true} width={'290px'} height={'36px'} textSize={'16px'}/>
                </div>
                <div style={{marginBottom: '5px'}}></div>
                <div className={styles.inputWrapper}>
                    <span className={styles.linkButton} onClick={() => setChangeEmailModalVisible(true)}>
                        Сменить почту
                    </span>
                </div>
            </div>
            <div style={{marginBottom: '50px'}}></div>
            <div className={styles.bottomButtons}>
                <div className={styles.leftBlock}>
                    <span style={{marginRight: '22px'}} className={styles.linkButton} onClick={() => setDeleteProfileModalVisible(true)}>
                        Удалить профиль
                    </span>
                    <RegularButton type='grey' text='Сменить пароль' event={() => setChangePasswordModalVisible(true)} width={'166px'} height={'28px'}/>
                </div>
                <RegularButton type='grey' text='Сохранить' event={handleUpdateUserData} width={'225px'} height={'38px'} disabled={!isModified} textSize={'16px'}/>
            </div>        
        </div>
    )
}

export default Profile