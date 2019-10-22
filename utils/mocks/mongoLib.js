const sinon = require('sinon');

const { furnituresMock, filteredFurnituresMock } = require('./furnitures');

const getAllStub = sinon.stub();
getAllStub.withArgs('furnitures').resolves(furnituresMock);

const tagQuery = { tags: { $in: ['Living Room'] } };
getAllStub.withArgs('furnitures', tagQuery).resolves(filteredFurnituresMock('Living Room'));

const createStub = sinon.stub().resolves(furnituresMock[0].id);

class MongoLibMock {
    getAll(collection, query) { // eslint-disable-line class-methods-use-this
        return getAllStub(collection, query);
    }

    create(collection, data) { // eslint-disable-line class-methods-use-this
        return createStub(collection, data);
    }
}

module.exports = {
    getAllStub,
    createStub,
    MongoLibMock
};
