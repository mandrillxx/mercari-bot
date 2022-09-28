export {};

declare global {
  type Listing = {
    name: string;
    image: string;
    description: string;
    brand: {
      name: string;
    };
    offers: {
      price: number;
      itemCondition: string;
      url: string;
    };
    delivery?: number;
    reviews?: number;
    sales?: number;
  };
}
