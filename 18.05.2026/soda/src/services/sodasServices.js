import { pool } from "../config/db.js";

class sodasServices {
  async getAll() {
    const query = "SELECT * FROM public.maria_refrigerante";
    const soda = await pool.query(query);
    return soda.rows || [];
  }

  async getById(id) {
    const soda = await pool.query("SELECT * FROM maria_refrigerante WHERE id_refri = $1", [id])
    console.log("cheguei aqui", soda.rows)
    return soda.rows
  }

  async createSoda(data) {
    try {
      const soda = await pool.query("INSERT INTO public.maria_refrigerante (nome_refri, quantidade) values ($1, $2) returning *", [data.nome_refri, data.quantidade]);
      console.log("cheguei aqui", soda.rows)
      return(soda.rows)
    } catch (error) {
      console.error(error)
    }
  }

  async updateSoda(id, data) {
    try {
      const soda = await pool.query(
        "UPDATE public.maria_refrigerante	SET nome_refri=($1), quantidade=($2)	WHERE id_refri=($3)",
        [data.nome_refri, data.quantidade, id]
      );
      console.log("cheguei aqui update", soda.rows);
      return soda.rows;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteSoda(id) {
    const soda = await pool.query(" DELETE FROM public.maria_refrigerante WHERE id_refri = $1 ", [id]);
    console.log("Refri deletado com sucesso")
    return soda

  }
}

export const sodaServices = new sodasServices();
