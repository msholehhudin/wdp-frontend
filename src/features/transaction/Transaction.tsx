import { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TransactionTable from "../../components/common/TransactionTable";
import TransactionFormModal from "../../components/common/TransactionFormModal";

const Transaction = () => {
  const [openAdd, setOpenAdd] = useState(false);

  return (
    <Box>
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", alignItems: "center", mb: 3 }}
      >
        <Typography variant="h4">Transaction</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenAdd(true)}
        >
          Add Transaction
        </Button>
      </Stack>

      <TransactionTable />

      <TransactionFormModal open={openAdd} onClose={() => setOpenAdd(false)} />
    </Box>
  );
};

export default Transaction;
