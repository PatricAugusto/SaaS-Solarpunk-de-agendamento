import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GlassPanel } from '../components/GlassPanel';
import { NeonButton } from '../components/NeonButton';
import { FormGroup, Label, Input, ErrorText } from '../components/FormField';
import { PageContainer } from '../components/PageContainer';
import { RetroBackground } from '../components/RetroBackground';
import { authService } from '../services/authService';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setMessage('');
    setSubmitting(true);
    try {
      const msg = await authService.forgotPassword(email);
      setMessage(msg);
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao solicitar recuperação');
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
            <h1 className="font-display" style={{ fontSize: '1rem' }}>Recuperar senha</h1>
            <p style={{ color: '#9FC9B4', fontSize: '0.9rem' }}>
              Informe seu e-mail cadastrado e enviaremos um link para você criar uma nova senha.
            </p>

            <FormGroup>
              <Label>E-mail</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormGroup>

            {error && <ErrorText>{error}</ErrorText>}
            {message && (
              <p style={{ color: '#39FF88', fontSize: '0.9rem' }}>{message}</p>
            )}

            <NeonButton type="submit" $variant="green" disabled={submitting}>
              {submitting ? 'Enviando...' : 'Enviar link de recuperação'}
            </NeonButton>

            <p style={{ fontSize: '0.9rem', textAlign: 'center' }}>
              <Link to="/login" style={{ color: '#3DFDFF' }}>Voltar para o login</Link>
            </p>
          </form>
        </GlassPanel>
      </PageContainer>
    </>
  );
}