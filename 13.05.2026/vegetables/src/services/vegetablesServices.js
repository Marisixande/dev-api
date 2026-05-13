import { pool } from "../config/db.js";

class VegetablesServices {
  async getAll() {
    const query = "SELECT * FROM public.maria_leguminho";
    const vegetable = await pool.query(query);
    return vegetable.rows || [];
  }

  async getById(id) {
    const query = ("SELECT * FROM public.maria_leguminho WHERE id = $1", [id]); //WHERE id = $1: Filters the results to only include rows where the id column matches the value assigned to the first parameter placeholder, $1 ---> thats what the AI said when i asked about it so i hope its true lol
    const vegetable = await pool.query(query, [id]);
    return vegetable.rows[0] || [];
  }

  async createVegetable(nome) {
    const query =
      "INSERT INTO public.maria_leguminho (nome_legume, quantidade ) VALUES ($1, $2) RETURNING *";
    const values = [nome_legume, quantidade];
    const vegetable = await pool.query(query, values);

    const newVegetable = {
      id: [0],
      nome: nome,
      quantidade: quantidade,
    };

    vegetable.push(newVegetable);

    return newVegetable.rows || [];
  }

  async updateVegetable(id, data) {
    try {
      console.log("dataservice", data);

      const res = await pool.query(
        "UPDATE public.maria_leguminho	SET nome_legume=($1), quantidade=($2)	WHERE id_legume=($3)",
        [data.nome_legume, data.quantidade, id],
      );

      console.log(res.rows);

      return res.rows;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteVegetable(id) {
    const query = (" DELETE FROM users WHERE id = $ 1 ", [id]);
    const vegetable = await pool.query(query, [id]);

    const index = vegetable.rows[0];

    if (index === -1) {
      return false;
    }

    vegetable.splice(index, 1);

    return true;
  }
}

export const vegetablesServices = new VegetablesServices();
