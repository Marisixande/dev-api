import express from "express";
import { sodaServices } from "../services/sodasServices.js";

export const sodasRoute = express.Router();

// 1- pegar todos os refris
sodasRoute.get("/", async (req, res) => {
  try {
    const soda = await sodaServices.getAll();
    res.status(200).json(soda);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2-pegar refri pelo id
sodasRoute.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const soda = await sodaServices.getById(id);

    if (!soda || soda.length === 0) {
      return res.status(404).json({ message: "Refri não encontrado" });
    }
    res.status(200).json(soda);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3-Criar novo refri
sodasRoute.post("/", async (req, res) => {
  try {
    const nome  = req.body;
    console.log("cheguei aqui2")
    if (!nome) {
      return res.status(400).json({ message: "O nome é obrigatório" });
    }
    const newSoda = await sodaServices.createSoda(nome);
    res.status(201).json(newSoda);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// 4-Atualizar nome do refri
sodasRoute.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const data = req.body;

    const updated = await sodaServices.updateSoda(id, data);

    if (!updated) {
      return res.status(404).json({ message: "Refri não encontrado" });
    }
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 5-Atualizar todo o refri
sodasRoute.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const data = req.body;

    const updated = await sodaServices.updateSoda(id, data);

    if (!updated) {
      return res.status(404).json({ message: "Refri não encontrado" });
    }
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 6- Deletar Refri
sodasRoute.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await sodaServices.deleteSoda(id);

    if (!deleted) {
      return res.status(404).json({ message: "Refri não encontrado" });
    }
    res.status(200).json({ message: "Refri deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
