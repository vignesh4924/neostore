/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  category: string;
  image: string;
  images?: string[];
  detailImages?: string[];
  rating: number;
  reviews: number;
  featured: boolean;
  stock: number;
  offers?: string[];
  highlights?: string[];
  warranty?: string;
  replacement?: string;
  cod?: boolean;
  specifications?: { [key: string]: string };
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'pending' | 'shipped' | 'delivered';
}
