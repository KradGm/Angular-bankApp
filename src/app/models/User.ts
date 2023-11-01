export type Account = {
  id?: number;
  number: string;
  agency: string;
  balance: number;
  limit: number;
};

export type Card = {
  id?: number;
  number: string;
  limit: number;
};

export type Feature = {
  id?: number;
  icon: string;
  description: string;
};

export type History ={
  id?: number;
  value: number;
  userName:string;
  transactionDate:Date;
  description:String;
}
export type News = {
  id?: number;
  icon: string;
  description: string;
};

export type User = {
  id?: number;
  name: string;
  account: Account;
  card: Card;
  features: Feature[];
  news: News[];
  history:History[];
};
