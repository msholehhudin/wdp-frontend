import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Stack,
  Alert,
  InputAdornment,
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import WifiIcon from "@mui/icons-material/Wifi";
import { useForm } from "react-hook-form";
import { authService } from "../../services/auth/auth.service";

interface FormValues {
  username: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const onSubmit = async ({ username, password }: FormValues) => {
    setError("");
    try {
      const user = await authService.login(username, password);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } catch (err: any) {
      setError(err.message ?? "Login gagal.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "primary.main",
      }}
    >
      <Paper
        elevation={4}
        sx={{ p: 5, width: "100%", maxWidth: 420, borderRadius: 3 }}
      >
        <Stack spacing={1} sx={{ alignItems: "center", mb: 4 }}>
          <Box
            sx={{
              p: 1.5,
              bgcolor: "primary.main",
              borderRadius: 2,
              color: "white",
              display: "flex",
            }}
          >
            <WifiIcon sx={{ fontSize: 32 }} />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            DataKu
          </Typography>
          <Typography variant="body2" color="text.secondary">
            E-Commerce Paket Data Internet
          </Typography>
        </Stack>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <TextField
              label="Username"
              fullWidth
              {...register("username", { required: "Username wajib diisi" })}
              error={!!errors.username}
              helperText={errors.username?.message}
            />
            <TextField
              label="Password"
              type={showPass ? "text" : "password"}
              fullWidth
              {...register("password", { required: "Password wajib diisi" })}
              error={!!errors.password}
              helperText={errors.password?.message}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPass((p) => !p)}
                        edge="end"
                      >
                        {showPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={isSubmitting}
            >
              {isSubmitting ? "Loading..." : "Masuk"}
            </Button>
          </Stack>
        </form>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", mt: 3, textAlign: "center" }}
        >
          Demo: admin / admin123
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
