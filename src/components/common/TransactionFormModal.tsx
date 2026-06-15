import { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useTransactions } from "../../hooks/useTransactions";
import { useCustomers } from "../../hooks/useCustomers";
import type { Transaction } from "../../types/transaction.types";

interface Props {
  open: boolean;
  onClose: () => void;
  initialData?: Transaction;
}

type FormValues = Omit<Transaction, "id">;

const TransactionFormModal = ({ open, onClose, initialData }: Props) => {
  const { create, update, packages } = useTransactions();
  const { data: customers = [] } = useCustomers();
  const isEdit = !!initialData;

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: initialData ?? {
      customerId: 0,
      packageName: "",
      price: 0,
      status: "pending",
      date: new Date().toISOString().split("T")[0],
    },
  });

  useEffect(() => {
    reset(
      initialData ?? {
        customerId: 0,
        packageName: "",
        price: 0,
        status: "pending",
        date: new Date().toISOString().split("T")[0],
      },
    );
  }, [initialData, reset]);

  const onSubmit = (data: FormValues) => {
    const payload = {
      ...data,
      customerId: Number(data.customerId),
      price: Number(data.price),
    };
    if (isEdit && initialData) {
      update.mutate({ id: initialData.id, data: payload });
    } else {
      create.mutate(payload);
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>
          {isEdit ? "Edit Transaksi" : "Tambah Transaksi"}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <FormControl fullWidth error={!!errors.customerId}>
              <InputLabel>Customer</InputLabel>
              <Controller
                name="customerId"
                control={control}
                rules={{
                  required: "Customer wajib dipilih",
                  validate: (v) => Number(v) > 0 || "Pilih customer",
                }}
                render={({ field }) => (
                  <Select {...field} label="Customer">
                    {customers.map((c) => (
                      <MenuItem key={c.id} value={c.id}>
                        {c.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              <FormHelperText>{errors.customerId?.message}</FormHelperText>
            </FormControl>

            <FormControl fullWidth error={!!errors.packageName}>
              <InputLabel>Paket</InputLabel>
              <Controller
                name="packageName"
                control={control}
                rules={{ required: "Paket wajib dipilih" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Paket"
                    onChange={(e) => {
                      field.onChange(e);
                      packages.data?.find((p) => p.name === e.target.value);
                    }}
                  >
                    {(packages.data ?? []).map((p) => (
                      <MenuItem key={p.id} value={p.name}>
                        {p.name} — Rp {p.price.toLocaleString("id-ID")}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              <FormHelperText>{errors.packageName?.message}</FormHelperText>
            </FormControl>

            <TextField
              label="Harga (Rp)"
              type="number"
              fullWidth
              {...register("price", {
                required: "Harga wajib diisi",
                min: { value: 1, message: "Harga tidak valid" },
              })}
              error={!!errors.price}
              helperText={errors.price?.message}
            />

            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select {...field} label="Status">
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="success">Success</MenuItem>
                    <MenuItem value="failed">Failed</MenuItem>
                  </Select>
                )}
              />
            </FormControl>

            <TextField
              label="Tanggal"
              type="date"
              fullWidth
              slotProps={{ inputLabel: { shrink: true } }}
              {...register("date", { required: "Tanggal wajib diisi" })}
              error={!!errors.date}
              helperText={errors.date?.message}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Batal</Button>
          <Button type="submit" variant="contained">
            {isEdit ? "Simpan" : "Tambah"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TransactionFormModal;
