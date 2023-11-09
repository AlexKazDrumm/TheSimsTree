import { useState, useRef, useEffect } from 'react';
import styles from './Header.module.css'
import RegularButton from '../UI/RegularButton/RegularButton';

const Header = ({isAuth, setIsAuth, setAuthModalVisible, user}) => {

    console.log({isAuth, user})
    
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
        <div className={styles.component}>    
            <div className={styles.imageWrapper}>
                {isAuth 
                    ? 
                        <>
                            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <img 
                                className={styles.userIco}
                                src='./assets/user_default3.png'
                                onClick={() => setIsDropdownVisible(!isDropdownVisible)} 
                            />
                            <span style={{color: 'white'}}>{user.name} <i>{user.login}</i> {user.surname}</span>
                            </div>
                            
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
                                        <div className={styles.link} onClick={() => 
                                            {
                                                setIsAuth(false)
                                                localStorage.removeItem('authToken'); 
                                            }}>
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