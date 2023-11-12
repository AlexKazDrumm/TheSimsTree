import React from 'react';
import styles from './LeftBar.module.css'
import LeftSelecter from '../../components/UI/LeftSelecter/LeftSelecter'
// import { handleLogout } from '../../features/features';
// import { useNavigate } from 'react-router-dom';

const LeftBar = ({ selectedComponent, setSelectedComponent, setLeftMenuClick }) => {
//   const navigate = useNavigate();
  const handleLogoutClick = () => {
    // handleLogout(navigate);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.topBlock}>
          <div className={styles.ownerMData}>
            <div className={styles.avatar}>
              <img src='./assets/user_default3.png' alt="Profile Icon" />
            </div>
            <div className={styles.name}>
              <span className={styles.user}>Александр</span>
            </div>
          </div>
          <LeftSelecter 
            selectedComponent={selectedComponent} 
            event={()=>{
              setSelectedComponent(1)
              setLeftMenuClick(true)
            }} 
            icon={'/svg/gem_blue.svg'} 
            alt={'Main'} 
            text={'Главная'} 
            order={1}
          />
          <LeftSelecter 
            selectedComponent={selectedComponent} 
            event={()=>{
              setSelectedComponent(2)
              setLeftMenuClick(true)
            //   navigate('/cabinet?step=2');
            }} 
            icon={'/svg/my_trees.svg'} 
            alt={'Rent'} 
            text={'Мои деревья'} 
            order={2}
          />
          <LeftSelecter 
            selectedComponent={selectedComponent} 
            event={()=>{
              setSelectedComponent(3)
              setLeftMenuClick(true)
            //   navigate('/cabinet?step=3');
            }} 
            icon={'/svg/create_tree.svg'} 
            alt={'Mail'} 
            text={'Создать древо'}  
            order={3}
          />
          <LeftSelecter 
            selectedComponent={selectedComponent} 
            event={()=>{
              setSelectedComponent(4)
            //   navigate('/cabinet?step=5');            
            }} 
            icon={'/svg/user.svg'} 
            alt={'History'} 
            text={'Профиль'}  
            order={4}
          />
          <LeftSelecter 
            selectedComponent={selectedComponent} 
            event={()=>{
              setSelectedComponent(6)
            //   navigate('/cabinet?step=6');
            }} 
            icon={'/svg/door_blue.svg'} 
            alt={'Notifications'} 
            text={'Выйти'}  
            order={6}
          />
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.equipmentBlock}>
          <div className={styles.title}>Поддержка</div>
            <LeftSelecter 
              selectedComponent={selectedComponent} 
              event={() => copyToClipboard("example@mail.com", 'mail')}
              icon={'/svg/help_blue.svg'} 
              alt={'Help'} 
              text={'help@mail.ru'}  
              order={9}
            />
          <LeftSelecter 
            selectedComponent={selectedComponent} 
            event={() => copyToClipboard("+77777777777", 'phone')}
            icon={'/svg/contacts_blue.svg'} 
            alt={'Phone'} 
            text={'+79999999999'}  
            order={10}
          />
        </div>
      </div>
    </div>
  );
};

export default LeftBar;