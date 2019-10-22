const express = require('express');
const FurnituresService = require('../services/furnitures');

const {
    furnitureIdSchema,
    createFurnitureSchema,
    updateFurnitureSchema
} = require('../utils/schemas/furnitures');

const validationHandler = require('../utils/middleware/validationHandler');

const cacheResponse = require('../utils/cacheResponse');
const {
    FIVE_MINUTES_IN_SECONDS,
    SIXTY_MINUTES_IN_SECONDS
} = require('../utils/time');

function furnituresApi(app) {
    const router = express.Router();
    app.use('/api/furnitures', router);

    const FurnitureService = new FurnituresService();

    router.get('/', async function (req, res, next) {
        cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
        const { tags } = req.query;

        try {
            const furnitures = await FurnitureService.getFurnitures({ tags });

            res.status(200).json({
                data: furnitures,
                message: 'furnitures listed'
            });
        } catch (err) {
            next(err);
        }
    });

    router.get(
        '/:furnitureId',
        validationHandler({ furnitureId: furnitureIdSchema }, 'params'),
        async function (req, res, next) {
            cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
            const { furnitureId } = req.params;

            try {
                const furnitures = await FurnitureService.getFurniture({ furnitureId });

                res.status(200).json({
                    data: furnitures,
                    message: 'furniture retrieved'
                });
            } catch (err) {
                next(err);
            }
        }
    );

    router.post('/', validationHandler(createFurnitureSchema), async function (
        req,
        res,
        next
    ) {
        const { body: furniture } = req;
        try {
            const createdFurnitureId = await FurnitureService.createFurniture({ furniture });

            res.status(201).json({
                data: createdFurnitureId,
                message: 'furniture created'
            });
        } catch (err) {
            next(err);
        }
    });

    router.put(
        '/:furnitureId',
        validationHandler({ furnitureId: furnitureIdSchema }, 'params'),
        validationHandler(updateFurnitureSchema),
        async function (req, res, next) {
            const { furnitureId } = req.params;
            const { body: furniture } = req;

            try {
                const updatedFurnitureId = await FurnitureService.updateFurniture({
                    furnitureId,
                    furniture
                });

                res.status(200).json({
                    data: updatedFurnitureId,
                    message: 'furniture updated'
                });
            } catch (err) {
                next(err);
            }
        }
    );

    router.delete(
        '/:furnitureId',
        validationHandler({ furnitureId: furnitureIdSchema }, 'params'),
        async function (req, res, next) {
            const { furnitureId } = req.params;

            try {
                const deletedFurnitureId = await FurnitureService.deleteFurniture({ furnitureId });

                res.status(200).json({
                    data: deletedFurnitureId,
                    message: 'furniture deleted'
                });
            } catch (err) {
                next(err);
            }
        }
    );
}

module.exports = furnituresApi;
