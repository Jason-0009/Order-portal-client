type Product = {
    id: string,
    imageUrl: string,
    name: Record<string, string>,
    ingredients: Record<string, string[]>,
    price: number
}

export default Product
