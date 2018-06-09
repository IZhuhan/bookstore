export interface CheckoutItem{
  id: string;
  price: number;
  name: string;
  sum: number;
  count: number;
}

export interface Order {
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  items: CheckoutItem[];
  status: string;
  totalPrice: number;
  isEdit?: boolean;
}
