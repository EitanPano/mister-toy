const fs = require('fs');
const gToys = require('../data/toys.json');

const PAGE_SIZE = 8;

module.exports = {
    query,
    getById,
    save,
    remove,
};

function query(filterBy = {}) {
    if (!Object.keys(filterBy).length) return Promise.resolve(gToys);

    console.log('TESTING SERVICE 14');
    let filteredToys = gToys
    
    const searchStr = filterBy.toyName.toLowerCase();
    const { status } = filterBy;
    const labels = filterBy.labels || []
    // const sortBy = filterBy.sortBy || '';
    
    if (searchStr) filteredToys = filteredToys.filter((toy) => toy.name.toLowerCase().includes(searchStr));
    if (status !== 'all') filteredToys = status === 'instock'
                ? filteredToys.filter((toy) => toy.inStock)
                : filteredToys.filter((toy) => !toy.inStock);




    if (labels.length) 
    filteredToys = filteredToys.filter((toy) => toy.labels.some((label) => labels.includes(label)));
    // if (!filterBy.labels.every(label => toy.labels.includes(label))) return false
    

    // if (sortBy) switch (sortBy) {
    //         case 'name':
    //             filteredToys = filteredToys.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : a.name < b.name ? -1 : 0);
    //             break;
    //         case 'price':
    //             filteredToys = filteredToys.sort((a, b) => b.price - a.price);
    //             break;
    //         case 'created':
    //             filteredToys = filteredToys.sort(
    //                 (a, b) => a.createdAt - b.createdAt
    //             );
    // }

    return Promise.resolve(filteredToys);
}

function getById(toyId) {
    const toy = gToys.find((toy) => toy._id === toyId);
    return Promise.resolve(toy);
}

function save(toy) {
    if (toy._id) {
        const idx = gToys.findIndex((currToy) => currToy._id === toy._id);
        const currToy = gToys[idx];
        currToy.name = toy.name
        currToy.price = toy.price
        currToy.labels = toy.labels
        currToy.inStock = toy.inStock

        return _saveToysToFile().then(() => currToy);
    } else {
        toy._id = _makeId();
        toy.createdAt = Date.now();
        gToys.push(toy);
        return _saveToysToFile().then(() => toy);
    }
}

function remove(toyId) {
    const idx = gToys.findIndex((toy) => toy._id === toyId);

    gToys.splice(idx, 1);
    return _saveToysToFile();
}

function _makeId(length = 8) {
    var txt = '';
    var possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}
function _saveToysToFile() {
    return new Promise((resolve, reject) => {
        fs.writeFile(
            'data/toys.json',
            JSON.stringify(gToys, null, 2),
            (err) => {
                if (err) return reject(err);
                resolve();
            }
        );
    });
}
