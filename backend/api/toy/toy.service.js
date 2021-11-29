const dbService = require('../../services/db.service');
const logger = require('../../services/logger.service');
const ObjectId = require('mongodb').ObjectId;

module.exports = {
    query,
    getById,
    add,
    update,
    remove,
};

async function query(filterBy = {}) {
    try {
        const criteria = _buildCriteria(filterBy)
        // const criteria = {};

        const collection = await dbService.getCollection('toy');
        const toys = await collection.find(criteria).toArray();

        return toys;
    } catch (err) {
        logger.error('cannot find toys', err);
        throw err;
    }
}

async function getById(toyId) {
    try {
        const collection = await dbService.getCollection('toy');
        const toy = await collection.findOne({ "_id": ObjectId(toyId) });
        return toy;
    } catch (err) {
        logger.error(`while finding toy ${toyId}`, err);
        throw err;
    }
}

async function add(toy) {
    try {
        delete toy._id
        const collection = await dbService.getCollection('toy')
        await collection.insertOne(toy)
        return toy
    } catch (err) {
        logger.error('cannot insert toy', err)
        throw err
    }
}
async function update(toy) {
    try {
        var id = ObjectId(toy._id)
        delete toy._id
        const collection = await dbService.getCollection('toy')
        await collection.updateOne({ "_id": id }, { $set: { ...toy } })
        toy._id = id;
        return toy
    } catch (err) {
        logger.error(`cannot update toy ${toyId}`, err)
        throw err
    }
}

async function remove(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        await collection.deleteOne({ '_id': ObjectId(toyId) })
        return toyId
    } catch (err) {
        logger.error(`cannot remove toy ${toyId}`, err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}

    const txt = filterBy.toyName.toLowerCase();
    const { status } = filterBy;
    const [ ...labels ] = filterBy.labels || []

    if (txt) {
        const txtCriteria = { $regex: txt, $options: 'i' }
        criteria.name = txtCriteria
    }
    if (status !== 'all') criteria.inStock = (status === 'instock') ? true : false;

    if (labels.length) criteria.labels = {  $all: labels  };

    console.log(criteria);

//      if (sortBy) switch (sortBy) {
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
//      }
  
    return criteria
}





