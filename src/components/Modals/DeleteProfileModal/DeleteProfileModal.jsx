import React, { useRef, useEffect, useState } from "react";
import styles from './DeleteProfileModal.module.css';
import CloseButton from "../../UI/CloseButton/CloseButton";
import RegularButton from "../../UI/RegularButton/RegularButton";
import { deleteUserAccount } from "../../../features/features";
import { useRouter } from 'next/router';

const DeleteProfileModal = ({deleteProfileModalVisible, setDeleteProfileModalVisible}) => {
    const modalRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setDeleteProfileModalVisible(false);
        }
    };

    const handleDelete = async () => {
        const token = localStorage.getItem('authToken');

        if (await deleteUserAccount(token)) {
            localStorage.removeItem('authToken');
            router.push('/')
        }

        setDeleteProfileModalVisible(false);
    };

    return (
        <>
            {deleteProfileModalVisible && <div className={styles.modalBackground}></div>}
            <div
                className={styles.modalWrapper}
                style={
                    {
                    ...(deleteProfileModalVisible ? { display: "flex" } : { display: "none" }),
                    }
                }
                ref={modalRef}
            >
                <div className={styles.whiteBlock}>
                    <div className={styles.closeBtnRow}>
                        <CloseButton 
                            event={() => {
                                setDeleteProfileModalVisible(false)
                            }}
                            img={'./svg/x_blue.svg'}
                        />
                    </div>
                    <div className={styles.formBlock}>
                        <span className={styles.title}>
                            Вы уверены?
                        </span>
                        <span className={styles.subtitle}>
                            Нажав "Удалить профиль", вы потеряете доступ к древу и созданному контенту.
                        </span>
                    </div>
                </div>
                <div className={styles.greyBlock}>
                    <div className={styles.buttonWrapper}>
                        <RegularButton 
                            text={'Удалить профиль'}
                            type={'grey'}
                            event={() => {
                                handleDelete()
                            }}
                            width={'166px'}
                            height={'28px'}
                        />  
                    </div>
                </div>
            </div>
        </>
    )
}

export default DeleteProfileModal