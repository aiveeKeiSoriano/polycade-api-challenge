
import { default_pricing } from '../../prices.json'
import models from '../models'
import Joi from "joi"
import Price from '../models/prices'
const { PricingModel, Machine } = models

export const createNewMachince = async (ctx) => {
    const schema = Joi.object().keys({
        id: Joi.string().uuid(),
        name: Joi.string().required(),
    });

    const result = schema.validate(ctx.request.body);

    if (result.error) {
        ctx.throw(400, 'Invalid request')
    }

    const model = Machine
    const newMachine = await model.create(ctx.request.body)
    ctx.response.body = newMachine.id
}

export const updateMachinePrices = async (ctx) => {
    const machine = await Machine.findOne({
        where: {
            id: ctx.params.machineId
        }
    })
    if (!machine) {
        ctx.throw(404, 'Machine not found')
    }
    const pricingModel = await PricingModel.findOne({
        where: {
            id: ctx.params.pmId
        }
    })
    if (!pricingModel) {
        ctx.throw(404, 'Pricing Model not found')
    }
    machine.setPricing(pricingModel.id)
    ctx.body = machine
}

export const deleteMachinePrice = async (ctx) => {
    const machine = await Machine.findOne({
        where: {
            id: ctx.params.machineId
        }
    })
    if (!machine) {
        ctx.throw(404, 'Machine not found')
    }
    const pricingModel = await PricingModel.findOne({
        where: {
            id: ctx.params.pmId
        }
    })
    if (!pricingModel) {
        ctx.throw(404, 'Pricing Model not found')
    }
    machine.setPricing(null)
    ctx.body = machine
}

export const getMachinePrices = async (ctx) => {
    const machine = await Machine.findOne({
        where: {
            id: ctx.params.machineId
        },
        include: { model: PricingModel, include: { model: Price, as: "pricing" }}
    })
    if (!machine) {
        ctx.throw(404, 'Machine not found')
    }
    if (!machine.PricingId) {
        ctx.body = default_pricing
    }
    else {
        ctx.body = machine.Pricing
    }
}