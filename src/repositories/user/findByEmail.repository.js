const prisma = require('../../config/prisma');

const findUserByEmailRepository = async (email) => {
  const user = await prisma.user.findUnique({
    where: { email: email },
    select: {
      id: true,
      firstname: true,
      surname: true,
      email: true,
      password: true,
    },
  });
  return user;
};

module.exports = {
  findUserByEmailRepository,
};