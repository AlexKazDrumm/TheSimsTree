import React, { useRef, useEffect, useState } from "react";
import styles from './SupportModal.module.css';
import CloseButton from "../../UI/CloseButton/CloseButton";
import FormPair from "../../FormPair/FormPair";
import RegularButton from "../../UI/RegularButton/RegularButton";
import { sendFeedback } from "../../../features/features";

const SupportModal = ({supportModalVisible, setSupportModalVisible, alerts, setAlerts}) => {
    const modalRef = useRef(null);

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [imageFile, setImageFile] = useState(null);
    const [imageInfo, setImageInfo] = useState('');

    const [files, setFiles] = useState([]);

    const fileInputRef = useRef()

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleImageChange = (event) => {
        if (event.target.files) {
            const newFiles = Array.from(event.target.files).map(file => ({
                file,
                name: file.name
            }));
            setFiles(prev => [...prev, ...newFiles]); // Добавляем новые файлы в массив
        }
    };

    const handleRemoveFile = (fileName) => {
        setFiles(files.filter(file => file.name !== fileName)); // Удаляем файл из массива
    };

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setSupportModalVisible(false);
        }
    };

    const handleSend = async () => {
        if (!name) {

            return
        }
        if (!email) {

            return
        }
        if (!message) {

            return
        }

        const feedbackSent = await sendFeedback(name, email, message, files);
        if (feedbackSent) {
                // Обработка успешной отправки
        }

        setSupportModalVisible(false);
    }

    return (
        <>
            {supportModalVisible && <div className={styles.modalBackground}></div>}
            <div
                className={styles.modalWrapper}
                style={
                    {
                    ...(supportModalVisible ? { display: "flex" } : { display: "none" }),
                    }
                }
                ref={modalRef}
            >
                <div className={styles.whiteBlock}>
                    <div className={styles.closeBtnRow}>
                        <CloseButton 
                            event={() => {
                                setSupportModalVisible(false)
                            }}
                            img={'./svg/close.svg'}
                        />
                    </div>
                    <div className={styles.formBlock}>
                        <span className={styles.title}>
                            Напиши нам
                        </span>
                        <FormPair label={'Имя'} type={'text'} event={(e) => {setName(e.target.value)}} value={name} element={'input'}/>
                        <FormPair label={'E-mail'} type={'text'} event={(e) => {setEmail(e.target.value)}} value={email} element={'input'} />
                        <FormPair label={'Сообщение'} type={'text'} event={(e) => {setMessage(e.target.value)}} value={message} element={'textarea'} />
                        <div className={styles.sendImageBlock}>
                            <input type="file" multiple onChange={handleImageChange} style={{ display: 'none' }} ref={fileInputRef} />
                            <span className={styles.linkButton} onClick={() => fileInputRef.current && fileInputRef.current.click()}>
                                Загрузить фото
                            </span>
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                            {files.map((file, index) => (
                                <div key={index}>
                                    <span>{file.name}</span>
                                    <span onClick={() => handleRemoveFile(file.name)} style={{color: 'red'}}>X</span>
                                </div>
                            ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.greyBlock}>
                    <div className={styles.buttonWrapper}>
                        <RegularButton 
                            text={'Отправить'}
                            type={'grey'}
                            event={() => {
                                handleSend()
                            }}
                        />  
                    </div>
                </div>
            </div>
        </>
    )
}

export default SupportModal