
import Router from 'koa-router'
import { updateMachinePrices, deleteMachinePrice, getMachinePrices, createNewMachince } from '../controllers/machines'

const router = new Router({
    prefix: '/machines'
})

router
    .post('/', createNewMachince)
    .put('/:machineId/prices/:pmId', updateMachinePrices)
    .delete('/:machineId/prices/:pmId', deleteMachinePrice)
    .get('/:machineId/prices', getMachinePrices)

export default router