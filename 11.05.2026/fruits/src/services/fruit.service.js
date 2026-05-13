import { pool } from './db.js';

class FruitsServices {
     async getAll() {
      const query = 'SELECT * FROM public.maria_frutinhas';
        const fruits = await pool.query(query);
        return fruits.rows || [];
    }

    async getById(id) {
      const query = 'SELECT * FROM public.maria_frutinhas WHERE id = $1';//WHERE id = $1: Filters the results to only include rows where the id column matches the value assigned to the first parameter placeholder, $1 ---> thats what the AI said when i asked about it so i hope its true lol
        const fruits = await pool.query(query, [id]);
        return (fruits.rows[0] || []);
    }

  async createFruit(nome) {
    const fruits = await readFruits();

    const newFruit = {
      id: fruits.length > 0 ? fruits[fruits.length - 1].id + 1 : 1,
      nome: nome,
    };

    fruits.push(newFruit);

    await writeFruits(fruits);

    return newFruit;
  }

  async updateFruit(id, novoNome) {
    const fruits = await readFruits();

    const index = fruits.findIndex((item) => item.id === Number(id));

    if (index === -1) {
      return null;
    }

    fruits[index].nome = novoNome;

    await writeFruits(fruits);

    return fruits[index];
  }

  async deleteFruit(id) {
    const fruits = await readFruits();

    const index = fruits.findIndex((item) => item.id === Number(id));

    if (index === -1) {
      return false;
    }

    fruits.splice(index, 1);

    await writeFruits(fruits);

    return true;
  }
}

export const fruitsServices = new FruitsServices();
