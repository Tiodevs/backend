import  prismaClient  from "../../prisma"

interface ItemRequest {
  product_id: string
}

class RemoveProductService {
  async execute({ product_id }: ItemRequest) {

    const product = await prismaClient.product.delete({
      where: {
        id: product_id
      }
    })

    return product
  }
}

export { RemoveProductService }