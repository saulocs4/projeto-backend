const prisma = require('../../config/prisma');

const createUserRepository = async (userData) => {
  const newUser = await prisma.user.create({
    data: userData, 
    select: {
      id: true,
      firstname: true,
      surname: true,
      email: true,
    },
  });
  return newUser;
};

module.exports = {
  createUserRepository,
};