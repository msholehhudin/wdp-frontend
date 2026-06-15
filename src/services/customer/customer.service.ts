import type { Customer } from "../../types/customer.types";

const BASE = "http://localhost:3001";

export const customerService = {
  getAll: async (): Promise<Customer[]> => {
    const res = await fetch(`${BASE}/customers`);
    return res.json();
  },
  create: async (data: Omit<Customer, "id">): Promise<Customer> => {
    const res = await fetch(`${BASE}/customers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  update: async (id: number, data: Omit<Customer, "id">): Promise<Customer> => {
    const res = await fetch(`${BASE}/customers/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  remove: async (id: number): Promise<void> => {
    await fetch(`${BASE}/customers/${id}`, { method: "DELETE" });
  },
};
