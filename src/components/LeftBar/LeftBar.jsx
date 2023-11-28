import React, {useState} from 'react';
import styles from './LeftBar.module.css'
import LeftSelecter from '../../components/UI/LeftSelecter/LeftSelecter'
import { useRouter } from 'next/router';
import globals from '../../globals';
import SupportModal from '../Modals/SupportModal/SupportModal';

const LeftBar = ({ selectedComponent, setSelectedComponent, setLeftMenuClick, user }) => {
  const [slimMode, setSlimMode] = useState(false)
  const [supportModalVisible, setSupportModalVisible] = useState(false)
  
  const formStyle = {
    flex: slimMode ? "0 0 5%" : "0 0 24.2%",
    height: '100vh', // Установка высоты в 100% видимой части экрана
    position: 'sticky', // Зафиксировать позицию
    top: 0 // Закрепить сверху
  }

  const router = useRouter();

  return (
    <div className={styles.bar} style={formStyle}>
      {supportModalVisible && 
        <SupportModal 
          supportModalVisible={supportModalVisible} 
          setSupportModalVisible={setSupportModalVisible} 
        />
      }
      <div className={styles.container} style={slimMode ? {padding: '32px 6px 16px 6px'} : {padding: '30px 28px 16px 39px'}}>
        <div className={styles.wrapper}>
          <div className={styles.topBlock}>
            <div className={styles.ownerMData} style={slimMode?{justifyContent: 'center', marginBottom: '25px'}:{justifyContent: 'flex-start', marginBottom: '31px'}}> 
              <div className={styles.avatar} style={slimMode?{marginRight:'0px'}:{marginRight:'14px'}}>
                {user?.avatar ? 
                  <img 
                    onError={(e)=>{ e.target.onerror = null; e.target.src='./svg/user_master_avatar.svg'; }}  
                    src={`${globals.productionServerDomain}/file/${user.avatar}`} 
                    style={slimMode?{width: '50px', height: '50px'}:{width: '70px', height: '70px'}}
                  />:
                  <img 
                    src='./svg/user_master_avatar.svg' 
                    style={slimMode?{width: '50px', height: '50px'}:{width: '70px', height: '70px'}}
                  />
                }
              </div>
              {
                !slimMode &&
                <div className={styles.name}>
                  <span className={styles.user}>Сул-сул, <b>{user?.login}</b></span>
                </div>
              }
              
            </div>
            <LeftSelecter 
              selectedComponent={selectedComponent} 
              event={()=>{
                setSelectedComponent(2)
                router.push('/cabinet?option=2')
                setLeftMenuClick(true)
              }} 
              icon={'/svg/gem_blue.svg'} 
              alt={'Main'} 
              text={'Главная'} 
              order={2}
              slimMode={slimMode}
            />
            <div style={slimMode?{marginBottom: '0px'}:{marginBottom: '6px'}}></div>
            <LeftSelecter 
              selectedComponent={selectedComponent} 
              event={()=>{
                setSelectedComponent(1)
                router.push('/cabinet?option=1')           
              }} 
              icon={'/svg/user.svg'} 
              alt={'Profile'} 
              text={'Профиль'}  
              order={1}
              slimMode={slimMode}
            />
            <div style={slimMode?{marginBottom: '0px'}:{marginBottom: '6px'}}></div>
            <LeftSelecter 
              selectedComponent={selectedComponent} 
              event={()=>{
                setSelectedComponent(3)
                router.push('/cabinet?option=3')          
              }} 
              icon={'/svg/service-worker-blue.svg'} 
              alt={'Instructions'} 
              text={'Инструкции'}  
              order={3}
              slimMode={slimMode}
            />
            <div style={slimMode?{marginBottom: '0px'}:{marginBottom: '6px'}}></div>
            <LeftSelecter 
              selectedComponent={selectedComponent} 
              event={()=>{
                setSelectedComponent(4)
                setLeftMenuClick(true)
                router.push('/cabinet?option=4')
              }} 
              icon={'/svg/create_tree_v3.svg'} 
              alt={'Create Tree'} 
              text={'Создать древо'}  
              order={4}
              slimMode={slimMode}
            />
            <div style={slimMode?{marginBottom: '0px'}:{marginBottom: '6px'}}></div>
            <LeftSelecter 
              selectedComponent={selectedComponent} 
              event={()=>{
                setSelectedComponent(5)
                setLeftMenuClick(true)
                router.push('/cabinet?option=5')
              }} 
              icon={'/svg/plumtreeapp_tree_v2.svg'} 
              alt={'Upload Tree'} 
              text={'Загрузить с PlumTree'}  
              order={5}
              slimMode={slimMode}
            />
            <div style={slimMode?{marginBottom: '0px'}:{marginBottom: '6px'}}></div>
            <LeftSelecter 
              selectedComponent={selectedComponent} 
              event={()=>{
                setSelectedComponent(6)
                setLeftMenuClick(true)
                router.push('/cabinet?option=6')
              }} 
              icon={'/svg/my_trees.svg'} 
              alt={'My Trees'} 
              text={'Мои древа'}  
              order={6}
              slimMode={slimMode}
            />
            <div style={slimMode?{marginBottom: '0px'}:{marginBottom: '6px'}}></div>
            <LeftSelecter 
              selectedComponent={selectedComponent} 
              event={()=>{
                setSelectedComponent(7)
                localStorage.removeItem('authToken');
                router.push('/')
              }} 
              icon={'/svg/door_blue.svg'} 
              alt={'Logout'} 
              text={'Выйти'}  
              order={7}
              slimMode={slimMode}
            />
          </div>
        </div>
        <div className={styles.wrapper} style={slimMode ? {padding: '0px 12px 0px 12px'} : {padding: '0px 32px 23px 32px'}}>
          <div className={styles.equipmentBlock}>
            {/* {!slimMode &&
              <div className={styles.title}>Поддержка</div>
            } */}
            
                <div className={styles.images}  style={slimMode ? {flexDirection: 'column'} : {flexDirection: 'row'}}>
                  <a style={{cursor: 'pointer'}} onClick={() => {setSupportModalVisible(true)}}>
                    <img src='./svg/help_blue.svg' style={slimMode ? {marginRight: '0px'} : {marginRight: '32px'} }/>
                  </a>
                  <a href="https://vk.com/thedynastytree" target="_blank" rel="noopener noreferrer">
                    <img src='./svg/vk_blue.svg' style={slimMode ? {marginRight: '0px'} : {marginRight: '32px'} }/>
                  </a>
                  <a href="https://t.me/dynastytree" target="_blank" rel="noopener noreferrer">
                    <img src='./svg/telegram_blue.svg' alt="Telegram Icon" style={slimMode ? {marginRight: '0px'} : {marginRight: '32px'} }/>
                  </a>
                </div>
          </div>
        </div>
      </div>
      <div className={styles.chevrones}>
        {slimMode ?
        <img src='/svg/chevron_right.svg' onClick={() => {setSlimMode(false)}} />:
        <img src='/svg/chevron_left.svg' onClick={() => {setSlimMode(true)}} />
      }
      </div>
    </div>
  );
};

export default LeftBar;