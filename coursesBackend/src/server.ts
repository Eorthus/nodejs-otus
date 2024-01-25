import mongoose from 'mongoose'
import { dbUrl } from './constants/constants';
import app from './app';

const startApp = async () => {
  try {
    await mongoose.connect(dbUrl)
    app.listen(5000, () => console.log('server'))
  } catch (err) {
    console.log(err)
  }
}

startApp()