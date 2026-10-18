import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import BottomNavMobile from './components/BottomNavMobile';
import ProfileSelectorModal from './components/ProfileSelectorModal';
import HeroSection from './components/HeroSection';
import SercModelSection from './components/SercModelSection';
import ParentalControlsSection from './components/ParentalControlsSection';
import VideoLibrarySection from './components/VideoLibrarySection';
import DigitalHealthSection from './components/DigitalHealthSection';
import OptionalToolsSection from './components/OptionalToolsSection';
import DocumentsLibrarySection from './components/DocumentsLibrarySection';
import UruguayNormativeSection from './components/UruguayNormativeSection';
import TeachersSection from './components/TeachersSection';
import WorkshopMode from './components/WorkshopMode';
import Footer from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState('inicio');
  const [userProfile, setUserProfile] = useState('familia'); // 'familia' | 'docente'
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isWorkshopModeActive, setIsWorkshopModeActive] = useState(false);

  // Load saved profile or trigger modal on first visit
  useEffect(() => {
    const saved = localStorage.getItem('primer_celular_perfil');
    if (saved === 'familia' || saved === 'docente') {
      setUserProfile(saved);
    } else {
      setIsProfileModalOpen(true);
    }

    // Check hash for #taller
    if (window.location.hash === '#taller') {
      setIsWorkshopModeActive(true);
    }
  }, []);

  // Keyboard shortcut to toggle workshop mode (Ctrl + Shift + P)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey && e.shiftKey && (e.key === 'P' || e.key === 'p')) || 
          (e.altKey && (e.key === 'T' || e.key === 't'))) {
        e.preventDefault();
        setIsWorkshopModeActive(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Smooth scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  // If workshop mode is active, render the presenter interface directly
  if (isWorkshopModeActive) {
    return (
      <div className="animate-in zoom-in-95">
        <WorkshopMode 
          onExit={() => {
            setIsWorkshopModeActive(false);
            if (window.location.hash === '#taller') {
              window.history.pushState(null, '', window.location.pathname);
            }
          }} 
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      
      {/* Profile Onboarding Modal */}
      <ProfileSelectorModal
        userProfile={userProfile}
        setUserProfile={setUserProfile}
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onOpenWorkshopMode={() => setIsWorkshopModeActive(true)}
      />

      {/* Top sticky navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        userProfile={userProfile}
        onOpenProfileSelector={() => setIsProfileModalOpen(true)}
      />

      {/* Main Content View with Smooth Page Transition */}
      <main className="flex-1 pb-20 lg:pb-0">
        <div key={activeTab} className="page-transition-enter">
          {activeTab === 'inicio' && (
            <div className="space-y-0">
              <HeroSection 
                setActiveTab={setActiveTab} 
                userProfile={userProfile}
                onOpenProfileSelector={() => setIsProfileModalOpen(true)}
              />
              <SercModelSection />
            </div>
          )}

          {activeTab === 'controles' && (
            <ParentalControlsSection />
          )}

          {activeTab === 'videos' && (
            <VideoLibrarySection />
          )}

          {activeTab === 'formacion' && (
            <DigitalHealthSection />
          )}

          {/* Optional Tools: Agreement Generator & Readiness Test */}
          {(activeTab === 'opcionales' || activeTab === 'protocolo' || activeTab === 'test') && (
            <OptionalToolsSection />
          )}

          {activeTab === 'documentos' && (
            <DocumentsLibrarySection />
          )}

          {activeTab === 'uruguay' && (
            <UruguayNormativeSection />
          )}

          {activeTab === 'docentes' && (
            <TeachersSection onOpenWorkshopMode={() => setIsWorkshopModeActive(true)} />
          )}
        </div>
      </main>

      {/* Bottom Nav Bar on Mobile Screens */}
      <BottomNavMobile 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        userProfile={userProfile} 
      />

      {/* Global Footer */}
      <Footer 
        setActiveTab={setActiveTab} 
        onOpenWorkshopMode={() => setIsWorkshopModeActive(true)}
      />

    </div>
  );
}
