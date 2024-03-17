import mongoose from "mongoose";
import chalk from "chalk";

const idError = "Invalid id";

const errorHandler = () => console.log(chalk.red(idError));

export const connectToDbHandler = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/grocery");
  } catch (err) {
    console.log(err);
  }
};

export const disconnectDbHandler = async () => {
  try {
    await mongoose.disconnect();
  } catch (err) {
    console.log(err);
  }
};

export const listSchema = new mongoose.Schema({
  title: String,
});

export const groceryDb = mongoose.model("grocery", listSchema);

// actions
export const getListAction = async () => {
  const data = await groceryDb.find();

  return JSON.parse(JSON.stringify(data));
};
//
export const postListAction = async (item: string) => {
  const submitItem = { title: item };
  const data = await groceryDb.create(submitItem);
  return JSON.parse(JSON.stringify(data));
};
//
export const deleteListAction = async (index: number) => {
  if (index < 1) {
    errorHandler();
    return;
  }

  const items = await groceryDb.find();

  const id = items[index - 1]?._id;

  if (!id) {
    errorHandler();
    return;
  }

  const data = await groceryDb.findByIdAndDelete(id);

  return JSON.parse(JSON.stringify(data));
};
//
export const deleteAllListAction = async () => {
  const data = await groceryDb.deleteMany();

  return data;
};
//
export const patchListAction = async (index: number, item: string) => {
  if (index < 1) {
    errorHandler();
    return;
  }

  const items = await groceryDb.find();

  const id = items[index - 1]?._id;

  if (!id) {
    errorHandler();
    return;
  }

  const data = await groceryDb.findByIdAndUpdate(id, { $set: { name: item } });

  return JSON.parse(JSON.stringify(data));
};
