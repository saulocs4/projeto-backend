const userServices = require('../../services/user');

/**
 * Controlador para atualizar as informações de um usuário.
 * PUT /v1/user/:id
 */
const updateUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = parseInt(id, 10);
    const userData = req.body;

    if (isNaN(userId)) {
      return res.status(400).json({ message: 'ID de usuário inválido.' });
    }

    if (Object.keys(userData).length === 0) {
      return res.status(400).json({ message: 'Nenhum dado fornecido para atualização.' });
    }

    if (userData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userData.email)) {
        return res.status(400).json({ message: 'Formato de e-mail inválido.' });
      }
    }

    // Chamada via userServices.updateUser
    await userServices.updateUser(userId, userData);

    res.status(204).send();

  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    if (error.message === 'Usuário não encontrado.') {
      return res.status(404).json({ message: error.message });
    }
    if (error.message === 'E-mail já cadastrado por outro usuário.') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Erro interno do servidor ao atualizar usuário.' });
  }
};

module.exports = {
  updateUserController,
};