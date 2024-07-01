export interface ICreateProduct {
  name: string;
  price: number;
  category: string;
  attributes?: ICreateProductAttributes | undefined;
  status?: string;
  thumbnail?: File;
  media?: File[];
  description?: string;
}

export interface ICreateProductAttributes {
  weight?: number;
  sizes?: string[];
}

export interface SelectOption {
  label: string;
  value: string;
  checked: boolean;
}

export interface IProductImage {
  src: string;
  alt: string;
}

export interface IImagePreview extends File {
  preview: string;
}
