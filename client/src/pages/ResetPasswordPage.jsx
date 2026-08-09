import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { GlassPanel } from '../components/GlassPanel';
import { NeonButton } from '../components/NeonButton';
import { FormGroup, Label, Input, ErrorText } from '../components/FormField';
import { PageContainer } from '../components/PageContainer';
import { RetroBackground } from '../components/RetroBackground';
import { authService } from '../services/authService';

export function ResetPasswordPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ newPassword: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (form.newPassword !== form.confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    setSubmitting(true);
    try {
      await authService.resetPassword(token, form.newPassword);
      setDone(true);
      setTimeout(() => navigate('/login'), 2500);
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao redefinir senha');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <RetroBackground intensity="full" />
      <PageContainer $narrow style={{ minHeight: '100vh', alignContent: 'center' }}>
        <GlassPanel>
          {done ? (
            <div style={{ textAlign: 'center', display: 'grid', gap: 12 }}>
              <h1 className="font-display" style={{ fontSize: '1rem', color: '#39FF88' }}>
                Senha atualizada! ✨
              </h1>
              <p>Redirecionando para o login...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 20 }}>
              <h1 className="font-display" style={{ fontSize: '1rem' }}>Nova senha</h1>

              <FormGroup>
                <Label>Nova senha</Label>
                <Input
                  type="password"
                  value={form.newPassword}
                  onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
                  required
                  minLength={6}
                />
              </FormGroup>

              <FormGroup>
                <Label>Confirmar nova senha</Label>
                <Input
                  type="password"
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  required
                  minLength={6}
                />
              </FormGroup>

              {error && <ErrorText>{error}</ErrorText>}

              <NeonButton type="submit" $variant="green" disabled={submitting}>
                {submitting ? 'Salvando...' : 'Redefinir senha'}
              </NeonButton>

              <p style={{ fontSize: '0.9rem', textAlign: 'center' }}>
                <Link to="/login" style={{ color: '#3DFDFF' }}>Voltar para o login</Link>
              </p>
            </form>
          )}
        </GlassPanel>
      </PageContainer>
    </>
  );
}