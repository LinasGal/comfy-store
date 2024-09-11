declare global {
  /*~ Here, declare things that go in the global namespace, or augment
   *~ existing declarations in the global namespace
   */
  interface CartItemProps {
    amount: number;
    cartID: string;
    company: string;
    image: string;
    price: string;
    productColor: string;
    productID: number;
    title: string;
  }

  interface MetaProps {
    pagination: {
      page: number;
      pageCount: number;
      pageSize: number;
      total: number;
    };
    categories: string[];
    companies: string[];
  }

  interface OrdersProps {
    id: number;
    attributes: {
      address: string;
      cartItems: CartItemProps[];
      createdAt: string;
      name: string;
      numItemsInCart: number;
      orderTotal: string;
      publishedAt: string;
      updatedAt: string;
    };
  }
}

export { MetaProps, OrdersProps };
