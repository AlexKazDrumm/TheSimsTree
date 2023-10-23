import { useState, useRef, useEffect } from 'react';
import styles from './Header.module.css'
import RegularButton from '../UI/RegularButton/RegularButton';

const Header = ({isAuth, setIsAuth, setAuthModalVisible, setSelectedBlock}) => {
    
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownVisible(false);
        }
    };

    return (
        <div className={styles.component} onClick={() => setSelectedBlock(1)}>    
            <div className={styles.imageWrapper}>
                {isAuth 
                    ? 
                        <>
                            <img 
                                className={styles.userIco}
                                src='./assets/user_default3.png'
                                onClick={() => setIsDropdownVisible(!isDropdownVisible)} 
                            />
                            {isDropdownVisible && (
                                <div ref={dropdownRef} className={styles.dropdownMenu}>
                                    <div className={styles.arrow}></div>
                                    <div className={styles.list}>
                                        <div className={styles.link} onClick={() => alert('hi1')}>
                                            <img 
                                                src='./svg/gem.svg'
                                            />
                                            <span>
                                                Профиль
                                            </span>
                                        </div>
                                        <div className={styles.link} onClick={() => setIsAuth(false)}>
                                            <img 
                                                src='./svg/door.svg'
                                            />
                                            <span>
                                                Выйти
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    : 
                        <>
                            <RegularButton 
                                event={() => {
                                    setAuthModalVisible(true)
                                    setIsDropdownVisible(false)
                                }}
                                text={'Вход / Регистрация'}
                                type={'grey'}
                            />
                        </>
                }
                

            </div>
        </div>
    );
}

export default Header;