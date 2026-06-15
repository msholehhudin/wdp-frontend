import { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CustomerTable from "../../components/common/CustomerTable";
import CustomerFormModal from "../../components/common/CustomerFormModal";

const Customer = () => {
  const [openAdd, setOpenAdd] = useState(false);

  return (
    <Box>
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", alignItems: "center", mb: 3 }}
      >
        <Typography variant="h4">Customer Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenAdd(true)}
        >
          Add Customer
        </Button>
      </Stack>

      <CustomerTable />

      <CustomerFormModal open={openAdd} onClose={() => setOpenAdd(false)} />
    </Box>
  );
};

export default Customer;
