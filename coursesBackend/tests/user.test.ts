
import mongoose from 'mongoose';
import request from 'supertest';
import { dbUrl } from '../src/constants/constants';
import app from '../src/app'
import 'dotenv'

const requestWithSupertest = request(app);

describe('user test', () => {

    let testId = '65a683fb14393c319e7526b2'

        /* Connecting to the database before each test. */
        beforeEach(async () => {
            await mongoose.connect(dbUrl);
        });
    
        /* Closing database connection after each test. */
        afterEach(async () => {
            await mongoose.connection.close();
        });
    

    test('get users list works', async () => {
        const res = await requestWithSupertest.get("/api/users");
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    })

    test('get user works', async () => {
        const res = await requestWithSupertest.get(`/api/users/${testId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body._id).toBe(testId);
    })

    test('patch user works', async () => {
        const res = await requestWithSupertest.patch(`/api/users/${testId}`).send({login: 'admin'}).set('Content-Type', 'application/json').set('Accept', 'application/json');
        expect(res.statusCode).toBe(200);
    })

    test('patch user available courses works', async () => {
        const res = await requestWithSupertest.patch(`/api/users/${testId}/available-courses`).send({courseId: '65a6884c14393c319e7526b7'}).set('Content-Type', 'application/json').set('Accept', 'application/json');
        expect(res.statusCode).toBe(200);
    })
})