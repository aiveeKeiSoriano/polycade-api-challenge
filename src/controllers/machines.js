import { default_pricing } from '../../prices.json'
import Joi from 'joi'

const { models } = require('../db')

const { price, pricing, machine } = models

export const createNewMachince = async (ctx) => {
    const schema = Joi.object().keys({
        id: Joi.string().uuid(),
        name: Joi.string().required(),
    });

    const result = schema.validate(ctx.request.body);

    if (result.error) {
        ctx.throw(400, 'Invalid request')
    }

    const model = machine
    const newMachine = await model.create(ctx.request.body)
    ctx.response.body = newMachine.id
}

export const deleteMachine = async (ctx) => {
    await machine.destroy({
        where: {
            id: ctx.params.machineId
        }
    })
    ctx.response.body = "deleted successfully"
}

export const updateMachinePrices = async (ctx) => {
    const machineFound = await machine.findOne({
        where: {
            id: ctx.params.machineId
        }
    })
    if (!machineFound) {
        ctx.throw(404, 'Machine not found')
    }
    const pricingModel = await pricing.findOne({
        where: {
            id: ctx.params.pmId
        }
    })
    if (!pricingModel) {
        ctx.throw(404, 'Pricing Model not found')
    }
    machineFound.setPricing(pricingModel.id)
    ctx.response.body = machineFound
};

export const deleteMachinePrice = async (ctx) => {
    const machineFound = await machine.findOne({
        where: {
            id: ctx.params.machineId
        }
    })
    if (!machineFound) {
        ctx.throw(404, 'Machine not found')
    }
    const pricingModel = await pricing.findOne({
        where: {
            id: ctx.params.pmId
        }
    })
    if (!pricingModel) {
        ctx.throw(404, 'Pricing Model not found')
    }
    machineFound.setPricing(null)
    ctx.response.body = machineFound
}

export const getMachinePrices = async (ctx) => {
    const machineFound = await machine.findOne({
        where: {
            id: ctx.params.machineId
        },
        include: { model: pricing, include: { model: price, as: 'prices' } }
    })
    if (!machineFound) {
        ctx.throw(404, 'Machine not found')
    }
    console.log(machineFound.pricing)
    if (!machineFound.pricing) {
        ctx.response.body =  { default_pricing }
    }
    else {
        ctx.response.body = machineFound.pricing
    }
}