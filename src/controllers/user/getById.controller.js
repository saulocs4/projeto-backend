const userServices = require('../../services/user/getById.service');

/**
 * Controlador para obter informações de um usuário pelo ID.
 * GET /v1/user/:id
 */
const getUserByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = parseInt(id, 10);
    if (isNaN(userId)) {
      return res.status(400).json({ message: 'ID de usuário inválido.' });
    }

    // Chamada via userServices.getUserById
    const user = await userServices.getUserById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Erro ao obter usuário por ID:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};

module.exports = {
  getUserByIdController
};