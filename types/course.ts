export type Course = {
  id: string;
  title: string;
  slug: string;
  description: string;
  link: string;
  category: string;
  price?: Price;
  platform: string;
  author?: string;
  level: string;
  certificate: boolean;
  createdAt: Date;
};

export type CourseFormValues = {
  id?: string;
  title: string;
  slug: string;
  description: string;
  link: string;
  category: string | null;
  isPaid?: boolean;
  price?: Price | null;
  platform: string | null;
  author?: string;
  level: string | null;
  certificate: boolean;
};

export type Price = {
  currency?: string;
  amount?: number;
  type?: string
}