
import mongoose from 'mongoose';
import request from 'supertest';
import { dbUrl } from '../src/constants/constants';
import app from '../src/app'
//@ts-ignore
import { token as testToken, id as userId } from './auth.test';
import 'dotenv'

const requestWithSupertest = request(app);

describe('user test', () => {

        /* Connecting to the database before each test. */
        beforeEach(async () => {
            await mongoose.connect(dbUrl);
        });
    
        /* Closing database connection after each test. */
        afterEach(async () => {
            await mongoose.connection.close();
        });


    test('get users list works', async () => {
        console.log(testToken)
        const res = await requestWithSupertest.get("/api/users").set('Authorization', `Bearer ${testToken}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    })

    test('get user works', async () => {
        const res = await requestWithSupertest.get(`/api/users/${userId}`).set('Authorization', `Bearer ${testToken}`);
        expect(res.statusCode).toBe(200);
        expect(res.body._id).toBe(userId);
    })

    test('patch user works', async () => {
        const res = await requestWithSupertest.patch(`/api/users/${userId}`).send({login: 'admin'}).set('Content-Type', 'application/json').set('Accept', 'application/json').set('Authorization', `Bearer ${testToken}`);
        expect(res.statusCode).toBe(200);
    })

    test('patch user available courses works', async () => {
        const res = await requestWithSupertest.patch(`/api/users/${userId}/available-courses`).send({courseId: '65a6884c14393c319e7526b7'}).set('Content-Type', 'application/json').set('Accept', 'application/json').set('Authorization', `Bearer ${testToken}`);
        expect(res.statusCode).toBe(200);
    })
})