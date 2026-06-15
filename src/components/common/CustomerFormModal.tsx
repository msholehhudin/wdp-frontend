import { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useCustomers } from "../../hooks/useCustomers";
import type { Customer } from "../../types/customer.types";

interface Props {
  open: boolean;
  onClose: () => void;
  initialData?: Customer;
}

type FormValues = Omit<Customer, "id">;

const CustomerFormModal = ({ open, onClose, initialData }: Props) => {
  const { create, update } = useCustomers();
  const isEdit = !!initialData;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: initialData ?? { name: "", email: "", phone: "" },
  });

  useEffect(() => {
    reset(initialData ?? { name: "", email: "", phone: "" });
  }, [initialData, reset]);

  const onSubmit = (data: FormValues) => {
    if (isEdit && initialData) {
      update.mutate({ id: initialData.id, data });
    } else {
      create.mutate(data);
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>
          {isEdit ? "Edit Customer" : "Tambah Customer"}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Name"
              fullWidth
              {...register("name", { required: "Nama wajib diisi" })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <TextField
              label="Email"
              fullWidth
              {...register("email", {
                required: "Email wajib diisi",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Format email tidak valid",
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              label="Phone"
              fullWidth
              {...register("phone", { required: "Nomor HP wajib diisi" })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Batal</Button>
          <Button type="submit" variant="contained">
            {isEdit ? "Simpan Perubahan" : "Tambah"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CustomerFormModal;
