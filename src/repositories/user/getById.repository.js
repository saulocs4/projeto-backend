const prisma = require('../../config/prisma');

const getUserByIdRepository = async (userId) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      firstname: true,
      surname: true,
      email: true,
    },
  });
  return user;
};

module.exports = {
  getUserByIdRepository,
};