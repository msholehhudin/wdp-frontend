export interface Transaction {
  id: number;
  customerId: number;
  packageName: string;
  price: number;
  status: "success" | "pending" | "failed";
  date: string;
}

export interface Package {
  id: number;
  name: string;
  price: number;
  description: string;
}
