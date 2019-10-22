const assert = require('assert');
const proxyquire = require('proxyquire');

const {
    furnituresMock,
    FurnituresServiceMock
} = require('../utils/mocks/furnitures.js');
const testServer = require('../utils/testServer');

describe('routes - furnitures', function () {
    const route = proxyquire('../routes/furnitures', {
        '../services/furnitures': FurnituresServiceMock
    });

    const request = testServer(route);
    describe('GET /furnitures', function () {
        it('should respond with status 200', function (done) {
            request.get('/api/furnitures').expect(200, done);
        });

        it('should respond with the list of furnitures', function (done) {
            request.get('/api/furnitures').end((err, res) => { // eslint-disable-line handle-callback-err
                assert.deepEqual(res.body, {
                    data: furnituresMock,
                    message: 'furnitures listed'
                });

                done();
            });
        });
    });
});
