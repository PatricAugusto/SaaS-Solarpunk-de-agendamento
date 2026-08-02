import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GlassPanel } from "../components/GlassPanel";
import { NeonButton } from "../components/NeonButton";
import { FormGroup, Label, Input, ErrorText } from "../components/FormField";
import { PageContainer } from "../components/PageContainer";
import { RetroBackground } from "../components/RetroBackground";
import { useAuth } from "../context/AuthContext";

export function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    username: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await register(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Erro ao criar conta");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <RetroBackground intensity="full" />
      <PageContainer
        $narrow
        style={{ minHeight: "100vh", alignContent: "center" }}
      >
        <GlassPanel>
          <form onSubmit={handleSubmit} style={{ display: "grid", gap: 18 }}>
            <h1 className="font-display" style={{ fontSize: "1rem" }}>
              Criar conta
            </h1>

            <FormGroup>
              <Label>Nome</Label>
              <Input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Username (usado na sua URL pública)</Label>
              <Input
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="ex: ana-solar"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>E-mail</Label>
              <Input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Senha</Label>
              <Input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </FormGroup>

            {error && <ErrorText>{error}</ErrorText>}

            <NeonButton type="submit" $variant="cyan" disabled={submitting}>
              {submitting ? "Criando..." : "Criar conta"}
            </NeonButton>

            <p
              style={{
                fontSize: "0.9rem",
                color: "inherit",
                textAlign: "center",
              }}
            >
              Já tem conta?{" "}
              <Link to="/login" style={{ color: "#39FF88" }}>
                Entrar
              </Link>
            </p>
          </form>
        </GlassPanel>
      </PageContainer>
    </>
  );
}
