export type Term = {
  term: number;
  amount: number;
};

export type Product = {
  id: string;
  name: string;
  headline: string;
  price: number;
  images: string[];
  details: string[];
  is_active: boolean;
  is_sold: boolean;
  is_featured: boolean;
  financing_details: {
    downpayment: number;
    terms: Term[];
  };
};
