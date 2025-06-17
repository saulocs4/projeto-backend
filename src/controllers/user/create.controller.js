const userServices = require('../../services/user/create.service');

const createUserController = async (req, res) => {
  try {
    const { firstname, surname, email, password, confirmPassword } = req.body;

    if (!firstname || !surname || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'Todos os campos obrigatórios devem ser preenchidos.' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'As senhas não coincidem.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Formato de e-mail inválido.' });
    }

    // Chamada via userServices.createUser
    const newUser = await userServices.createUser({ firstname, surname, email, password });

    res.status(201).json(newUser);

  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    if (error.message === 'E-mail já cadastrado.') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Erro interno do servidor ao cadastrar usuário.' });
  }
};

module.exports = {
  createUserController
};