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
    quantity: undefined | number,
    // productId: undefined | number,
    details: string,
    availableQuantity: undefined | number,
    images?: []
}
export interface cart{
    name: string,
    price: number,
    category: string,
    color: string,
    description: string,
    image: string,
    id: number | undefined,
    quantity: undefined | number,
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
    id: number | undefined
}
export interface categories{
    name: string,
    id?: number,
    image: string
}