import { useState, useRef, useEffect } from 'react';
import styles from './Header.module.css'
import RegularButton from '../UI/RegularButton/RegularButton';
import { useRouter } from 'next/router';
import globals from '../../globals';

const Header = ({isAuth, setIsAuth, setAuthModalVisible, user}) => {

    // console.log({isAuth, user})

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
                                src={user?.avatar ? `https://simsdynastytree.online/file/${user.avatar}` : './svg/user_master_avatar.svg'}
                                onError={(e)=>{ e.target.onerror = null; e.target.src='./svg/user_master_avatar.svg'; }} 
                                onClick={() => setIsDropdownVisible(!isDropdownVisible)} 
                            />
                            {/* <span style={{color: 'white'}}>{user?.login}</span> */}
                            <RegularButton 
                                text='Редактор древа' 
                                type='grey' 
                                event={() => {
                                    router.push('/cabinet?option=4')
                                }}
                                width={'250px'}
                                height={'38px'}
                                textSize={'16px'}
                                />
                            </div>
                            
                            {isDropdownVisible && (
                                <div ref={dropdownRef} className={styles.dropdownMenu}>
                                    {/* <div className={styles.arrow}></div> */}
                                    <div className={styles.list}>
                                        <div 
                                            className={styles.link}
                                            onClick={() => {
                                                router.push('/cabinet?option=1')
                                            }}
                                        >
                                            <img 
                                                src='./svg/little_user.svg'
                                                style={{marginRight: '16px'}}
                                            />
                                            <span>
                                                Профиль
                                            </span>
                                        </div>
                                        <div style={{marginBottom: '16px'}}></div>
                                        <div className={styles.link} onClick={() => 
                                            {
                                                setIsAuth(false)
                                                localStorage.removeItem('authToken'); 
                                            }}>
                                            <img 
                                                src='./svg/little_door.svg'
                                                style={{marginRight: '16px'}}
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
                                width={'250px'} 
                                textSize={'16px'}
                                height={'38px'}
                            />
                        </>
                }
                

            </div>
        </div>
    );
}

export default Header;