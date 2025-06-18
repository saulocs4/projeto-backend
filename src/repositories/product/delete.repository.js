const prisma = require('../../config/prisma');

const deleteProductRepository = async (productId) => {
  try {
    
    await prisma.$transaction(async (prisma) => {
      
      const existingProduct = await prisma.product.findUnique({
        where: { id: productId },
        select: { id: true }, 
      });

      if (!existingProduct) {
        return false; 
      }

      
      await prisma.productCategory.deleteMany({
        where: { productId: productId },
      });
      await prisma.productImage.deleteMany({
        where: { productId: productId },
      });
      await prisma.productOption.deleteMany({
        where: { productId: productId },
      });

      // 3. Excluir o produto principal
      await prisma.product.delete({
        where: { id: productId },
      });
    });

    return true; 

  } catch (error) {
    
    console.error(`Erro no repositório ao deletar produto ${productId}:`, error);
    
    throw error;
  }
};

module.exports = {
  deleteProductRepository,
};