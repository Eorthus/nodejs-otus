import { getListAction, postListAction, deleteListAction, patchListAction, deleteAllListAction } from "./db";
import chalk from "chalk";

const errorHandler = ()=> console.log(chalk.red("Something went wrong"))

export const getListHandler = async () => {
  const list = await getListAction();

  if (list?.length) {
    const showList = list.map((el: { title: string }) => el.title);
    console.log(chalk.green("List of your products:"));

    showList.forEach((el:string,index:number)=>{
        console.log(chalk.green(`${index}. ${el}`))
    })
    return;
  }

  console.log(chalk.red("Your list is empty!"));
};

export const postListHandler = async (item: string) => {
  const data = await postListAction(item);

  if (data) {
    console.log(chalk.green("Option was added successfully: ", data.title));
    return;
  }

  errorHandler()
};

export const deleteListHandler = async (index: number) => {
  const data = await deleteListAction(index);

  if (!data) {
    errorHandler()
    return;
  }

  console.log(chalk.green(`Option #${index} was deleted successfully: ${data.title}`));
};


export const deleteAllListHandler = async () => {
    const data = await deleteAllListAction()
  
    if (!data) {
      errorHandler()
      return;
    }
  
    console.log(chalk.green(`List was deleted successfully`));
  };

export const patchListHandler = async (index: number, item:string) => {
    const data = await patchListAction(index, item);
  
    if (!data) {
       errorHandler()
      return;
    }
  
    console.log(chalk.green(`Item #${index} was changed from ${data.title} to ${item}`));
  };
