const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
const asyncLocalStorage = require('../../services/als.service')

async function query(filterBy = {}) {
    try {
        const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('review')
        // let reviews = await collection.find(criteria).toArray()
        var reviews = await collection.aggregate([
            {
                $match: criteria
            },
            {
                $lookup:
                {
                    localField: 'byUserId',
                    from: 'user',
                    foreignField: '_id',
                    as: 'byUser'
                }
            },
            {
                $unwind: '$byUser'
            },
            {
                $lookup:
                {
                    localField: 'aboutToyId',
                    from: 'toy',
                    foreignField: '_id',
                    as: 'aboutToy'
                }
            },
            {
                $unwind: '$aboutToy'
            }
        ]).toArray()
        reviews = reviews.map(review => {
            review.byUser = { _id: review.byUser._id, fullName: review.byUser.fullname }
            review.aboutToy = { _id: review.aboutToy._id, toyName: review.aboutToy.name }
            delete review.byUserId
            delete review.aboutToyId
            return review
        })

        return reviews
    } catch (err) {
        logger.error('cannot find reviews', err)
        throw err
    }

}

async function remove(reviewId) {
    try {
        console.log(reviewId);
        const store = asyncLocalStorage.getStore()
        const { userId, isAdmin } = store
        console.log(userId, isAdmin);
        const collection = await dbService.getCollection('review')
        // remove only if user is owner/admin
        const criteria = { _id: ObjectId(reviewId) }
        if (!isAdmin) criteria.byUserId = ObjectId(userId)
        await collection.deleteOne(criteria)
    } catch (err) {
        logger.error(`cannot remove review ${reviewId}`, err)
        throw err
    }
}


async function add(review) {
    try {
        // peek only updatable fields!
        const reviewToAdd = {
            byUserId: ObjectId(review.byUserId),
            aboutToyId: ObjectId(review.aboutToyId),
            txt: review.txt,
            rating: review.rating
        }
        const collection = await dbService.getCollection('review')
        await collection.insertOne(reviewToAdd)
        return reviewToAdd;
    } catch (err) {
        logger.error('cannot insert review', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = { $or: [{aboutToyId: ObjectId(filterBy.aboutToyId)}, {byUserId: ObjectId(filterBy.byUserId)}]}

    // if (filterBy.aboutToyId) criteria.id = { $elemMatch: {id: ObjectId(filterBy.aboutToyId) }};
    // console.log(filterBy)
    // if (view === 'toy') criteria = {aboutToyId : ObjectId(filterBy.aboutToyId)}
    // criteria.aboutToy._id = {};

    // else if (view === 'user') criteria.byUser = { $eq: filterBy.aboutToyId};
    // console.log(criteria);

    // {"aboutToyId" : ObjectId("619fc070df862fc6eedb4d7a")}
    return criteria
}

module.exports = {
    query,
    remove,
    add
}


