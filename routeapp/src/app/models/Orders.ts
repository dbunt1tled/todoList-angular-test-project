export interface Products {
  id: string;
  count: string;
  name: string;
  summ: string;
}

export interface Orders {
  id?: string;
  name: string;
  email: string;
  telephone: string;
  address: string;
  products: Products[];
  total: string;
  date: any;
  status: string;
  isEdit?: boolean;
}
