const { hashPassword } = require('../../utils/hash');
const userRepository = require('../../repositories/user');

const createUser = async (userData) => {
  const { firstname, surname, email, password } = userData;

  // 1. Verificar se o e-mail já existe 
  const existingUser = await userRepository.findUserByEmailRepository(email);

  if (existingUser) {
    throw new Error('E-mail já cadastrado.');
  }

  // 2. Hash da senha antes de salvar
  const hashedPassword = await hashPassword(password);

  // 3. Preparar dados para o repositório (inclui a senha hasheada)
  const dataToCreate = {
    firstname,
    surname,
    email,
    password: hashedPassword,
  };

  // 4. Criar o usuário no banco de dados 
  const newUser = await userRepository.createUserRepository(dataToCreate);

  return newUser;
};

module.exports = {
  createUser,
};