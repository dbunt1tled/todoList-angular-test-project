export interface BookLinks {
  type: string;
  link: string;
}

export interface Book {
  id?: string;
  name: string;
  author: string;
  price: string;
  date: any;
  description: string;
  links: BookLinks[];
  isAddBasket?: boolean;
}
