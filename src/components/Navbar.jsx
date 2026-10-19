import React, { useState } from 'react';
import { 
  Smartphone, 
  Shield, 
  BookOpen, 
  FileText, 
  Users, 
  Menu, 
  X, 
  PhoneCall, 
  Video, 
  FolderDown, 
  GraduationCap,
  Sparkles,
  ChevronDown
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, userProfile, onOpenProfileSelector }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Streamlined navigation items per profile
  const familyItems = [
    { id: 'inicio', label: 'Inicio y S.E.R.C.', icon: Shield },
    { id: 'controles', label: 'Controles', icon: Smartphone },
    { id: 'videos', label: 'Videos', icon: Video },
    { id: 'formacion', label: 'Salud digital', icon: BookOpen },
    { id: 'encuesta', label: 'Encuesta y acuerdo', icon: Sparkles },
    { id: 'uruguay', label: 'Ayuda oficial', icon: Shield },
  ];

  const teacherItems = [
    { id: 'inicio', label: 'Inicio', icon: Shield },
    { id: 'docentes', label: 'En el aula', icon: GraduationCap },
    { id: 'documentos', label: 'Guías PDF', icon: FolderDown },
    { id: 'videos', label: 'Videos tutoría', icon: Video },
    { id: 'encuesta', label: 'Encuesta y acuerdo', icon: FileText },
    { id: 'uruguay', label: 'Normativa', icon: Shield },
  ];

  const currentNav = userProfile === 'docente' ? teacherItems : familyItems;

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs no-print">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => handleNavClick('inicio')}
            className="flex items-center gap-2 cursor-pointer group shrink-0"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-sky-500 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
              <Smartphone className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-extrabold text-sm sm:text-base text-slate-900 tracking-tight">
                  Primer Celular
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded-full bg-sky-100 text-sky-800 border border-sky-200">
                  UY 🇺🇾
                </span>
              </div>
            </div>
          </div>

          {/* Profile Switcher Button */}
          <button
            onClick={onOpenProfileSelector}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border transition-all ${
              userProfile === 'familia'
                ? 'bg-indigo-50 border-indigo-200 text-indigo-800 hover:bg-indigo-100'
                : 'bg-purple-50 border-purple-200 text-purple-800 hover:bg-purple-100'
            }`}
            title="Toca para cambiar de perfil"
          >
            {userProfile === 'familia' ? (
              <>
                <Users className="w-3.5 h-3.5 text-indigo-600" />
                <span>Modo familia</span>
              </>
            ) : (
              <>
                <GraduationCap className="w-3.5 h-3.5 text-purple-700" />
                <span>Modo docente</span>
              </>
            )}
            <ChevronDown className="w-3 h-3 opacity-60" />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {currentNav.map((item) => {
              const Icon = item.icon;
              const isActive =
                activeTab === item.id ||
                (item.id === 'encuesta' && (activeTab === 'opcionales' || activeTab === 'protocolo' || activeTab === 'test'));
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Emergency Hotline Button */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => handleNavClick('uruguay')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors"
              title="Línea Azul INAU y Delitos Informáticos"
            >
              <PhoneCall className="w-3 h-3 text-red-600 animate-pulse" />
              <span>0800 5050</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Menú principal"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-5 space-y-1 shadow-md animate-in slide-in-from-top duration-200">
          <div className="pb-2 mb-2 border-b border-slate-100 flex items-center justify-between">
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Menú principal</span>
            <button
              onClick={onOpenProfileSelector}
              className="text-xs font-bold text-indigo-600 underline"
            >
              Cambiar a {userProfile === 'familia' ? 'docente' : 'familia'}
            </button>
          </div>

          {currentNav.map((item) => {
            const Icon = item.icon;
            const isActive =
              activeTab === item.id ||
              (item.id === 'encuesta' && (activeTab === 'opcionales' || activeTab === 'protocolo' || activeTab === 'test'));
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm font-semibold text-left transition-colors ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                {item.label}
              </button>
            );
          })}

          <div className="pt-2 border-t border-slate-100 mt-2">
            <button
              onClick={() => handleNavClick('uruguay')}
              className="flex items-center justify-center gap-2 w-full px-3 py-2 rounded-xl text-xs font-bold text-red-700 bg-red-50 border border-red-200"
            >
              <PhoneCall className="w-3.5 h-3.5 text-red-600" />
              <span>Línea azul INAU: 0800 5050 / *5050</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
