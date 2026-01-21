import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { TrafficLight } from './TrafficLight';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  ChevronLeft,
  ChevronRight,
  LogOut,
  LayoutDashboard,
  FileText,
  Building2,
  Users,
  Wrench,
  Settings,
  Calendar,
  Shield,
  BookOpen,
  BarChart3,
  AlertTriangle,
  Cpu,
  ClipboardCheck,
  FileCheck,
  GraduationCap,
  Package,
} from 'lucide-react';

interface MenuItem {
  title: string;
  icon: React.ElementType;
  path: string;
  children?: MenuItem[];
}

const adminMenuItems: MenuItem[] = [
  { title: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
  { title: 'Solicitudes', icon: FileText, path: '/admin/solicitudes' },
  { title: 'Sedes', icon: Building2, path: '/admin/sedes' },
  { title: 'Prestadores', icon: Users, path: '/admin/prestadores' },
  { title: 'Equipos', icon: Cpu, path: '/admin/equipos' },
  {
    title: 'Mantenimiento',
    icon: Wrench,
    path: '/admin/mantenimiento',
    children: [
      { title: 'Preventivo', icon: ClipboardCheck, path: '/admin/mantenimiento/preventivo' },
      { title: 'Correctivo', icon: Settings, path: '/admin/mantenimiento/correctivo' },
    ],
  },
  { title: 'Calibraciones', icon: Settings, path: '/admin/calibraciones' },
  { title: 'Tecnovigilancia', icon: Shield, path: '/admin/tecnovigilancia' },
  { title: 'Eventos/Incidentes', icon: AlertTriangle, path: '/admin/eventos' },
  { title: 'Manuales', icon: BookOpen, path: '/admin/manuales' },
  { title: 'Resoluciones Invima', icon: FileCheck, path: '/admin/resoluciones' },
  { title: 'Capacitaciones', icon: GraduationCap, path: '/admin/capacitaciones' },
  { title: 'Reportes/Indicadores', icon: BarChart3, path: '/admin/reportes' },
  { title: 'Garantía', icon: Package, path: '/admin/garantia' },
  { title: 'Instalación', icon: Wrench, path: '/admin/instalacion' },
];

const prestadorMenuItems: MenuItem[] = [
  { title: 'Dashboard', icon: LayoutDashboard, path: '/prestador' },
  { title: 'Equipos', icon: Cpu, path: '/prestador/equipos' },
  { title: 'Reporte Tecnovigilancia', icon: FileText, path: '/prestador/reporte-tecnovigilancia' },
  { title: 'Capacitaciones', icon: GraduationCap, path: '/prestador/capacitaciones' },
  { title: 'Manuales', icon: BookOpen, path: '/prestador/manuales' },
  { title: 'Reportes/Indicadores', icon: BarChart3, path: '/prestador/reportes' },
  { title: 'Mantenimiento', icon: Wrench, path: '/prestador/mantenimiento' },
  { title: 'Incidentes/Eventos', icon: AlertTriangle, path: '/prestador/incidentes' },
  { title: 'Tecnovigilancia T/H', icon: Shield, path: '/prestador/tecnovigilancia' },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = role === 'admin' ? adminMenuItems : prestadorMenuItems;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  const isActive = (path: string) => location.pathname === path;

  const renderMenuItem = (item: MenuItem, depth = 0) => {
    const Icon = item.icon;
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.title);
    const active = isActive(item.path);

    return (
      <div key={item.path}>
        <Link
          to={hasChildren ? '#' : item.path}
          onClick={(e) => {
            if (hasChildren) {
              e.preventDefault();
              toggleExpanded(item.title);
            }
          }}
          className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group',
            depth > 0 && 'ml-4',
            active
              ? 'bg-sidebar-active text-sidebar-foreground font-medium'
              : 'text-sidebar-foreground/80 hover:bg-sidebar-hover hover:text-sidebar-foreground'
          )}
        >
          <Icon className={cn('h-5 w-5 flex-shrink-0', active && 'text-sidebar-foreground')} />
          {!collapsed && (
            <>
              <span className="flex-1 truncate">{item.title}</span>
              {hasChildren && (
                <ChevronRight
                  className={cn(
                    'h-4 w-4 transition-transform duration-200',
                    isExpanded && 'rotate-90'
                  )}
                />
              )}
            </>
          )}
        </Link>
        {hasChildren && isExpanded && !collapsed && (
          <div className="mt-1 space-y-1 animate-fade-in">
            {item.children!.map((child) => renderMenuItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar */}
      <aside
        className={cn(
          'sidebar-gradient flex flex-col transition-all duration-300 ease-in-out',
          collapsed ? 'w-16' : 'w-64'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          {!collapsed && (
            <div className="animate-fade-in">
              <h1 className="text-lg font-semibold text-sidebar-foreground">TecnoVig</h1>
              <p className="text-xs text-sidebar-foreground/60">Sistema de Gestión</p>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="text-sidebar-foreground hover:bg-sidebar-hover"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-sidebar-hover flex items-center justify-center text-sidebar-foreground font-semibold flex-shrink-0">
              {user?.name?.charAt(0) || 'U'}
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0 animate-fade-in">
                <p className="text-sm font-medium text-sidebar-foreground truncate">{user?.name}</p>
                <p className="text-xs text-sidebar-foreground/60 truncate">{user?.position}</p>
                {user?.organization && (
                  <p className="text-xs text-sidebar-foreground/60 truncate">{user.organization}</p>
                )}
              </div>
            )}
          </div>
          {!collapsed && (
            <div className="mt-3 flex items-center gap-2 animate-fade-in">
              <TrafficLight status={user?.status || 'inactive'} />
              <span className="text-xs text-sidebar-foreground/60 capitalize">{user?.status}</span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 p-3">
          <nav className="space-y-1">
            {menuItems.map((item) => renderMenuItem(item))}
          </nav>
        </ScrollArea>

        {/* Logout */}
        <div className="p-3 border-t border-sidebar-border">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className={cn(
              'w-full justify-start gap-3 text-sidebar-foreground/80 hover:bg-sidebar-hover hover:text-sidebar-foreground',
              collapsed && 'justify-center px-0'
            )}
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && <span>Cerrar Sesión</span>}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-background">
        {children}
      </main>
    </div>
  );
};
