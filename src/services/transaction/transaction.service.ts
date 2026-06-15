import type { Transaction, Package } from "../../types/transaction.types";

const BASE = "/api";

export const transactionService = {
  getAll: async (): Promise<Transaction[]> => {
    const res = await fetch(`${BASE}/transactions`);
    return res.json();
  },
  create: async (data: Omit<Transaction, "id">): Promise<Transaction> => {
    const res = await fetch(`${BASE}/transactions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  update: async (
    id: number,
    data: Omit<Transaction, "id">,
  ): Promise<Transaction> => {
    const res = await fetch(`${BASE}/transactions/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  remove: async (id: number): Promise<void> => {
    await fetch(`${BASE}/transactions/${id}`, { method: "DELETE" });
  },
};

export const packageService = {
  getAll: async (): Promise<Package[]> => {
    const res = await fetch(`${BASE}/packages`);
    return res.json();
  },
};
