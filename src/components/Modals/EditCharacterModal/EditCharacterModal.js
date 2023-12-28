import React, { useState } from "react";
import styles from './EditCharacterModal.module.css'
import CloseButton from "../../UI/CloseButton/CloseButton";
import { updateCharacterAvatar, deleteCharacterAvatar } from "../../../features/features";
import globals from "../../../globals";

const EditCharacterModal = ({showEditCharacterModal, setShowEditCharacterModal, character, characters, lifeForms, getCharacters, setSelectedNode}) => {

    const token = localStorage.getItem('authToken');

    const [selectedSection, setSelectedSection] = useState('bio')

    const [name, setName] = useState(character.name)
    const [surname, setSurname] = useState(character.surname)
    const [lifeFormId, setLifeFormId] = useState(character.life_form_id);
    const [genderId, setGenderId] = useState(character.gender_id || 1); // Если gender_id пустой, считаем его равным 1

    console.log({lifeForms})

    const handleUpdateAvatar = async (file) => {
        if (!character || !character.id) {
            alert("Идентификатор персонажа не найден.");
            return;
        }

        // Вызов функции обновления аватара
        const updatedData = await updateCharacterAvatar(token, file, character.id);
        if (updatedData.success) {
            console.log('Аватар успешно обновлен:', updatedData.character);
            setSelectedNode(updatedData.character); // Обновляем информацию о выбранном персонаже
            getCharacters(); // Обновляем список персонажей, если это необходимо
        }
    };

    const handleDeleteAvatar = async () => {
        if (!character || !character.id) {
            alert("Идентификатор персонажа не найден.");
            return;
        }

        // Вызов функции удаления аватара
        const success = await deleteCharacterAvatar(token, character.id);
        if (updatedData.success) {
            console.log('Аватар успешно обновлен:', updatedData.character);
            setSelectedNode(updatedData.character); // Обновляем информацию о выбранном персонаже
            getCharacters(); // Обновляем список персонажей, если это необходимо
        }
    };

    const handleLifeFormChange = (event) => {
        setLifeFormId(event.target.value);
    };

    // Обработчик изменения пола
    const handleGenderChange = (genderId) => {
        setGenderId(genderId);
    };

    // Определяем название формы жизни в зависимости от типа и пола
    const getLifeFormTitle = (lifeForm) => {
        if (lifeForm.type === 'custom') {
            return lifeForm.title;
        } else {
            return genderId === 1 ? lifeForm.male_title : lifeForm.female_title;
        }
    };

    return(
        <>
            {showEditCharacterModal && <div className={styles.modalBackground}></div>}
            <div
                className={styles.modalWrapper}
                style={
                    {
                    ...(showEditCharacterModal ? { display: "flex" } : { display: "none" }),
                    }
                }
            >
                <div className={styles.whiteBlock}>
                    <div className={styles.closeBtnRow}>
                        <CloseButton 
                            event={() => {
                                setShowEditCharacterModal(false)
                            }}
                            img={'./svg/x_blue.svg'}
                        />
                    </div>
                </div>
                <div className={styles.content}>
                    <div className={styles.avatarBlock}>
                        <div className={styles.avatar} style={{backgroundImage: character.photo ? `url(${globals.productionServerDomain}/file/${character.photo})` : 'url("./svg/user_master_avatar.svg")'}}></div>
                        <div className={styles.avatarButtons}>
                            <button onClick={handleDeleteAvatar}>Удалить</button>
                            <input type="file" onChange={(e) => handleUpdateAvatar(e.target.files[0])} style={{display: "none"}} id="avatarUpload" />
                            <label htmlFor="avatarUpload">Обновить</label>
                        </div>
                        <span>{character.name}</span> 
                        <span>{character.surname}</span>
                    </div>
                    <div className={styles.sections}>
                        <div className={styles.section} onClick={() => setSelectedSection('bio')}>
                            Биография
                        </div>
                        <div className={styles.section} onClick={() => setSelectedSection('photo')}>
                            Фотографии
                        </div>
                        <div className={styles.section} onClick={() => setSelectedSection('pets')}>
                            Питомцы
                        </div>
                    </div>
                    <div className={styles.sectionContent}>
                        {selectedSection == 'bio' &&
                            <>
                                <div>
                                   <span>Имя</span>
                                    <input value={name} /> 
                                </div>
                                <div>
                                   <span>Фамилия</span>
                                    <input value={surname} /> 
                                </div>
                                <div>
                                   <span>Форма жизни</span>
                                   <select value={lifeFormId} onChange={handleLifeFormChange}>
                                        {lifeForms.map((lifeForm) => (
                                            <option key={lifeForm.id} value={lifeForm.id}>
                                                {getLifeFormTitle(lifeForm)}
                                            </option>
                                        ))}
                                   </select>
                                </div>
                                <div>
                                    <span>Пол</span>
                                    <label>
                                        <input
                                            type="radio"
                                            name="gender"
                                            checked={genderId === 1}
                                            onChange={() => handleGenderChange(1)}
                                        />
                                        Мужской
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="gender"
                                            checked={genderId === 2}
                                            onChange={() => handleGenderChange(2)}
                                        />
                                        Женский
                                    </label>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditCharacterModal