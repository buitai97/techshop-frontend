export {};

declare global {
  interface IProduct {
    id: number;
    name: string;
    price: number;
    quantity: number;
    detailDesc?: string;
    brand?: string;
    imageKey?: string;
    shortDesc?: string;
    sold?: number;
    category?: string;
  }
  interface IUser {
    id: number;
    username: string;
    email: string;
    avatar: string;
    name: string;
    role: {
      id: number;
      name: string;
      description: string;
    };
  }

  interface ICart {
    cartId: number;
    userId: number;
    cartItems: ICartItem[];
  }

  interface ICartItem {
    id: number;
    product: IProduct;
    quantity: number;
  }

  interface IAddress {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  }

  interface IPaymentDetails {
    cardNumber: string;
    CVV: string;
    expDate: string;
    paymentMethod: string;
  }

  interface IOrder {
    id: number;
    totalPrice: number;
    addressId: number;
    name: string;
    phone: string | null;
    email: string;
    date: string;
    userId: number;
    orderItems: {
      id: number;
      price: number;
      quantity: number;
      orderId: number;
      productId: number;
    }[];
  }

  interface IAppData {
    user?: IUser | null;
    cart?: ICart | null;
    cartSum?: number;
    isPageLoading: boolean;
    isAuthenticated: boolean;
    setUser: (v: IUser | null) => void;
    setCartSum: React.Dispatch<React.SetStateAction<number>>;
    setCart: (v: ICart | null) => void;
    setIsPageLoading: (v: boolean) => void;
    setIsAuthenticated: (v: boolean) => void;
  }
}
