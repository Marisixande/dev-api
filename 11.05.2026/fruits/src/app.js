import fs from "fs/promises";

import fs from "fs/promises";

async function readFruits() {
  const data = await fs.readFile("./fruits.json", "utf-8");
  const fruits = JSON.parse(data);
  return fruits;
}

async function writeFruits(fruits) {
  const data = JSON.stringify(fruits, null, 2);
  await fs.writeFile("./fruits.json", data, "utf-8");
}

async function getAllFruits() {
  const fruits = await readFruits();
  return fruits;
}

async function getFruitById(id) {
  const fruits = await readFruits();
  const fruit = fruits.find(item => item.id === Number(id));
  return fruit;
}


const fruits = await getAllFruits();
console.log(fruits);

const fruit = await getFruitById(1);
console.log(fruit);

const newFruit = await createFruit("Pera");
console.log(newFruit);

const editedFruit = await updateFruit(2, "Banana Prata");
console.log(editedFruit);

const removed = await deleteFruit(1);
console.log(removed);
