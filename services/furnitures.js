const MongoLib = require('../lib/mongo');

class FurnituresService {
    constructor() {
        this.collection = 'furnitures';
        this.mongoDB = new MongoLib();
    }

    getFurnitures({ tags }) {
        const query = tags && { tags: { $in: tags } };
        const furnitures = this.mongoDB.getAll(this.collection, query);
        return furnitures || [];
    }

    getFurniture({ furnitureId }) {
        const furniture = this.mongoDB.get(this.collection, furnitureId);
        return furniture || {};
    }

    createFurniture({ furniture }) {
        const createFurnitureId = this.mongoDB.create(this.collection, furniture);
        return createFurnitureId;
    }

    updateFurniture({ furnitureId, furniture } = {}) {
        const updatedFurnitureId = this.mongoDB.update(
            this.collection,
            furnitureId,
            furniture
        );
        return updatedFurnitureId;
    }

    deleteFurniture({ furnitureId }) {
        const deletedFurnitureId = this.mongoDB.delete(this.collection, furnitureId);
        return deletedFurnitureId;
    }
}

module.exports = FurnituresService;
