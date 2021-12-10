import { app } from '../index';
import gracefulShutdown from 'http-graceful-shutdown';
import supertest from 'supertest';

// import { request } from "./test-config"

let server = {};
let request = {};
let shutdown = () => {
};

beforeAll(async () => {
    server = app.listen(1337);
    shutdown = await gracefulShutdown(server, {
        forceExit: true
    });
});

describe('Testing Machine routes', () => {

    beforeEach(async () => {
        request = await supertest(server);
    });

    test('Setup sample data', async () => {
        const res = await request.post('/machines').send({
            id: '57342663-909c-4adf-9829-6dd1a3aa9143',
            name: 'Machine 1'
        });
        expect(res.text).toBe('57342663-909c-4adf-9829-6dd1a3aa9143');
        expect(res.statusCode).toBe(200);
    });

    test('GET request to /machines/:machine-id/prices', async () => {
        const res = await request.get('/machines/57342663-909c-4adf-9829-6dd1a3aa9143/prices');
        const pricingModel = res.body;
        expect(res.statusCode).toBe(200);
    });

    test('GET request to invalid machine id /machines/:machine-id/prices', async () => {
        const res = await request.get('/machines/57342663-909c-4adf-9829-6dd1a3aa9154/prices');
        expect(res.statusCode).toBe(404);
    });

    test('PUT request to /machines/:machine-id/prices/:pm-id', async () => {
        await request.post('/pricing-models').send({
            id: '3ba92095-3203-4888-a464-3c7d5d9acd7e',
            name: 'Super Value Option'

        });
        const res = await request.put('/machines/57342663-909c-4adf-9829-6dd1a3aa9143/prices/3ba92095-3203-4888-a464-3c7d5d9acd7e');
        const machine = res.body;
        expect(machine.pricingId).toBe('3ba92095-3203-4888-a464-3c7d5d9acd7e');
        expect(res.statusCode).toBe(200);
    });

    test('PUT request to invalid machine id /machines/:machine-id/prices/:pm-id', async () => {
        const res = await request.put('/machines/57342663-909c-4adf-9829-6dd1a3aa9154/prices/3ba92095-3203-4888-a464-3c7d5d9acd7e');
        expect(res.statusCode).toBe(404);
    });

    test('GET request to /machines/:machine-id/prices', async () => {
        const res = await request.get('/machines/57342663-909c-4adf-9829-6dd1a3aa9143/prices');
        const pricingModel = res.body;
        expect(pricingModel.id).toBe('3ba92095-3203-4888-a464-3c7d5d9acd7e')
        expect(res.statusCode).toBe(200);
    });

    test('DELETE request to /machines/:machine-id/prices/:pm-id', async () => {
        const res = await request.delete('/machines/57342663-909c-4adf-9829-6dd1a3aa9143/prices/3ba92095-3203-4888-a464-3c7d5d9acd7e');
        const machine = res.body;
        expect(machine.pricingId).toBe(null);
        expect(res.statusCode).toBe(200);
    });

    test('DELETE request to invalid machine id /machines/:machine-id/prices/:pm-id', async () => {
        const res = await request.delete('/machines/57342663-909c-4adf-9829-6dd1a3aa9154/prices/3ba92095-3203-4888-a464-3c7d5d9acd7e');
        expect(res.statusCode).toBe(404);
    });

    test('DELETE request to invalid pricing model id /machines/:machine-id/prices/:pm-id', async () => {
        const res = await request.delete('/machines/57342663-909c-4adf-9829-6dd1a3aa9143/prices/3ba92095-3203-4888-a464-3c7d5d9acd8f');
        expect(res.statusCode).toBe(404);
    });

    test('DELETE sample data', async () => {
        await request.delete('/machines/57342663-909c-4adf-9829-6dd1a3aa9143')
        const res = await request.delete('/pricing-models/3ba92095-3203-4888-a464-3c7d5d9acd7e')
        expect(res.statusCode).toBe(200)
    })

});

afterAll(async () => {
    await shutdown();
});