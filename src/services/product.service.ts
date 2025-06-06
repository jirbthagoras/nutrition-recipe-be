import { PrismaClient } from "@prisma/client";
import { logger } from "../utils/logging.utils";
import { Product } from "../utils/types.utils";

const prisma = new PrismaClient()

export const createProduct = async(
     product: Product
) => {
     // search if there is a product with those name
     const result = await prisma.products.findUnique({
          where: {
               name: product.Name.toLowerCase()
          }
     })

     if(result) {
          logger.info(`Product ${product.Name} already exists! Create Product skipped`)
          return result.id
     }

     // if not found, create a new product
     let newProduct = await prisma.products.create({
          data: {
               name: product.Name,
               fat: product.Fat,
               cloricValue: product.CloricValue,
               protein: product.Protein,
               iron: product.Iron,
               calcium: product.Calcium,
               thiamine: product.Thiamine
          }
     })
     logger.info(`New product created: ${newProduct.name}`)
     return newProduct.id
}