class FruitsServices {
     async getAll() {
        const fruits = await pool.query('SELECT * FROM public.maria_frutinhas' );
        return fruits || [];
    }

    async getById(id) {
        const fruits = await readfruits();
        return (fruits || []).find(item => item.id === Number(id)) || null;
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
