import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GlassPanel } from '../components/GlassPanel';
import { NeonButton } from '../components/NeonButton';
import { FormGroup, Label, Input, ErrorText } from '../components/FormField';
import { PageContainer } from '../components/PageContainer';
import { RetroBackground } from '../components/RetroBackground';
import { useAuth } from '../context/AuthContext';

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao fazer login');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <RetroBackground intensity="full" />
      <PageContainer $narrow style={{ minHeight: '100vh', alignContent: 'center' }}>
        <GlassPanel>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 20 }}>
            <h1 className="font-display" style={{ fontSize: '1rem' }}>Entrar</h1>

            <FormGroup>
              <Label>E-mail</Label>
              <Input type="email" name="email" value={form.email} onChange={handleChange} required />
            </FormGroup>

            <FormGroup>
              <Label>Senha</Label>
              <Input type="password" name="password" value={form.password} onChange={handleChange} required />
            </FormGroup>

            {error && <ErrorText>{error}</ErrorText>}

            <NeonButton type="submit" $variant="green" disabled={submitting}>
              {submitting ? 'Entrando...' : 'Entrar'}
            </NeonButton>

            <p style={{ fontSize: '0.9rem', color: 'inherit', textAlign: 'center' }}>
              Não tem conta?{' '}
              <Link to="/register" style={{ color: '#3DFDFF' }}>Criar conta</Link>
            </p>
          </form>
        </GlassPanel>
      </PageContainer>
    </>
  );
}