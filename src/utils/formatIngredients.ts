type Ingredients = { [key: string]: string[] }

const formatIngredients = (ingredients: Ingredients, locale: string | undefined): string[] => {
    if (!locale || !ingredients[locale]) return []

    return ingredients[locale].map((ingredient, index) =>
        index === 0 ? ingredient : ingredient.toLowerCase()
    )
}

export default formatIngredients