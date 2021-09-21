export interface IProduct {
  id: string;
  name: string;
  images: string;
  price: number;
  category: {
    id: string;
    name: string;
  };
  description: string;
}
