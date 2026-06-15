import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { customerService } from "../services/customer/customer.service";
import type { Customer } from "../types/customer.types";

export const useCustomers = () => {
  const qc = useQueryClient();

  const query = useQuery({
    queryKey: ["customers"],
    queryFn: customerService.getAll,
  });

  const create = useMutation({
    mutationFn: customerService.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["customers"] }),
  });

  const update = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Omit<Customer, "id"> }) =>
      customerService.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["customers"] }),
  });

  const remove = useMutation({
    mutationFn: customerService.remove,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["customers"] }),
  });

  return { ...query, create, update, remove };
};
