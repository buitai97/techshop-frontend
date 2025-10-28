export { }

declare global {
    interface IProduct {
        detailDesc: string,
        brand: string,
        id: number,
        image: string,
        name: string,
        price: number,
        quantity: number,
        shortDesc: string,
        sold?: number,
        category: string
    }
    interface IUser {
        id: number,
        username: string,
        email: string,
        avatar: string,
        name: string,
        role: {
            id: number,
            name: string,
            description: string
        }
    }

    interface ICart {
        userId: number,
        items: ICartItem[]
    }

    interface ICartItem {
        product: IProduct,
        quantity: number
    }
}