export type User = {
  id: number;
  name: string;
  account: {
    id: number;
    number: string;
    agency: string;
    balance: number;
    limit: number;
  };
  card: {
    id: number;
    number: string;
    limit: number;
  };
  features: {
    id: number;
    icon: string;
    description: string;
  }[];
  news: {
    id: number;
    icon: string;
    description: string;
  }[];
};
