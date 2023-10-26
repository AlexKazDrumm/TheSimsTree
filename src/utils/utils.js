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