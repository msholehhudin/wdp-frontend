import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTransactions } from "../../hooks/useTransactions";
import { useCustomers } from "../../hooks/useCustomers";
import type { Transaction } from "../../types/transaction.types";
import TransactionFormModal from "./TransactionFormModal";

const STATUS_COLORS: Record<string, "success" | "warning" | "error"> = {
  success: "success",
  pending: "warning",
  failed: "error",
};

const TransactionTable = () => {
  const { data: transactions = [], isLoading, remove } = useTransactions();
  const { data: customers = [] } = useCustomers();
  const [editTarget, setEditTarget] = useState<Transaction | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Transaction | null>(null);

  const getCustomerName = (id: number) =>
    customers.find((c) => c.id === id)?.name ?? "-";

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{ border: "1px solid", borderColor: "divider" }}
      >
        <Table>
          <TableHead sx={{ bgcolor: "grey.50" }}>
            <TableRow>
              <TableCell width={60}>ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Paket</TableCell>
              <TableCell>Harga</TableCell>
              <TableCell>Tanggal</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((t) => (
              <TableRow key={t.id} hover>
                <TableCell>
                  <Chip label={t.id} size="small" variant="outlined" />
                </TableCell>
                <TableCell sx={{ fontWeight: 500 }}>
                  {getCustomerName(t.customerId)}
                </TableCell>
                <TableCell>{t.packageName}</TableCell>
                <TableCell>Rp {t.price.toLocaleString("id-ID")}</TableCell>
                <TableCell>
                  {new Date(t.date).toLocaleDateString("id-ID")}
                </TableCell>
                <TableCell>
                  <Chip
                    label={t.status}
                    size="small"
                    color={STATUS_COLORS[t.status] ?? "default"}
                  />
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="Edit">
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => setEditTarget(t)}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => setDeleteTarget(t)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {editTarget && (
        <TransactionFormModal
          open={!!editTarget}
          onClose={() => setEditTarget(null)}
          initialData={editTarget}
        />
      )}

      <Dialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)}>
        <DialogTitle>Hapus Transaksi</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Yakin ingin menghapus transaksi <strong>#{deleteTarget?.id}</strong>
            ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteTarget(null)}>Batal</Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => {
              if (deleteTarget) {
                remove.mutate(deleteTarget.id);
                setDeleteTarget(null);
              }
            }}
          >
            Hapus
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TransactionTable;
