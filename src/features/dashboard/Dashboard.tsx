import { CardContent, Card, Grid, Typography } from "@mui/material";

const Dashboard = () => {
  return (
    <Grid container spacing={2}>
      <Grid size={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">Customers</Typography>

            <Typography variant="h3">0</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">Transactions</Typography>

            <Typography variant="h3">0</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
