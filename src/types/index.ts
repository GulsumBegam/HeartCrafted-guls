export interface GiftCollection {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  featured: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  story: string;
  rating: number;
  photoUrl?: string;
  giftType?: string;
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  title: string;
  category: string;
  description?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface NewsletterFormData {
  email: string;
  name?: string;
}

export interface CustomOrderFormData {
  giftType: string;
  recipientName: string;
  occasion: string;
  story: string;
  theme?: string;
  email: string;
  phone?: string;
}

export type OrderStatus = "PENDING" | "CONFIRMED" | "CRAFTING" | "SHIPPED" | "DELIVERED";

export interface Order {
  id: string;
  giftType: string;
  recipientName: string;
  occasion: string;
  status: OrderStatus;
  createdAt: Date;
  email: string;
}
