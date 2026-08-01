import styled from 'styled-components';

export const FormGroup = styled.div`
  display: grid;
  gap: 6px;
  text-align: left;
`;

export const Label = styled.label`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 1.05rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const Input = styled.input`
  background: ${({ theme }) => theme.colors.surfaceLight};
  border: 1.5px solid ${({ theme }) => theme.colors.glassBorder};
  border-radius: ${({ theme }) => theme.radii.sm};
  padding: 10px 14px;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    border-color: ${({ theme }) => theme.colors.neonCyan};
    box-shadow: 0 0 12px rgba(61, 253, 255, 0.25);
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const ErrorText = styled.span`
  color: ${({ theme }) => theme.colors.danger};
  font-size: 0.85rem;
`;