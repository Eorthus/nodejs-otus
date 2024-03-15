
import mongoose from 'mongoose';
import request from 'supertest';
import { dbUrl } from '../src/constants/constants';
import app from '../src/app'
import 'dotenv'

const requestWithSupertest = request(app);

let testToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImxvZ2luIiwiaWF0IjoxNzA2Nzk0MTA5LCJleHAiOjE3MDY3OTc3MDl9.9K-TbWEZpuqPt2gP4udMYrxo3LKaO0n5Bq0te-HM6jA'
let testLogin = Math.random()
let testPass = 'test2'
let userId = ''

describe('user test', () => {

        /* Connecting to the database before each test. */
        beforeEach(async () => {
            await mongoose.connect(dbUrl);
        });
    
        /* Closing database connection after each test. */
        afterEach(async () => {
            await mongoose.connection.close();
        });
    

        test('register user works', async () => {
            const res = await requestWithSupertest.post("/api/auth/register").send({login:testLogin, password:testPass, confirmpassword:testPass}).set('Content-Type', 'application/json').set('Accept', 'application/json')
            expect(res.statusCode).toBe(200);
            userId = res.body._id
        })

        
        test('login user works', async () => {
            const res = await requestWithSupertest.post("/api/auth/login").send({login:testLogin, password:testPass}).set('Content-Type', 'application/json').set('Accept', 'application/json')
            expect(res.statusCode).toBe(200);
            testToken = res.body.token
        })
})

export const token = testToken
export const id = userId