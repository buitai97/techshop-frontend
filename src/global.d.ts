export { }

declare global {
    interface IProduct {
        id: number,
        name: string,
        price: number,
        quantity: number,
        detailDesc?: string,
        brand?: string,
        image?: string,
        shortDesc?: string,
        sold?: number,
        category?: string
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
        cartId: number,
        userId: number,
        cartItems: ICartItem[]
    }

    interface ICartItem {
        id: number,
        product: IProduct,
        quantity: number
    }

    interface IAddress {
        street: string,
        city: string,
        state: string,
        zipCode: string
    }

    interface IPaymentDetails {
        cardNumber: string,
        cvv: string,
        expiry: string,
        paymentMethod: string
    }

    interface IOrder {

    }
}