import { Outlet } from 'react-router-dom';
import { PageContainer } from '../components/PageContainer';
import { RetroBackground } from '../components/RetroBackground';
import { DashboardHeader } from '../components/DashboardHeader';
import { NavTabs } from '../components/NavTabs';
import { useAuth } from '../context/AuthContext';

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Visão geral', end: true },
  { to: '/dashboard/eventos', label: 'Meus eventos' },
  { to: '/dashboard/agendamentos', label: 'Agendamentos' },
  { to: '/dashboard/compartilhar', label: 'Compartilhar' },
];

export function DashboardLayout() {
  const { user, logout } = useAuth();

  return (
    <>
      <RetroBackground intensity="subtle" />
      <PageContainer>
        <DashboardHeader userName={user.name} onLogout={logout} />
        <NavTabs items={NAV_ITEMS} />
        <Outlet />
      </PageContainer>
    </>
  );
}