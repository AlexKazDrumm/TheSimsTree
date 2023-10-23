import React, { useState } from "react";
import styles from './NavbarTop.module.css'
import NavLink from "../UI/NavLink/NavLink";

const NavbarTop = ({ setSupportModalVisible, selectedBlock, setSelectedBlock }) => {

    return (
        <div className={styles.container}>
            <div className={styles.links}>
                <NavLink 
                    label="Инструкции" 
                    iconWhite='/svg/service-worker-white.svg' 
                    iconBlue='/svg/service-worker-blue.svg' 
                    isActive={selectedBlock == 2}
                    onClick={() => setSelectedBlock(2)}
                />
                <NavLink 
                    label="Галерея" 
                    iconWhite='/svg/galery_white.svg' 
                    iconBlue='/svg/galery_blue.svg' 
                    isActive={selectedBlock == 3}
                    onClick={() => setSelectedBlock(3)}
                />
                <NavLink 
                    label="Контакты" 
                    iconWhite='/svg/contacts_white.svg' 
                    iconBlue='/svg/contacts_blue.svg' 
                    isActive={selectedBlock == 4}
                    onClick={() => setSelectedBlock(4)}
                />
                <NavLink 
                    label="Донаты" 
                    iconWhite='/svg/donates_white.svg' 
                    iconBlue='/svg/donates_blue.svg' 
                    isActive={selectedBlock == 5}
                    onClick={() => setSelectedBlock(5)}
                />
                <NavLink 
                    label="Поддержка" 
                    iconWhite='/svg/help_white.svg' 
                    iconBlue='/svg/help_blue.svg' 
                    isActive={selectedBlock == 6}
                    onClick={() => {
                        setSelectedBlock(6)
                        setSupportModalVisible(true)
                    }}
                />
            </div>
        </div>
    );
}

export default NavbarTop;