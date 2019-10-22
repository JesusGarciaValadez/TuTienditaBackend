const assert = require('assert');
const proxyquire = require('proxyquire');

const { MongoLibMock, getAllStub } = require('../utils/mocks/mongoLib');

const { furnituresMock } = require('../utils/mocks/furnitures');

describe('services - furnitures', function () {
    const FurnituresServices = proxyquire('../services/furnitures', {
        '../lib/mongo': MongoLibMock
    });

    const furnituresService = new FurnituresServices();

    describe('when getFurnitures method is called', async function () {
        it('should call the getall MongoLib method', async function () {
            await furnituresService.getFurnitures({});
            assert.strictEqual(getAllStub.called, true);
        });

        it('should return an array of furnitures', async function () {
            const result = await furnituresService.getFurnitures({});
            const expected = furnituresMock;
            assert.deepEqual(result, expected);
        });
    });
});
