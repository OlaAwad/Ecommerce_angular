export interface SignUp{
    name: string,
    password: string,
    email: string
}

export interface Login{
    email: string,
    password: string
}

export interface user{
    name: string,
    email: string,
    mobile: string,
    defaultAddress: string,
    secondAddress: string,
    id: number
}

export interface product {
    name: string,
    price: number,
    category: string,
    color: string,
    description: string,
    image: string,
    id: number,
    quantity:  number,
    // productId: undefined | number,
    details: string,
    availableQuantity: undefined | number,
    images: string[]
}
export interface cart{
    name: string,
    price: number,
    category: string,
    color: string,
    description: string,
    image: string,
    id: number | undefined,
    quantity:  number,
    userId: number,
    productId: number,
    availableQuantity: undefined | number,
    details: string
}
export interface priceSummary{
    price: number,
    discount: number,
    tax: number,
    delivery: number,
    total: number
}
export interface order{
    email: string,
    address: string,
    contact: string,
    totalPrice: number,
    userId: string,
    id: number | undefined,
    productName: string,
    productImage: string,
    productQuantity: number
}
export interface categories{
    name: string,
    id?: number,
    image: string
}