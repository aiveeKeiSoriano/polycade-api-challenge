import Joi from 'joi'
import models from '../models'
const { PricingModel, Price } = models
import { default_pricing } from '../../prices.json'

export const addDummyData = async (ctx) => {
    const pricingModel = await PricingModel.create({
        name: "test model"
    })
    const price = await Price.create({
        "name": "test",
        "value": 0,
        "price": 0,
        PricingId: pricingModel.id
    })
    ctx.response.body = JSON.stringify(price)
}

export const getModelsList = async (ctx) => {
    const model = PricingModel
    const pricingModels = await model.findAll({ include: { model: Price, as: "pricing" } })
    pricingModels.unshift({ default_pricing })
    ctx.response.body = pricingModels
}

export const createNewModel = async (ctx) => {

    const schema = Joi.object().keys({
        id: Joi.string().uuid(),
        name: Joi.string().required(),
    });

    const result = schema.validate(ctx.request.body);

    if (result.error) {
        ctx.throw(400, 'Invalid request')
    }

    const model = PricingModel
    const newModel = await model.create(ctx.request.body)
    ctx.response.body = newModel.id
}


export const getModel = async (ctx) => {
    const model = PricingModel
    const pricingModel = await model.findOne({
        where: {
            id: ctx.params.pmId
        },
        include: { model: Price, as: "pricing" }
    })
    if (!pricingModel) {
        ctx.throw(404, 'Pricing Model not found')
    }
    ctx.response.body = pricingModel
}

export const updateModel = async (ctx) => {
    console.log("updatemodels")
    const model = PricingModel

    const schema = Joi.object().keys({
        name: Joi.string().required(),
    });

    const result = schema.validate(ctx.request.body);

    if (result.error) {
        ctx.throw(400, 'Invalid request')
    }

    const pricingModel = await model.findOne({
        where: {
            id: ctx.params.pmId
        }
    })

    if (!pricingModel) {
        ctx.throw(404, 'Pricing Model not found')
    }
    pricingModel.set(ctx.request.body)
    await pricingModel.save()
    ctx.response.body = pricingModel
}

export const getModelPrices = async (ctx) => {
    const model = PricingModel
    const pricingModel = await model.findOne({
        where: {
            id: ctx.params.pmId
        },
        include: { model: Price, as: "pricing" }
    })
    if (!pricingModel) {
        ctx.throw(404, 'Pricing Model not found')
    }
    ctx.response.body = pricingModel.pricing
}

export const addModelPrice = async (ctx) => {

    const schema = Joi.object().keys({
        id: Joi.string().uuid(),
        price: Joi.number().required(),
        name: Joi.string().required(),
        value: Joi.number().required()
    });

    const result = schema.validate(ctx.request.body);

    if (result.error) {
        ctx.throw(400, 'Invalid request')
    }

    const model = PricingModel
    const pricingModel = await model.findOne({
        where: {
            id: ctx.params.pmId
        },
        include: { model: Price, as: "pricing" }
    })
    if (!pricingModel) {
        ctx.throw(404, 'Pricing Model not found')
    }

    let where
    if (ctx.request.body.id) {
        where = {
            id: ctx.request.body.id,
            name: ctx.request.body.name,
            price: ctx.request.body.price,
            value: ctx.request.body.value,
            PricingId: pricingModel.id
        }
    }
    else {
        where = {
            name: ctx.request.body.name,
            price: ctx.request.body.price,
            value: ctx.request.body.value,
            PricingId: pricingModel.id
        }
    }

    const price = await Price.findOrCreate({
        where
    })

    // await pricingModel.addPrice(price)
    ctx.response.body = price
}

export const deleteModelPrice = async (ctx) => {
    const model = PricingModel
    const pricingModel = await model.findOne({
        where: {
            id: ctx.params.pmId
        },
        include: { model: Price, as: "pricing" }
    })
    if (!pricingModel) {
        ctx.throw(404, 'Pricing Model not found')
    }
    const price = await Price.destroy({
        where: {
            id: ctx.params.priceId
        }
    })
    if (!price) {
        ctx.throw(404, 'Price not found')
    }
    ctx.response.body = price
}