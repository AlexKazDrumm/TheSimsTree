import React from 'react';
import styles from './RegularButton.module.css';
import { choosePalette } from '../../../utils/utils';

const RegularButton = ({event, text, type}) => {
    const palette = choosePalette(type);

    const buttonStyles = {
        '--text-color': `#${palette?.textColor}`,
        '--main-color': `#${palette?.mainColor}`,
        '--second-color': `#${palette?.secondColor}`
    };

    return (
        <button
            className={styles.button}
            onClick={event}
            style={buttonStyles}
        >
            {text}
        </button>
    );
}

export default RegularButton;