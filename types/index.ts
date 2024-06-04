// Database models related

export type User = {
  id: string;
  last_login: null;
  is_superuser: boolean;
  email: string;
  is_active: boolean;
  is_staff: boolean;
  is_customer: boolean;
  groups: any[];
  user_permissions: any[];
};

export type Profile = {
  id: string;
  full_name: string;
  mobile_number: string;
  shipping_address: string;
};

export type Customer = {
  id: string;
  user: User;
  profile: Profile;
};

export type Product = {
  id: string;
  attributes: Attributes;
  options: Option[];
  price: number;
  created_at: string;
  updated_at: string;
  name: string;
  description: null;
  caption: null;
  thumbnail: string;
  category: Category;
  media: Media[];
};

export type Option = {
  id: string;
  attributes: Attributes;
  price: number;
  created_at: string;
  updated_at: string;
  thumbnail: string;
  media: Media[];
};

export type Attributes = {
  id: string;
  weight: number;
  created_at: string;
  updated_at: string;
  material: Material;
  sizes: string[];
};

export type Media = {
  image: string;
};

export type Category = {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  description: null;
};

export type Material = {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  description: null;
};

export type CartItem = {
  id: string;
  created_at: string;
  updated_at: string;
  product: Product;
  quantity: number;
  subtotal: number;
  selectedSize: string;
  selectedMaterial: string;
};

export type Cart = {
  id: string;
  created_at: string;
  updated_at: string;
  items: CartItem[];
  quantity: number;
  subtotal: number;
};

export type Order = {
  id: string;
  created_at: string;
  updated_at: string;
  customer: Customer;
  cart: Cart;
  ref_id: string;
  status: "PENDING" | "SHIPPED" | "CANCELLED" | "DELIVERED";
  quantity: number;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
};
