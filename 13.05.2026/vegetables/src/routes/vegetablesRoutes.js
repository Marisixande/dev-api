import express from "express";
import { vegetablesServices } from "../services/vegetablesServices.js";

export const vegetableRoute = express.Router();

// 1. GET ALL - Obter todas as verduras
vegetableRoute.get("/", async (req, res) => {
  try {
    const vegetable = await vegetablesServices.getAll();
    res.status(200).json(vegetable);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. GET BY ID - Obter verdura por ID
vegetableRoute.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const vegetable = await vegetablesServices.getById(id);

    if (!vegetable || vegetable.length === 0) {
      return res.status(404).json({ message: "Verdura não encontrada" });
    }
    res.status(200).json(vegetable);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. CREATE - Criar nova verdura
vegetableRoute.post("/", async (req, res) => {
  try {
    const { nome } = req.body;
    if (!nome) {
      return res.status(400).json({ message: "O nome é obrigatório" });
    }
    const newVegetable = await vegetablesServices.createVegetable(nome);
    res.status(201).json(newVegetable);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// vegetableRoute.patch("/vegetables/:id", async (req, res) => {
//   const { id } = req.params;
//   const campos = req.body; // Captura tudo o que foi enviado no body

//   // Lista de chaves/propriedades enviadas
//   const keys = Object.keys(campos);

//   if (keys.length === 0) {
//     return res
//       .status(400)
//       .json({ error: "Nenhum campo enviado para atualização." });
//   }

//   try {
//     // Cria dinamicamente trechos como: "nome = $1", "preco = $2"
//     const setClause = keys
//       .map((key, index) => `"${key}" = $${index + 1}`)
//       .join(", ");

//     // Os valores dos campos dinâmicos
//     const queryValues = Object.values(campos);

//     // O ID se torna o último parâmetro da query ($3, $4, etc.)
//     const idPosicao = queryValues.length + 1;
//     queryValues.push(Number(id));

//     const queryText = `UPDATE vegetables SET ${setClause} WHERE id = $${idPosicao} RETURNING *`;

//     const result = await pool.query(queryText, queryValues);

//     if (result.rowCount === 0) {
//       return res.status(404).json({ error: "Vegetal não encontrado." });
//     }

//     return res.json(result.rows[0]);
//   } catch (error) {
//     console.error(error);
//     return res
//       .status(500)
//       .json({ error: "Erro ao atualizar parcialmente no banco de dados." });
//   }
// });

// 4. PATCH - Atualizar nome da verdura
vegetableRoute.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const data = req.body;

    const updated = await vegetablesServices.updateVegetable(id, data);

    if (!updated) {
      return res.status(404).json({ message: "Verdura não encontrada" });
    }
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 5. DELETE - Deletar verdura
vegetableRoute.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await vegetablesServices.deleteVegetable(id);

    if (!deleted) {
      return res.status(404).json({ message: "Verdura não encontrada" });
    }
    res.status(200).json({ message: "Verdura deletada com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
