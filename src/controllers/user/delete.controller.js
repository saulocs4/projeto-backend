const userServices = require('../../services/user');
/**
 * Controlador para deletar um usuário.
 * DELETE /v1/user/:id
 */
const deleteUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = parseInt(id, 10);

    if (isNaN(userId)) {
      return res.status(400).json({ message: 'ID de usuário inválido.' });
    }

    // ATUALIZADO: Chamada via userServices.deleteUser
    await userServices.deleteUser(userId);

    res.status(204).send();

  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    if (error.message === 'Usuário não encontrado.') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: 'Erro interno do servidor ao deletar usuário.' });
  }
};

module.exports = {
  deleteUserController,
};