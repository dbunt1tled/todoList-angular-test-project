export interface BookLinks {
  type: string;
  link: string;
}

export interface Book {
  id?: string;
  name: string;
  author: string;
  description: string;
  link: BookLinks[];
}
