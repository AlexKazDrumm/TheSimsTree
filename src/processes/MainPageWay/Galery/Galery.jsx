import React, { useState } from "react";
import styles from './Galery.module.css'
import CloseButton from "../../../components/UI/CloseButton/CloseButton";
import { PublishedTrees } from "../../../entities/lists/PublishedTrees";
import { PopularHashtags } from "../../../entities/lists/PopularHashtags";
import { filterTrees, sortTrees } from "../../../utils/utils";

const Galery = () => {
    const [filter, setFilter] = useState("");
    const [searchText, setSearchText] = useState("");
    const [sortType, setSortType] = useState("");
    const [likedTrees, setLikedTrees] = useState({});

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleSortChange = (e) => {
        setSortType(e.target.value);
    };

    const handleLike = (userName) => {
        setLikedTrees(prev => ({
            ...prev,
            [userName]: !prev[userName],
        }));
    };

    const filteredAndSortedTrees = sortTrees(sortType, filterTrees(filter, searchText, PublishedTrees));

    return (
        <div className={styles.container}>
            <div className={styles.searchRow}>
                <div className={styles.topText}>Просматривайте деревья, созданные другими игроками!</div>
                <div className={styles.search}>
                    <select className={styles.customSelect} onChange={handleFilterChange}>
                        <option value="">Название династии</option>
                        <option value="category1">Хэштег</option>
                        <option value="category2">Никнейм</option>
                    </select>
                    <input
                        placeholder='Поиск по слову'
                        className={styles.customInput}
                        value={searchText}
                        onChange={handleSearchChange}
                    />
                    {(searchText || filter) && <span 
                        onClick={() => {
                            setSearchText('')
                            setFilter('')
                        }}
                        style={{marginLeft: '10px'}}
                    >
                        X
                    </span>}
                </div>
                <div className={styles.hashtagsRow}>
                    Популярные хэштеги: {PopularHashtags?.map((hashtag, id) => 
                        <span className={styles.hashtag} onClick={() => {
                            setFilter("category1")
                            setSearchText(hashtag.text)
                        }}>
                            #{hashtag.text}{PopularHashtags.length == id + 1 ? null : ','}{' '}
                        </span>
                    )}
                </div>
            </div>
            <div className={styles.miniaturesRow}>
                {/* <div className={styles.filtersRow}>
                    <span className={styles.radioTitle}>
                        Сортировка:
                    </span>
                    <div className={styles.radioRow}>
                        <input type="radio" id="radio1" name="radio" value="" onChange={handleSortChange} />
                        <label htmlFor="radio1">По умолчанию</label>
                    </div>
                    <div className={styles.radioRow}>
                        <input type="radio" id="radio2" name="radio" value="likes" onChange={handleSortChange} />
                        <label htmlFor="radio2">Самое популярное</label>
                    </div>
                    <div className={styles.radioRow}>
                        <input type="radio" id="radio3" name="radio" value="title" onChange={handleSortChange} />
                        <label htmlFor="radio3">По названию</label>
                    </div>
                    <div className={styles.radioRow}>
                        <input type="radio" id="radio4" name="radio" value="author" onChange={handleSortChange} />
                        <label htmlFor="radio4">По имени автора</label>
                    </div>
                </div> */}
                <div className={styles.miniatures}>
                    {filteredAndSortedTrees.length ? filteredAndSortedTrees.map(tree => (
                        <div className={styles.miniature} key={tree.userName}>
                            <div className={styles.userRow}>
                                {tree.userName == 'CosmicCrest' ?
                                    <img className={styles.logo} style={{width: '24px', marginLeft: '3px', marginTop: '3px'}} src='/images/user.png' />
                                :
                                    <img className={styles.logo} src='/svg/user.svg' />
                                }
                                <span className={styles.userName}>{tree.userName}</span>
                            </div>
                            <img className={styles.miniatureCover} src={tree.coverImage} />
                            <div className={styles.bottomRow}>
                                <div className={styles.titlesBlock}>
                                    <span className={styles.title}>{tree.treeTitle}</span>
                                    <span className={styles.hashtags}>{tree.hashtags}</span>
                                </div>
                                <div className={styles.buttonsBlock}>
                                    <div className={styles.button} onClick={() => handleLike(tree.userName)}>
                                        <CloseButton img={likedTrees[tree.userName] ? '/svg/heart_selected.svg' : '/svg/heart.svg'} />
                                        <span className={styles.counter}>{likedTrees[tree.userName] ? tree.likes + 1 : tree.likes}</span>
                                    </div>
                                    {/* <div className={styles.button}>
                                        <CloseButton img={'/svg/download.svg'} />
                                        <span className={styles.counter}>{tree.downloads}</span>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    )) : <div className={styles.noResults}>Деревья по вашему запросу не найдены.</div>}
                </div>
            </div>
        </div>
    )
}

export default Galery