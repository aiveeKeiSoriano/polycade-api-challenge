import Joi from 'joi';
import { default_pricing } from '../../prices.json';

const { models } = require('../db');
const { pricing, price } = models;

export const getModelsList = async (ctx) => {
    const model = pricing;
    const pricingModels = await model.findAll({ include: { model: price, as: 'prices' } });
    pricingModels.unshift({ default_pricing });
    ctx.response.body = pricingModels;
};

export const createNewModel = async (ctx) => {

    const schema = Joi.object().keys({
        id: Joi.string().uuid(),
        name: Joi.string().required()
    });

    const result = schema.validate(ctx.request.body);

    if (result.error) {
        ctx.throw(400, 'Invalid request');
    }

    const model = pricing;
    const newModel = await model.create(ctx.request.body);
    ctx.response.body = newModel.id;
};


export const getModel = async (ctx) => {
    const model = pricing;
    const pricingModel = await model.findOne({
        where: {
            id: ctx.params.pmId
        },
        include: { model: price, as: 'prices' }
    });
    if (!pricingModel) {
        ctx.throw(404, 'Pricing Model not found');
    }
    ctx.response.body = pricingModel;
};

export const updateModel = async (ctx) => {
    const model = pricing;

    const schema = Joi.object().keys({
        name: Joi.string().required()
    });

    const result = schema.validate(ctx.request.body);

    if (result.error) {
        ctx.throw(400, 'Invalid request');
    }

    const pricingModel = await model.findOne({
        where: {
            id: ctx.params.pmId
        }
    });

    if (!pricingModel) {
        ctx.throw(404, 'Pricing Model not found');
    }
    pricingModel.set(ctx.request.body);
    await pricingModel.save();
    ctx.response.body = pricingModel;
};

export const deleteModel = async (ctx) => {
    await pricing.destroy({
        where: {
            id: ctx.params.pmId
        }
    })
    ctx.body = "deleted successfully"
}

export const getModelPrices = async (ctx) => {
    const model = pricing;
    const pricingModelFound = await model.findOne({
        where: {
            id: ctx.params.pmId
        },
        include: { model: price, as: 'prices' }
    });
    if (!pricingModelFound) {
        ctx.throw(404, 'Pricing Model not found');
    }
    ctx.response.body = pricingModelFound.prices;
};

export const addModelPrice = async (ctx) => {

    const schema = Joi.object().keys({
        id: Joi.string().uuid(),
        price: Joi.number().required(),
        name: Joi.string().required(),
        value: Joi.number().required()
    });

    const result = schema.validate(ctx.request.body);

    if (result.error) {
        ctx.throw(400, 'Invalid request');
    }

    const model = pricing;
    const pricingModel = await model.findOne({
        where: {
            id: ctx.params.pmId
        },
        include: { model: price, as: 'prices' }
    });
    if (!pricingModel) {
        ctx.throw(404, 'Pricing Model not found');
    }

    let where;
    if (ctx.request.body.id) {
        where = {
            id: ctx.request.body.id,
            name: ctx.request.body.name,
            price: ctx.request.body.price,
            value: ctx.request.body.value,
            pricingId: pricingModel.id
        };
    } else {
        where = {
            name: ctx.request.body.name,
            price: ctx.request.body.price,
            value: ctx.request.body.value,
            pricingId: pricingModel.id
        };
    }

    const priceFound = await price.findOrCreate({
        where
    });

    ctx.response.body = [priceFound[0]];
};

export const deleteModelPrice = async (ctx) => {
    const model = pricing;
    const pricingModel = await model.findOne({
        where: {
            id: ctx.params.pmId
        },
        include: { model: price, as: 'prices' }
    });
    if (!pricingModel) {
        ctx.throw(404, 'Pricing Model not found');
    }
    const priceFound = await price.destroy({
        where: {
            id: ctx.params.priceId
        }
    });
    if (!priceFound) {
        ctx.throw(404, 'price not found');
    }
    ctx.response.body = "Deleted successfully";
};