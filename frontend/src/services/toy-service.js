import { httpService } from './http.service.js';

// import Axios from 'axios'; 
// var axios = Axios.create({ withCredentials: true});

import { storageService } from './async-storage.service.js';

const KEY = 'toysDB';
const TOYS_URL = _getUrl();

export const toyService = {
    query,
    getById,
    remove,
    save,
    getEmptyToy,
    getLabels,
};

function _getUrl(id = '') {
    const BASE_URL = (process.env.NODE_ENV !== 'development')
        ? '/api/toy/'
        : '//localhost:3000/api/toy/';
    return `${BASE_URL}/${id}`
}

function getLabels() {
    return ['on wheels','box game','art','baby','doll','puzzle','outdoor','battery powered','soldier','adult'];
}

const toys = _createToys();

async function query(filterBy = {}) {
    try{
        return await httpService.get('toy', filterBy)

    } catch {
        console.log('error');
    }
}


async function getById(toyId) {
    return await httpService.get('toy/' + toyId, toyId)
}

async function remove(toyId) {
    return await httpService.delete('toy/' + toyId, toyId)
}

async function save(toy) {
    return (toy._id)
    ? await httpService.put('toy', toy)
    : await httpService.post('toy', toy)
}

function getEmptyToy() {
    return {
        _id: '',
        name: '',
        price: 149,
        labels: '',
        inStock: false,
    };
}

function _createToys() {
    let toys = JSON.parse(localStorage.getItem(KEY));
    if (!toys || !toys.length)
        toys = [
            {
                _id: 't101',
                name: 'Talking Doll',
                price: 123,
                labels: ['doll', 'battery powered', 'baby'],
                createdAt: 1631031801011,
                inStock: true,
            },
            {
                _id: 't102',
                name: 'Running Soldier',
                price: 179,
                labels: ['soldier', 'battery powered', 'outdoor'],
                createdAt: 1631031201011,
                inStock: true,
            },
        ];
    localStorage.setItem(KEY, JSON.stringify(toys));
    return toys;
}
