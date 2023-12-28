import globals from "../globals";

export const choosePalette = (type) => {
    const palettes = {
        blue: {
            textColor: 'FFFFFF',
            mainColor: '059FDC',
            secondColor: '1500B5'
        },
        green: {
            textColor: 'F1FFE2',
            mainColor: 'ADD34B',
            secondColor: '6FB12B'
        },
        orange: {
            textColor: 'fff8d8',
            mainColor: 'F9BA00',
            secondColor: 'F4780C'
        },
        grey: {
            textColor: '285471',
            mainColor: 'FAFAFA',
            secondColor: 'F4F3F0'
        }
    };

    return palettes[type] || null;
}

export const addAlert = (text, type, alerts, setAlerts) => {
    const id = new Date().getTime();
    const newAlert = { id, text, type };
    setAlerts([...alerts, newAlert]);
  
    setTimeout(() => {
      setAlerts(prevAlerts => prevAlerts.filter(alert => alert.id !== id));
    }, 10000);
};

export const sortTrees = (sortType, trees) => {
    switch (sortType) {
        case "likes":
            return [...trees].sort((a, b) => b.likes - a.likes);
        case "title":
            return [...trees].sort((a, b) => a.treeTitle.toLowerCase().localeCompare(b.treeTitle.toLowerCase()));
        case "author":
            return [...trees].sort((a, b) => a.userName.toLowerCase().localeCompare(b.userName.toLowerCase()));
        default:
            return trees;
    }
};

export const filterTrees = (filter, searchText, trees) => {
    const lowerSearchText = searchText.toLowerCase();

    return trees.filter(tree => {
        switch (filter) {
            case "category1":
                return tree.hashtags.toLowerCase().includes(lowerSearchText);
            case "category2":
                return tree.userName.toLowerCase().includes(lowerSearchText);
            default:
                return tree.treeTitle.toLowerCase().includes(lowerSearchText);
        }
    });
};

// export const generateNodesAndEdges = (characters) => {
//     let nodes = [];
//     let edges = [];
//     let xPos = 300; // начальная центральная позиция по горизонтали
//     let yPos = 25;  // начальная позиция по вертикали
//     let xOffset = 100; // горизонтальное расстояние между персонажами
//     let yOffset = 150; // вертикальное расстояние между поколениями

//     let levelWidth = {}; // Словарь для хранения ширины каждого уровня
//     let levelIndex = {}; // Словарь для хранения индекса персонажа на его уровне

//     // Словарь для хранения данных персонажей по ID
//     let charactersById = characters.reduce((acc, character) => {
//         acc[character.id] = character;
//         return acc;
//     }, {});

//     // Функция для определения уровня персонажа в дереве
//     const determineLevel = (characterId, visited = new Set(), currentLevel = 0) => {
//         if (visited.has(characterId)) {
//             return currentLevel;
//         }
//         visited.add(characterId);
    
//         const character = charactersById[characterId];
//         if (!character) return currentLevel;
    
//         const parentOneLevel = character.parent_one_id ? determineLevel(character.parent_one_id, visited, currentLevel + 1) : currentLevel;
//         const parentTwoLevel = character.parent_two_id ? determineLevel(character.parent_two_id, visited, currentLevel + 1) : currentLevel;
    
//         visited.delete(characterId);
    
//         return Math.max(parentOneLevel, parentTwoLevel);
//     };

//     // Присваиваем каждому персонажу его уровень и обновляем ширину уровня
//     characters.forEach(character => {
//         character.level = determineLevel(character.id);
//         levelWidth[character.level] = (levelWidth[character.level] || 0) + 1;
//     });

//     // Сортируем персонажей по уровням
//     characters.sort((a, b) => a.level - b.level);

//     // Создаем узлы и связи
//     characters.forEach(character => {
//         if (!levelIndex[character.level]) {
//             levelIndex[character.level] = 0;
//         }

//         const xPosition = xPos + (levelIndex[character.level] - (levelWidth[character.level] - 1) / 2) * xOffset;
//         const yPosition = yPos + character.level * yOffset;
//         levelIndex[character.level]++;

//         nodes.push(createNode(character, { x: xPosition, y: yPosition }));

//         // Создаем горизонтальные связи между партнерами
//         character.relations.forEach(relation => {
//             if (relation.to_id && relation.connection_type_id < 9) {
//                 const partner = charactersById[relation.to_id];
//                 if (partner) {
//                     edges.push(createPartnerEdge(character.id, partner.id));
//                 }
//             }
//         });

//         // Создаем вертикальные связи с детьми
//         if (character.parent_one_id) {
//             edges.push(createChildEdge(character.parent_one_id, character.id, true));
//         }
//         if (character.parent_two_id) {
//             edges.push(createChildEdge(character.parent_two_id, character.id, false));
//         }
//     });

//     return { nodes, edges };
// };

// function createNode(character, position) {
//     return {
//         id: character.id.toString(),
//         data: { label: character.name },
//         style: {
//             backgroundImage: character.photo ? `url(${character.photo})` : 'url("./svg/user_master_avatar.svg")',
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//             backgroundRepeat: 'no-repeat',
//             borderRadius: '50%',
//             width: '70px',
//             height: '70px'
//         },
//         position: position,
//         sourcePosition: 'right', // По умолчанию исходящие связи справа
//         targetPosition: 'left' // По умолчанию входящие связи слева
//     };
// }

// function createPartnerEdge(source, target) {
//     return {
//         id: `e${source}-${target}`,
//         source: source.toString(),
//         target: target.toString(),
//         type: 'straight',
//         sourceHandle: 'right',
//         targetHandle: 'left',
//         animated: false
//     };
// }

// function createChildEdge(parentId, childId, isParentOne) {
//     return {
//         id: `e${parentId}-${childId}`,
//         source: parentId.toString(),
//         target: childId.toString(),
//         type: 'step',
//         sourceHandle: isParentOne ? 'right' : 'left',
//         targetHandle: 'top',
//         animated: false
//     };
// }

export const generateNodesAndEdges = (characters) => {
    let nodes = [];
    let edges = [];
    let xPos = 300; // начальная центральная позиция по горизонтали
    let yPos = 25;  // начальная позиция по вертикали
    let xOffset = 150; // горизонтальное расстояние между персонажами
    let yOffset = 150; // вертикальное расстояние между поколениями

    let levelWidth = {}; // Словарь для хранения ширины каждого уровня
    let levelIndex = {}; // Словарь для хранения индекса персонажа на его уровне

    // Словарь для хранения данных персонажей по ID
    let charactersById = characters.reduce((acc, character) => {
        acc[character.id] = character;
        return acc;
    }, {});

    // Функция для определения уровня персонажа в дереве
    const determineLevel = (characterId, visited = new Set(), currentLevel = 0) => {
        if (visited.has(characterId)) {
            return currentLevel;
        }
        visited.add(characterId);
    
        const character = charactersById[characterId];
        if (!character) return currentLevel;
    
        const parentOneLevel = character.parent_one_id ? determineLevel(character.parent_one_id, visited, currentLevel + 1) : currentLevel;
        const parentTwoLevel = character.parent_two_id ? determineLevel(character.parent_two_id, visited, currentLevel + 1) : currentLevel;
    
        visited.delete(characterId);
    
        return Math.max(parentOneLevel, parentTwoLevel);
    };

    // Присваиваем каждому персонажу его уровень и обновляем ширину уровня
    characters.forEach(character => {
        character.level = determineLevel(character.id);
        levelWidth[character.level] = (levelWidth[character.level] || 0) + 1;
    });

    // Сортируем персонажей по уровням
    characters.sort((a, b) => a.level - b.level);

    // Создаем узлы и связи
    characters.forEach(character => {
        if (!levelIndex[character.level]) {
            levelIndex[character.level] = 0;
        }

        const xPosition = xPos + (levelIndex[character.level] - (levelWidth[character.level] - 1) / 2) * xOffset;
        const yPosition = yPos + character.level * yOffset;
        levelIndex[character.level]++;

        nodes.push(createNode(character, { x: xPosition, y: yPosition }));

        // Создаем горизонтальные связи между партнерами
        character.relations.forEach(relation => {
            if (relation.to_id && relation.connection_type_id < 9) {
                const partner = charactersById[relation.to_id];
                if (partner) {
                    edges.push(createPartnerEdge(character.id, partner.id));
                }
            }
        });

        // Создаем вертикальные связи с детьми
        if (character.parent_one_id) {
            const handle = character.parent_two_id ? 'right' : 'bottom';
            edges.push(createChildEdge(character.parent_one_id, character.id, handle));
        }
        if (character.parent_two_id) {
            edges.push(createChildEdge(character.parent_two_id, character.id, 'left'));
        }
    });

    return { nodes, edges };
};

function createNode(character, position) {
    return {
        id: character.id.toString(),
        data: { label: character.name },
        style: {
            backgroundImage: character.photo ? `url(${globals.productionServerDomain}/file/${character.photo})` : 'url("./svg/user_master_avatar.svg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            borderRadius: '50%',
            width: '70px',
            height: '70px'
        },
        position: position,
        sourcePosition: 'right', // По умолчанию исходящие связи справа
        targetPosition: 'left' // По умолчанию входящие связи слева
    };
}

function createPartnerEdge(source, target) {
    return {
        id: `e${source}-${target}`,
        source: source.toString(),
        target: target.toString(),
        type: 'straight',
        sourceHandle: 'right',
        targetHandle: 'left',
        animated: false
    };
}

function createChildEdge(parentId, childId, parentHandle) {
    return {
        id: `e${parentId}-${childId}`,
        source: parentId.toString(),
        target: childId.toString(),
        type: 'step',
        sourceHandle: parentHandle,
        targetHandle: 'top',
        animated: false
    };
}