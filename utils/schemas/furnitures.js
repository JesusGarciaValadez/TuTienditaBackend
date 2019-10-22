const joi = require('@hapi/joi');

const furnitureIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const furnitureTitleSchema = joi.string().max(80);
const furnitureYearSchema = joi
    .number()
    .min(1888)
    .max(2077);
const furnitureCoverSchema = joi.string().uri();
const furnitureDescriptionSchema = joi.string().max(300);
const furnitureDurationSchema = joi
    .number()
    .min(1)
    .max(300);
const furnitureContentRatingSchema = joi.string().max(5);
const furnitureSourceSchema = joi.string().uri();
const furnitureTagsSchema = joi.array().items(joi.string().max(50));

const createFurnitureSchema = {
    title: furnitureTitleSchema.required(),
    year: furnitureYearSchema.required(),
    cover: furnitureCoverSchema.required(),
    description: furnitureDescriptionSchema.required(),
    duration: furnitureDurationSchema.required(),
    contentRating: furnitureContentRatingSchema.required(),
    source: furnitureSourceSchema.required(),
    tags: furnitureTagsSchema
};

const updateFurnitureSchema = {
    title: furnitureTitleSchema,
    year: furnitureYearSchema,
    cover: furnitureCoverSchema,
    description: furnitureDescriptionSchema,
    duration: furnitureDurationSchema,
    contentRating: furnitureContentRatingSchema,
    source: furnitureSourceSchema,
    tags: furnitureTagsSchema
};

module.exports = {
    furnitureIdSchema,
    createFurnitureSchema,
    updateFurnitureSchema
};
