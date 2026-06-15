import { http, HttpResponse } from "msw";
import { db } from "../lib/seed";
import type { Customer } from "../types/customer.types";
import type { Transaction } from "../types/transaction.types";

const BASE = "/api";

export const handlers = [
  // ── CUSTOMERS ──────────────────────────────────────────
  http.get(`${BASE}/customers`, () => {
    return HttpResponse.json(db.get("customers"));
  }),

  http.post(`${BASE}/customers`, async ({ request }) => {
    const body = (await request.json()) as Omit<Customer, "id">;
    const customers = db.get<Customer>("customers");
    const newItem = { ...body, id: db.nextId("customers") };
    db.set("customers", [...customers, newItem]);
    return HttpResponse.json(newItem, { status: 201 });
  }),

  http.put(`${BASE}/customers/:id`, async ({ params, request }) => {
    const id = Number(params.id);
    const body = (await request.json()) as Omit<Customer, "id">;
    const customers = db.get<Customer>("customers");
    const updated = customers.map((c) => (c.id === id ? { ...body, id } : c));
    db.set("customers", updated);
    return HttpResponse.json({ ...body, id });
  }),

  http.delete(`${BASE}/customers/:id`, ({ params }) => {
    const id = Number(params.id);
    const customers = db.get<Customer>("customers");
    db.set(
      "customers",
      customers.filter((c) => c.id !== id),
    );
    return HttpResponse.json({ success: true });
  }),

  // ── TRANSACTIONS ───────────────────────────────────────
  http.get(`${BASE}/transactions`, () => {
    return HttpResponse.json(db.get("transactions"));
  }),

  http.post(`${BASE}/transactions`, async ({ request }) => {
    const body = (await request.json()) as Omit<Transaction, "id">;
    const transactions = db.get<Transaction>("transactions");
    const newItem = { ...body, id: db.nextId("transactions") };
    db.set("transactions", [...transactions, newItem]);
    return HttpResponse.json(newItem, { status: 201 });
  }),

  http.put(`${BASE}/transactions/:id`, async ({ params, request }) => {
    const id = Number(params.id);
    const body = (await request.json()) as Omit<Transaction, "id">;
    const transactions = db.get<Transaction>("transactions");
    const updated = transactions.map((t) =>
      t.id === id ? { ...body, id } : t,
    );
    db.set("transactions", updated);
    return HttpResponse.json({ ...body, id });
  }),

  http.delete(`${BASE}/transactions/:id`, ({ params }) => {
    const id = Number(params.id);
    const transactions = db.get<Transaction>("transactions");
    db.set(
      "transactions",
      transactions.filter((t) => t.id !== id),
    );
    return HttpResponse.json({ success: true });
  }),

  // ── PACKAGES ───────────────────────────────────────────
  http.get(`${BASE}/packages`, () => {
    return HttpResponse.json(db.get("packages"));
  }),

  // ── AUTH ───────────────────────────────────────────────
  http.post(`${BASE}/auth/login`, async ({ request }) => {
    const { username, password } = (await request.json()) as {
      username: string;
      password: string;
    };
    const users = db.get<{
      id: number;
      username: string;
      password: string;
      name: string;
    }>("users");
    const user = users.find(
      (u) => u.username === username && u.password === password,
    );
    if (!user) {
      return HttpResponse.json(
        { message: "Username atau password salah." },
        { status: 401 },
      );
    }
    const { password: _, ...safeUser } = user;
    return HttpResponse.json(safeUser);
  }),
];
