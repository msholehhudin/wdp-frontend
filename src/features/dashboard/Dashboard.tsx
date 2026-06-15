import {
  Box,
  Grid,
  Paper,
  Typography,
  Stack,
  Divider,
  Chip,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import ReceiptIcon from "@mui/icons-material/Receipt";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useCustomers } from "../../hooks/useCustomers";
import { useTransactions } from "../../hooks/useTransactions";

const StatCard = ({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: string;
}) => (
  <Paper
    elevation={0}
    sx={{ p: 3, border: "1px solid", borderColor: "divider", borderRadius: 2 }}
  >
    <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
      <Box
        sx={{
          p: 1.5,
          bgcolor: `${color}.50`,
          borderRadius: 2,
          color: `${color}.main`,
          display: "flex",
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          {value}
        </Typography>
      </Box>
    </Stack>
  </Paper>
);

const Dashboard = () => {
  const { data: customers = [] } = useCustomers();
  const { data: transactions = [] } = useTransactions();

  const successTx = transactions.filter((t) => t.status === "success");
  const totalRevenue = successTx.reduce((sum, t) => sum + t.price, 0);

  const recentTx = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Dashboard
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            icon={<PeopleIcon />}
            label="Total Customer"
            value={customers.length}
            color="primary"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            icon={<ReceiptIcon />}
            label="Total Transaksi"
            value={transactions.length}
            color="info"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            icon={<CheckCircleIcon />}
            label="Transaksi Sukses"
            value={successTx.length}
            color="success"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            icon={<AttachMoneyIcon />}
            label="Total Revenue"
            value={`Rp ${totalRevenue.toLocaleString("id-ID")}`}
            color="warning"
          />
        </Grid>
      </Grid>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Transaksi Terbaru
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Stack spacing={1.5}>
          {recentTx.map((t) => (
            <Stack
              key={t.id}
              direction="row"
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
                p: 1.5,
                borderRadius: 1,
                "&:hover": { bgcolor: "grey.50" },
              }}
            >
              <Box>
                <Typography sx={{ fontWeight: 500 }}>
                  {t.packageName}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(t.date).toLocaleDateString("id-ID")}
                </Typography>
              </Box>
              <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                <Typography sx={{ fontWeight: 600 }}>
                  Rp {t.price.toLocaleString("id-ID")}
                </Typography>
                <Chip
                  label={t.status}
                  size="small"
                  color={
                    t.status === "success"
                      ? "success"
                      : t.status === "pending"
                        ? "warning"
                        : "error"
                  }
                />
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Paper>
    </Box>
  );
};

export default Dashboard;
