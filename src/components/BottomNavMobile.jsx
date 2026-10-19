import React from 'react';
import { 
  Home, 
  Smartphone, 
  Video, 
  Sparkles, 
  PhoneCall,
  GraduationCap, 
  FolderDown, 
  FileText
} from 'lucide-react';

export default function BottomNavMobile({ activeTab, setActiveTab, userProfile }) {
  const familyNav = [
    { id: 'inicio', label: 'Inicio', icon: Home },
    { id: 'controles', label: 'Configurar', icon: Smartphone },
    { id: 'videos', label: 'Videos', icon: Video },
    { id: 'encuesta', label: 'Encuesta', icon: Sparkles },
    { id: 'uruguay', label: 'Ayuda', icon: PhoneCall },
  ];

  const teacherNav = [
    { id: 'inicio', label: 'Inicio', icon: Home },
    { id: 'docentes', label: 'El Aula', icon: GraduationCap },
    { id: 'documentos', label: 'Guías PDF', icon: FolderDown },
    { id: 'videos', label: 'Videos', icon: Video },
    { id: 'encuesta', label: 'Encuesta', icon: FileText },
  ];

  const items = userProfile === 'docente' ? teacherNav : familyNav;

  const handleClick = (id) => {
    setActiveTab(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 flex items-center justify-around shadow-lg lg:hidden no-print">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive =
          activeTab === item.id ||
          (item.id === 'encuesta' && (activeTab === 'opcionales' || activeTab === 'protocolo' || activeTab === 'test'));
        return (
          <button
            key={item.id}
            onClick={() => handleClick(item.id)}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all relative ${
              isActive 
                ? 'text-indigo-600 font-bold scale-105' 
                : 'text-slate-500 font-medium hover:text-slate-900'
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-600' : 'text-slate-500'}`} />
            <span className="text-[10px] mt-0.5 tracking-tight leading-none">
              {item.label}
            </span>
            {isActive && (
              <span className="w-1 h-1 rounded-full bg-indigo-600 absolute -bottom-0.5" />
            )}
          </button>
        );
      })}
    </nav>
  );
}
