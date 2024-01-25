
import mongoose from 'mongoose';
import request from 'supertest';
import { dbUrl } from '../src/constants/constants';
import app from '../src/app'
import 'dotenv'

const requestWithSupertest = request(app);

describe('course test', () => {

    let testId = ''

    /* Connecting to the database before each test. */
    beforeEach(async () => {
        await mongoose.connect(dbUrl);
    });

    /* Closing database connection after each test. */
    afterEach(async () => {
        await mongoose.connection.close();
    });

    test('get courses list works', async () => {

        const res = await requestWithSupertest.get("/api/courses");
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    })

    test('add course works', async () => {
        const res = await requestWithSupertest.post("/api/courses").send({form:{title:'test'}, userId:'65a683fb14393c319e7526b2'}).set('Content-Type', 'application/json').set('Accept', 'application/json')
        expect(res.statusCode).toBe(200);
        expect(res.body.data.title).toBe('test')
        testId = res.body.data._id
    })

    test('get course works', async () => {
        const res = await requestWithSupertest.get(`/api/courses/${testId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body._id).toBe(testId);
    })

    test('patch course works', async () => {
        const res = await requestWithSupertest.patch(`/api/courses/${testId}`).send({title: 'test2'}).set('Content-Type', 'application/json').set('Accept', 'application/json');
        expect(res.statusCode).toBe(200);
    })

    test('patch rating works', async () => {
        const res = await requestWithSupertest.patch(`/api/courses/${testId}/rating`).send({rating: 5}).set('Content-Type', 'application/json').set('Accept', 'application/json');
        expect(res.statusCode).toBe(200);
    })

    test('patch comments works', async () => {
        const res = await requestWithSupertest.patch(`/api/courses/${testId}/comments`).send({author:'test', date: new Date(), description: 'test' }).set('Content-Type', 'application/json').set('Accept', 'application/json');
        expect(res.statusCode).toBe(200);
    })

    test('delete course works', async () => {
        const res = await requestWithSupertest.delete(`/api/courses/${testId}`);
        expect(res.statusCode).toBe(200);
    })
})