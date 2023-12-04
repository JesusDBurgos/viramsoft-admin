import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
import { tokens } from "../../theme";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Box, useTheme } from "@mui/material";

const Login = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const user = AuthService.getCurrentUser();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await AuthService.login(username, password).then(
        () => {
          navigate("/dashboard");
          window.location.reload();
        },
        (error) => {
          alert('Credenciales invalidas, intentelo nuevamente');
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  if (user) {
    navigate("/dashboard");
    return null; // O puedes redirigir de inmediato aquí.
  }

  return (
    <Box m="auto">
      <form
        onSubmit={handleLogin}
        class="container-login"
        style={{ backgroundColor: colors.primary[400] }}
      >
        <Box>
          <img
            alt="profile-user"
            width="100"
            height="100"
            src={`../../assets/logo.png`}
            style={{
              marginTop: "-60px",
              marginBottom: "-25px",
            }}
          />
          
        </Box>
        <br />
        <h4 style={{ textAlign: "center", marginBottom: "35px" }}>
          Iniciar sesión
        </h4>
        
        <input
          required
          class="form-control"
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ marginBottom: "25px" }}
        />
        <input
          required
          class="form-control"
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: "30px" }}
        />
        <button type="submit" class="btn btn-secondary">
          Iniciar sesión
        </button>
      </form>
    </Box>
  );
};

export default Login;
