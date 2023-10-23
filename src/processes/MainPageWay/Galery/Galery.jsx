import React from "react";
import styles from './Galery.module.css'
import CloseButton from "../../../components/UI/CloseButton/CloseButton";

const Galery = () => {

    return (
        <div className={styles.container}>
            <div className={styles.miniatures}>
                <div className={styles.miniature}>
                    <div className={styles.userRow}>
                        <img className={styles.logo} src='/svg/user.svg' />
                        <span className={styles.userName}>Agarey</span>
                    </div>
                    <img className={styles.miniatureCover} src='/images/ex1.png' />
                    <div className={styles.bottomRow}>
                        <div className={styles.titlesBlock}>
                            <span className={styles.title}>Harrington Heritage Line</span>
                            <span className={styles.hashtags}>#HarringtonHeritage, #HistoryOfHarringtons</span>
                        </div>
                        <div className={styles.buttonsBlock}>
                            <div className={styles.button}>
                                <CloseButton 
                                    img={'/svg/heart.svg'}
                                />
                                <span className={styles.counter}>134</span>
                            </div>
                            <div className={styles.button}>
                                <CloseButton 
                                    img={'/svg/download.svg'}
                                />
                                <span className={styles.counter}>12</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.miniature}>
                    <div className={styles.userRow}>
                        <img className={styles.logo} src='/svg/user.svg' />
                        <span className={styles.userName}>CosmicCrest</span>
                    </div>
                    <img className={styles.miniatureCover} src='/images/ex2.jpg' />
                    <div className={styles.bottomRow}>
                        <div className={styles.titlesBlock}>
                            <span className={styles.title}>Thompsons Through Time</span>
                            <span className={styles.hashtags}>#ThompsonsTimeline, #ThroughTimeWithThompsons</span>
                        </div>
                        <div className={styles.buttonsBlock}>
                            <div className={styles.button}>
                                <CloseButton 
                                    img={'/svg/heart.svg'}
                                />
                                <span className={styles.counter}>1</span>
                            </div>
                            <div className={styles.button}>
                                <CloseButton 
                                    img={'/svg/download.svg'}
                                />
                                <span className={styles.counter}>0</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.miniature}>
                    <div className={styles.userRow}>
                        <img className={styles.logo} src='/svg/user.svg' />
                        <span className={styles.userName}>Starshade</span>
                    </div>
                    <img className={styles.miniatureCover} src='/images/ex3.jpg' />
                    <div className={styles.bottomRow}>
                        <div className={styles.titlesBlock}>
                            <span className={styles.title}>Bennett Bloodline Branches</span>
                            <span className={styles.hashtags}>#BennettBranches, #BloodlineOfBennetts</span>
                        </div>
                        <div className={styles.buttonsBlock}>
                            <div className={styles.button}>
                                <CloseButton 
                                    img={'/svg/heart.svg'}
                                />
                                <span className={styles.counter}>32</span>
                            </div>
                            <div className={styles.button}>
                                <CloseButton 
                                    img={'/svg/download.svg'}
                                />
                                <span className={styles.counter}>7</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.miniature}>
                    <div className={styles.userRow}>
                        <img className={styles.logo} src='/svg/user.svg' />
                        <span className={styles.userName}>NeonPulse</span>
                    </div>
                    <img className={styles.miniatureCover} src='/images/ex4.jpg' />
                    <div className={styles.bottomRow}>
                        <div className={styles.titlesBlock}>
                            <span className={styles.title}>Ancestral Andersons</span>
                            <span className={styles.hashtags}>#AndersonAncestry, #RootsOfAndersons</span>
                        </div>
                        <div className={styles.buttonsBlock}>
                            <div className={styles.button}>
                                <CloseButton 
                                    img={'/svg/heart.svg'}
                                />
                                <span className={styles.counter}>264</span>
                            </div>
                            <div className={styles.button}>
                                <CloseButton 
                                    img={'/svg/download.svg'}
                                />
                                <span className={styles.counter}>154</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.miniature}>
                    <div className={styles.userRow}>
                        <img className={styles.logo} src='/svg/user.svg' />
                        <span className={styles.userName}>MysticNebula</span>
                    </div>
                    <img className={styles.miniatureCover} src='/images/ex5.jpg' />
                    <div className={styles.bottomRow}>
                        <div className={styles.titlesBlock}>
                            <span className={styles.title}>Legacy of the Lawsons</span>
                            <span className={styles.hashtags}>#LawsonsLegacy, #LawsonLineage</span>
                        </div>
                        <div className={styles.buttonsBlock}>
                            <div className={styles.button}>
                                <CloseButton 
                                    img={'/svg/heart.svg'}
                                />
                                <span className={styles.counter}>132</span>
                            </div>
                            <div className={styles.button}>
                                <CloseButton 
                                    img={'/svg/download.svg'}
                                />
                                <span className={styles.counter}>53</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.miniature}>
                    <div className={styles.userRow}>
                        <img className={styles.logo} src='/svg/user.svg' />
                        <span className={styles.userName}>QuantumEcho</span>
                    </div>
                    <img className={styles.miniatureCover} src='/images/ex6.jpg' />
                    <div className={styles.bottomRow}>
                        <div className={styles.titlesBlock}>
                            <span className={styles.title}>Winters Family Web</span>
                            <span className={styles.hashtags}>#WebOfWinters, #WintersFamilyTales</span>
                        </div>
                        <div className={styles.buttonsBlock}>
                            <div className={styles.button}>
                                <CloseButton 
                                    img={'/svg/heart.svg'}
                                />
                                <span className={styles.counter}>213</span>
                            </div>
                            <div className={styles.button}>
                                <CloseButton 
                                    img={'/svg/download.svg'}
                                />
                                <span className={styles.counter}>43</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.miniature}>
                    <div className={styles.userRow}>
                        <img className={styles.logo} src='/svg/user.svg' />
                        <span className={styles.userName}>LunarLynx</span>
                    </div>
                    <img className={styles.miniatureCover} src='/images/ex7.png' />
                    <div className={styles.bottomRow}>
                        <div className={styles.titlesBlock}>
                            <span className={styles.title}>Chronicles of the Clarksons</span>
                            <span className={styles.hashtags}>#ClarksonChronicles, #ClarksonConnections</span>
                        </div>
                        <div className={styles.buttonsBlock}>
                            <div className={styles.button}>
                                <CloseButton 
                                    img={'/svg/heart.svg'}
                                />
                                <span className={styles.counter}>63</span>
                            </div>
                            <div className={styles.button}>
                                <CloseButton 
                                    img={'/svg/download.svg'}
                                />
                                <span className={styles.counter}>12</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.miniature}>
                    <div className={styles.userRow}>
                        <img className={styles.logo} src='/svg/user.svg' />
                        <span className={styles.userName}>VortexVoyager</span>
                    </div>
                    <img className={styles.miniatureCover} src='/images/ex8.jpg' />
                    <div className={styles.bottomRow}>
                        <div className={styles.titlesBlock}>
                            <span className={styles.title}>Pattersons' Past and Present</span>
                            <span className={styles.hashtags}>#PattersonsPastPresent, #PattersonFamilyTies</span>
                        </div>
                        <div className={styles.buttonsBlock}>
                            <div className={styles.button}>
                                <CloseButton 
                                    img={'/svg/heart.svg'}
                                />
                                <span className={styles.counter}>65</span>
                            </div>
                            <div className={styles.button}>
                                <CloseButton 
                                    img={'/svg/download.svg'}
                                />
                                <span className={styles.counter}>12</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Galery