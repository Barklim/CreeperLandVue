export interface CardItem {
  id: number,
  category: string,
  title: string,
  image: string,
  actions: number,
  cost: number,
  description: string,
}

export interface CategorieItem {
  id: number,
  name: string
}

export interface CartItem {
  id: number,
  cost: number,
  categoryName,
  image : string,
  name: string,
  quantityCount: number
}