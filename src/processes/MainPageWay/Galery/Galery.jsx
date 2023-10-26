import React from "react";
import styles from './Galery.module.css'
import CloseButton from "../../../components/UI/CloseButton/CloseButton";
import { PublishedTrees } from "../../../entities/lists/PublishedTrees";

const Galery = () => {

    return (
        <div className={styles.container}>
            <div className={styles.searchRow}>
                <div className={styles.topText}>Просматривайте деревья, созданные другими игроками!</div>
                <div className={styles.search}>
                    <select className={styles.customSelect}>
                        <option value="">Название</option>
                        <option value="category1">Хэштег</option>
                        <option value="category2">Юзер</option>
                    </select>
                    <input
                        placeholder='Поиск по слову'
                        className={styles.customInput}
                    />
                </div>
                <div className={styles.hashtagsRow}>
                    Популярные хэштеги: #ThompsonsTimeline, #ThroughTimeWithThompsons, #WebOfWinters, #WintersFamilyTales, #PattersonsPastPresent, #PattersonFamilyTies
                </div>
            </div>
            <div className={styles.miniaturesRow}>
                <div className={styles.filtersRow}>
                    <span className={styles.radioTitle}>
                        Сортировка:
                    </span>
                    <div className={styles.radioRow}>
                        <input type="radio" id="radio1" name="radio" />
                        <label for="radio1">Популярно сейчас</label>
                    </div>
                    <div className={styles.radioRow}>
                        <input type="radio" id="radio2" name="radio" />
                        <label for="radio2">Самое популярное</label>
                    </div>
                    <div className={styles.radioRow}>
                        <input type="radio" id="radio3" name="radio" />
                        <label for="radio3">Новинки</label>
                    </div>
                </div>
                <div className={styles.miniatures}>
                    {PublishedTrees.map(tree => (
                        <div className={styles.miniature} key={tree.userName}>
                            <div className={styles.userRow}>
                                <img className={styles.logo} src='/svg/user.svg' />
                                <span className={styles.userName}>{tree.userName}</span>
                            </div>
                            <img className={styles.miniatureCover} src={tree.coverImage} />
                            <div className={styles.bottomRow}>
                                <div className={styles.titlesBlock}>
                                    <span className={styles.title}>{tree.treeTitle}</span>
                                    <span className={styles.hashtags}>{tree.hashtags}</span>
                                </div>
                                <div className={styles.buttonsBlock}>
                                    <div className={styles.button}>
                                        <CloseButton img={'/svg/heart.svg'} />
                                        <span className={styles.counter}>{tree.likes}</span>
                                    </div>
                                    {/* <div className={styles.button}>
                                        <CloseButton img={'/svg/download.svg'} />
                                        <span className={styles.counter}>{tree.downloads}</span>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
        </div>
    )
}

export default Galery