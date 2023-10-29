import React from "react";
import styles from './AdvantagesBlock.module.css'
import Adventage from "../Adventage/Adventage";

const AdvantagesBlock = () => {
    
    return (
        <div className={styles.container}>
            <div className={styles.advantages}>
                {/* <div className={styles.titleBlock}>
                    <span className={styles.title}>
                        Особенности нашего сервиса
                    </span>
                </div> */}
                <div className={styles.listBlock}>
                    <Adventage 
                        img={'/svg/tree.svg'} 
                        text={'Создай древо династии ваших любимых персонажей с подробным описанием каждого члена семьи и взаимоотношений'} 
                        color={'#78DC18'}
                    />
                    <Adventage 
                        img={'/svg/tools.svg'} 
                        text={'Сделай древо таким, как тебе нравится. Выбери понравившийся цвет, фон, а также иконки для своего древа'} 
                        color={'#00bbbb'}
                    />
                    {/* <Adventage 
                        img={'/svg/album.svg'} 
                        text={'В любой момент вспомни, какая была жизнь твоего любимого героя. Просмотри фотографии, сделанные в игре и добавленные в галерею древа в описании каждого сима'} 
                        color={'#fb9800'}
                    /> */}
                    <Adventage 
                        img={'/svg/envelope.svg'} 
                        text={'Поделись ссылкой на свое династическое древо с другими игроками The Sims'} 
                        color={'#dd46bf'}
                    />
                </div>
            </div>
        </div>
    );
}

export default AdvantagesBlock