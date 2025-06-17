const prisma = require('../../config/prisma'); 

const deleteUserRepository = async (userId) => {
  const deletedUser = await prisma.user.delete({
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
  return deletedUser;
};

module.exports = {
  deleteUserRepository,
};