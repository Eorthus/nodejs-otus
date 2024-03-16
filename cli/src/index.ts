#!/usr/bin/env node
import { Command } from "commander";
import {
  getListHandler,
  postListHandler,
  deleteListHandler,
  patchListHandler,
  deleteAllListHandler,
} from "./methods";
import { connectToDbHandler, disconnectDbHandler } from "./db";

const program = new Command();

console.clear();

program
  .name("Grocery list")
  .description("Cli for managing list of your grocery options")
  .version("1.0")
  .hook("preAction", () => {
    connectToDbHandler();
  })
  .hook("postAction", () => {
    disconnectDbHandler();
  });

program
  .command("add")
  .description("add option to list")
  .argument("<string>", "option for list")
  .action(async (str) => {
    await postListHandler(str);
  });

program
  .command("delete")
  .description("delete option from list")
  .argument("<number>", "number of option for deleting")
  .action(async (num) => {
    await deleteListHandler(num);
  });

program
  .command("change")
  .description("change option from list")
  .argument("<number>", "number of option for changing")
  .argument("<string>", "new option")
  .action(async (index, item) => {
    await patchListHandler(index, item);
  });

program
  .command("show")
  .description("show list of products")
  .action(async () => {
    await getListHandler();
  });

program
  .command("delete-all")
  .description("delete list of products")
  .action(async () => {
    await deleteAllListHandler();
  });

program.addHelpText("after", `Thanks for using`);

program.parse(process.argv);
