const prisma = require('../../config/prisma'); 


const updateUserRepository = async (userId, dataToUpdate) => {
  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: dataToUpdate,
    select: {
      id: true,
      firstname: true,
      surname: true,
      email: true,
    },
  });
  return updatedUser;
};

module.exports = {
  updateUserRepository,
};