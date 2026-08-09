import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { PublicBookingPage } from "./pages/PublicBookingPage";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { OverviewPage } from "./pages/dashboard/OverviewPage";
import { EventTypesPage } from "./pages/dashboard/EventTypesPage";
import { NewBookingPage } from "./pages/dashboard/NewBookingPage";
import { BookingsPage } from "./pages/dashboard/BookingsPage";
import { SharePage } from "./pages/dashboard/SharePage";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import { ResetPasswordPage } from "./pages/ResetPasswordPage";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<OverviewPage />} />
          <Route path="eventos" element={<EventTypesPage />} />
          <Route path="agendar" element={<NewBookingPage />} />
          <Route path="agendamentos" element={<BookingsPage />} />
          <Route path="compartilhar" element={<SharePage />} />
        </Route>

        <Route path="/:username/:slug" element={<PublicBookingPage />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
