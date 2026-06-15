import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  transactionService,
  packageService,
} from "../services/transaction/transaction.service";
import type { Transaction } from "../types/transaction.types";

export const useTransactions = () => {
  const qc = useQueryClient();

  const query = useQuery({
    queryKey: ["transactions"],
    queryFn: transactionService.getAll,
  });

  const packages = useQuery({
    queryKey: ["packages"],
    queryFn: packageService.getAll,
  });

  const create = useMutation({
    mutationFn: transactionService.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["transactions"] }),
  });

  const update = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Omit<Transaction, "id"> }) =>
      transactionService.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["transactions"] }),
  });

  const remove = useMutation({
    mutationFn: transactionService.remove,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["transactions"] }),
  });

  return { ...query, packages, create, update, remove };
};
