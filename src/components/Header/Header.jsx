import { useState, useRef, useEffect } from 'react';
import styles from './Header.module.css'
import RegularButton from '../UI/RegularButton/RegularButton';
import { useRouter } from 'next/router';
import globals from '../../globals';

const Header = ({isAuth, setIsAuth, setAuthModalVisible, user}) => {

    console.log({isAuth, user})

    const router = useRouter();
    
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
                                src={user?.avatar ? `${globals.productionServerDomain}/file/${user.avatar}` : './svg/user_master_avatar.svg'}
                                onClick={() => setIsDropdownVisible(!isDropdownVisible)} 
                            />
                            {/* <span style={{color: 'white'}}>{user?.login}</span> */}
                            <RegularButton text='Редактор древа' type='grey' event={() => {
                                    router.push('/cabinet?option=4')
                            }}/>
                            </div>
                            
                            {isDropdownVisible && (
                                <div ref={dropdownRef} className={styles.dropdownMenu}>
                                    <div className={styles.arrow}></div>
                                    <div className={styles.list}>
                                        <div 
                                            className={styles.link}
                                            onClick={() => {
                                                router.push('/cabinet?option=1')
                                            }}
                                        >
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