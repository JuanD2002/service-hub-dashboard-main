import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import { AuthProvider, useAuth } from "@/contexts/AuthContext";

// Pages
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";

// Dashboards
import AdminDashboard from "@/pages/AdminDashboard";
import PrestadorDashboard from "@/pages/PrestadorDashboard";

// Admin pages
import Solicitudes from "@/pages/admin/Solicitudes";
import Sedes from "@/pages/admin/Sedes";
import Prestadores from "@/pages/admin/Prestadores";
import Equipos from "@/pages/admin/Equipos";
import MantenimientoPreventivo from "@/pages/admin/MantenimientoPreventivo";
import MantenimientoCorrectivo from "@/pages/admin/MantenimientoCorrectivo";
import Calibraciones from "@/pages/admin/Calibraciones";
import Tecnovigilancia from "@/pages/admin/Tecnovigilancia";
import Eventos from "@/pages/admin/Eventos";
import Manuales from "@/pages/admin/Manuales";
import Resoluciones from "@/pages/admin/Resoluciones";
import Capacitaciones from "@/pages/admin/Capacitaciones";
import Reportes from "@/pages/admin/Reportes";
import Garantia from "@/pages/admin/Garantia";
import Instalacion from "@/pages/admin/Instalacion";

// Prestador pages
import EquiposPrestador from "@/pages/prestador/Equipos";
import ReporteTecnovigilancia from "@/pages/prestador/ReporteTecnovigilancia";
import CapacitacionesPrestador from "@/pages/prestador/Capacitaciones";
import ManualesPrestador from "@/pages/prestador/Manuales";
import ReportesPrestador from "@/pages/prestador/Reportes";
import MantenimientoPrestador from "@/pages/prestador/Mantenimiento";
import IncidentesPrestador from "@/pages/prestador/Incidentes";
import TecnovigilanciaTH from "@/pages/prestador/TecnovigilanciaTH";

const queryClient = new QueryClient();

/* =========================
   PROTECTED ROUTE (CORRECTO)
========================= */
const ProtectedRoute = ({
  children,
  allowedRole,
}: {
  children: JSX.Element;
  allowedRole?: "admin" | "prestador";
}) => {
  const { isAuthenticated, loading, role } = useAuth();

  if (loading) return null;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && role !== allowedRole) {
    return (
      <Navigate
        to={role === "admin" ? "/admin" : "/prestador"}
        replace
      />
    );
  }

  return children;
};

/* =========================
   ROUTES
========================= */
const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/login" element={<Login />} />

    {/* ADMIN */}
    <Route
      path="/admin"
      element={
        <ProtectedRoute allowedRole="admin">
          <AdminDashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/solicitudes"
      element={
        <ProtectedRoute allowedRole="admin">
          <Solicitudes />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/sedes"
      element={
        <ProtectedRoute allowedRole="admin">
          <Sedes />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/prestadores"
      element={
        <ProtectedRoute allowedRole="admin">
          <Prestadores />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/equipos"
      element={
        <ProtectedRoute allowedRole="admin">
          <Equipos />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/mantenimiento/preventivo"
      element={
        <ProtectedRoute allowedRole="admin">
          <MantenimientoPreventivo />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/mantenimiento/correctivo"
      element={
        <ProtectedRoute allowedRole="admin">
          <MantenimientoCorrectivo />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/calibraciones"
      element={
        <ProtectedRoute allowedRole="admin">
          <Calibraciones />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/tecnovigilancia"
      element={
        <ProtectedRoute allowedRole="admin">
          <Tecnovigilancia />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/eventos"
      element={
        <ProtectedRoute allowedRole="admin">
          <Eventos />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/manuales"
      element={
        <ProtectedRoute allowedRole="admin">
          <Manuales />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/resoluciones"
      element={
        <ProtectedRoute allowedRole="admin">
          <Resoluciones />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/capacitaciones"
      element={
        <ProtectedRoute allowedRole="admin">
          <Capacitaciones />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/reportes"
      element={
        <ProtectedRoute allowedRole="admin">
          <Reportes />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/garantia"
      element={
        <ProtectedRoute allowedRole="admin">
          <Garantia />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/instalacion"
      element={
        <ProtectedRoute allowedRole="admin">
          <Instalacion />
        </ProtectedRoute>
      }
    />

    {/* PRESTADOR */}
    <Route
      path="/prestador"
      element={
        <ProtectedRoute allowedRole="prestador">
          <PrestadorDashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/prestador/equipos"
      element={
        <ProtectedRoute allowedRole="prestador">
          <EquiposPrestador />
        </ProtectedRoute>
      }
    />
    <Route
      path="/prestador/reporte-tecnovigilancia"
      element={
        <ProtectedRoute allowedRole="prestador">
          <ReporteTecnovigilancia />
        </ProtectedRoute>
      }
    />
    <Route
      path="/prestador/capacitaciones"
      element={
        <ProtectedRoute allowedRole="prestador">
          <CapacitacionesPrestador />
        </ProtectedRoute>
      }
    />
    <Route
      path="/prestador/manuales"
      element={
        <ProtectedRoute allowedRole="prestador">
          <ManualesPrestador />
        </ProtectedRoute>
      }
    />
    <Route
      path="/prestador/reportes"
      element={
        <ProtectedRoute allowedRole="prestador">
          <ReportesPrestador />
        </ProtectedRoute>
      }
    />
    <Route
      path="/prestador/mantenimiento"
      element={
        <ProtectedRoute allowedRole="prestador">
          <MantenimientoPrestador />
        </ProtectedRoute>
      }
    />
    <Route
      path="/prestador/incidentes"
      element={
        <ProtectedRoute allowedRole="prestador">
          <IncidentesPrestador />
        </ProtectedRoute>
      }
    />
    <Route
      path="/prestador/tecnovigilancia"
      element={
        <ProtectedRoute allowedRole="prestador">
          <TecnovigilanciaTH />
        </ProtectedRoute>
      }
    />

    <Route path="*" element={<NotFound />} />
  </Routes>
);

/* =========================
   APP ROOT
========================= */
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
