import type { Customer } from "../types/customer.types";
import type { Transaction, Package } from "../types/transaction.types";

const KEYS = {
  customers: "msw_customers",
  transactions: "msw_transactions",
  packages: "msw_packages",
  users: "msw_users",
};

const defaultCustomers: Customer[] = [
  { id: 1, name: "John Doe", email: "john@mail.com", phone: "08123456789" },
  { id: 2, name: "Jane Smith", email: "jane@mail.com", phone: "08987654321" },
];

const defaultPackages: Package[] = [
  { id: 1, name: "Paket 5GB", price: 25000, description: "5GB / 30 hari" },
  { id: 2, name: "Paket 10GB", price: 50000, description: "10GB / 30 hari" },
  { id: 3, name: "Paket 20GB", price: 85000, description: "20GB / 30 hari" },
  {
    id: 4,
    name: "Paket Unlimited",
    price: 150000,
    description: "Unlimited / 30 hari",
  },
];

const defaultTransactions: Transaction[] = [
  {
    id: 1,
    customerId: 1,
    packageName: "Paket 10GB",
    price: 50000,
    status: "success",
    date: "2025-06-01",
  },
  {
    id: 2,
    customerId: 2,
    packageName: "Paket 20GB",
    price: 85000,
    status: "pending",
    date: "2025-06-05",
  },
];

const defaultUsers = [
  {
    id: 1,
    username: "admin",
    password: "admin123",
    name: "Muhammad Sholehudin",
  },
];

export const seedStorage = () => {
  if (!localStorage.getItem(KEYS.customers)) {
    localStorage.setItem(KEYS.customers, JSON.stringify(defaultCustomers));
  }
  if (!localStorage.getItem(KEYS.packages)) {
    localStorage.setItem(KEYS.packages, JSON.stringify(defaultPackages));
  }
  if (!localStorage.getItem(KEYS.transactions)) {
    localStorage.setItem(
      KEYS.transactions,
      JSON.stringify(defaultTransactions),
    );
  }
  if (!localStorage.getItem(KEYS.users)) {
    localStorage.setItem(KEYS.users, JSON.stringify(defaultUsers));
  }
};

export const db = {
  get: <T>(key: keyof typeof KEYS): T[] => {
    return JSON.parse(localStorage.getItem(KEYS[key]) ?? "[]");
  },
  set: <T>(key: keyof typeof KEYS, data: T[]) => {
    localStorage.setItem(KEYS[key], JSON.stringify(data));
  },
  nextId: (key: keyof typeof KEYS): number => {
    const items = JSON.parse(localStorage.getItem(KEYS[key]) ?? "[]") as {
      id: number;
    }[];
    return items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1;
  },
};
