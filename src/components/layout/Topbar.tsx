import { AppBar, Toolbar, Typography, Box, Avatar } from "@mui/material";

const Topbar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          DWP Frontend Technical Test
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="body2">Muhammad Sholehudin</Typography>

          <Avatar>M</Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
