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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Chip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCustomers } from "../../hooks/useCustomers";
import type { Customer } from "../../types/customer.types";
import CustomerFormModal from "./CustomerFormModal";

const CustomerTable = () => {
  const { data: customers = [], isLoading, remove } = useCustomers();
  const [editTarget, setEditTarget] = useState<Customer | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Customer | null>(null);

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
              <TableCell width={80}>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell align="center" width={120}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((c) => (
              <TableRow key={c.id} hover>
                <TableCell>
                  <Chip label={c.id} size="small" variant="outlined" />
                </TableCell>
                <TableCell sx={{ fontWeight: 500 }}>{c.name}</TableCell>
                <TableCell>{c.email}</TableCell>
                <TableCell>{c.phone}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Edit">
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => setEditTarget(c)}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => setDeleteTarget(c)}
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

      {/* Edit Modal */}
      {editTarget && (
        <CustomerFormModal
          open={!!editTarget}
          onClose={() => setEditTarget(null)}
          initialData={editTarget}
        />
      )}

      {/* Delete Confirm */}
      <Dialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)}>
        <DialogTitle>Hapus Customer</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Yakin ingin menghapus <strong>{deleteTarget?.name}</strong>?
            Tindakan ini tidak bisa dibatalkan.
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

export default CustomerTable;
