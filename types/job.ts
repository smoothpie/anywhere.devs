export type Job = {
  id: number;
  title: string;
  link: string;
  description: string;
  type: string;
  remoteIn: string;
  visaSponsorship: boolean;
  salary: string;
  skills: string[];
  company?: any;
};

export type JobFormValues = {
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

export type Company = {
  id: number;
  name: string;
  logo: string;
  description: string;
  website: string;
  headquarters: string;
}