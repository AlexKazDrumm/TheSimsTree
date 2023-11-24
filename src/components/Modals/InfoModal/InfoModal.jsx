import React, { useRef, useEffect, useState } from "react";
import styles from './InfoModal.module.css';
import CloseButton from "../../UI/CloseButton/CloseButton";
import RegularButton from "../../UI/RegularButton/RegularButton";

const InfoModal = ({img, title, text, infoModalVisible, setInfoModalVisible}) => {
    const modalRef = useRef(null);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setInfoModalVisible(false);
        }
    };

    return (
        <>
            {infoModalVisible && <div className={styles.modalBackground}></div>}
            <div
                className={styles.modalWrapper}
                style={
                    {
                    ...(infoModalVisible ? { display: "flex" } : { display: "none" }),
                    }
                }
                ref={modalRef}
            >
                <div className={styles.whiteBlock}>
                    <div className={styles.closeBtnRow}>
                        <CloseButton 
                            event={() => {
                                setInfoModalVisible(false)
                            }}
                            img={'./svg/x_blue.svg'}
                        />
                    </div>
                    <div className={styles.formBlock}>
                        {img && <div>
                            <img src={img} />
                        </div>}
                        <span className={styles.title}>
                            {title}
                        </span>
                        <span className={styles.subtitle}>
                            {text}
                        </span>
                    </div>
                </div>
                <div className={styles.greyBlock}>
                    <div className={styles.buttonWrapper}>
                        <RegularButton 
                            text={'Отлично!'}
                            type={'grey'}
                            event={() => {
                                setInfoModalVisible(false)
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

export default InfoModal