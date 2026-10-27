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
import ResearcherDashboardModal from './components/ResearcherDashboardModal';
import FamilyEssentialView from './components/FamilyEssentialView';
import Footer from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState('inicio');
  const [userProfile, setUserProfile] = useState('familia'); // 'familia' | 'docente'
  const [familyViewMode, setFamilyViewMode] = useState(() => {
    return localStorage.getItem('primer_celular_vista_familia') || 'esencial'; // 'esencial' | 'completa'
  });
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isWorkshopModeActive, setIsWorkshopModeActive] = useState(false);
  const [isResearcherModalOpen, setIsResearcherModalOpen] = useState(false);

  const handleSetFamilyViewMode = (mode) => {
    setFamilyViewMode(mode);
    localStorage.setItem('primer_celular_vista_familia', mode);
  };

  // Load saved profile or trigger modal on first visit
  useEffect(() => {
    const hash = window.location.hash || '';
    const search = window.location.search || '';
    const isDirectSurvey = hash.startsWith('#encuesta') || search.includes('taller=');
    const isDirectResearch = hash === '#investigacion';

    const saved = localStorage.getItem('primer_celular_perfil');
    if (saved === 'familia' || saved === 'docente') {
      setUserProfile(saved);
    } else if (!isDirectSurvey && !isDirectResearch) {
      setIsProfileModalOpen(true);
    }

    if (hash === '#taller') {
      setIsWorkshopModeActive(true);
    } else if (isDirectSurvey) {
      setActiveTab('encuesta');
    } else if (isDirectResearch) {
      setIsResearcherModalOpen(true);
    }
  }, []);

  // Keyboard shortcuts:
  // - Ctrl + Shift + P (or Alt + T): Toggle Workshop Mode
  // - Ctrl + Shift + I: Toggle Researcher Dashboard Modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey && e.shiftKey && (e.key === 'P' || e.key === 'p')) || 
          (e.altKey && (e.key === 'T' || e.key === 't'))) {
        e.preventDefault();
        setIsWorkshopModeActive(prev => !prev);
      } else if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i')) {
        e.preventDefault();
        setIsResearcherModalOpen(prev => !prev);
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
      <WorkshopMode 
        onExit={() => {
          setIsWorkshopModeActive(false);
          if (window.location.hash === '#taller') {
            window.history.pushState(null, '', window.location.pathname);
          }
        }} 
      />
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
        onOpenResearcherDashboard={() => setIsResearcherModalOpen(true)}
      />

      {/* Password-Protected Researcher Profile Modal */}
      <ResearcherDashboardModal
        isOpen={isResearcherModalOpen}
        onClose={() => setIsResearcherModalOpen(false)}
        onOpenSurvey={() => setActiveTab('encuesta')}
      />

      {/* Top sticky navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        userProfile={userProfile}
        familyViewMode={familyViewMode}
        onSetFamilyViewMode={handleSetFamilyViewMode}
        onOpenProfileSelector={() => setIsProfileModalOpen(true)}
      />

      {/* Main Content View with Smooth Page Transition */}
      <main className="flex-1 pb-20 lg:pb-0">
        <div key={activeTab} className="page-transition-enter">
          {activeTab === 'inicio' && (
            userProfile === 'familia' && familyViewMode === 'esencial' ? (
              <FamilyEssentialView 
                onNavigateTab={setActiveTab}
                onSwitchToCompleteView={() => handleSetFamilyViewMode('completa')}
              />
            ) : (
              <div className="space-y-0">
                <HeroSection 
                  setActiveTab={setActiveTab} 
                  userProfile={userProfile}
                  familyViewMode={familyViewMode}
                  onSetFamilyViewMode={handleSetFamilyViewMode}
                  onOpenProfileSelector={() => setIsProfileModalOpen(true)}
                />
                <SercModelSection />
              </div>
            )
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

          {/* Optional Tools & Anonymous Family Research Survey */}
          {(activeTab === 'encuesta' || activeTab === 'opcionales' || activeTab === 'protocolo' || activeTab === 'test') && (
            <OptionalToolsSection
              userProfile={userProfile}
              initialTool={
                activeTab === 'encuesta'
                  ? 'encuesta'
                  : activeTab === 'test'
                  ? 'test'
                  : 'acuerdo-familiar'
              }
              onNavigateTab={setActiveTab}
              onOpenResearcherDashboard={() => setIsResearcherModalOpen(true)}
            />
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
        onOpenResearcherDashboard={() => setIsResearcherModalOpen(true)}
      />

    </div>
  );
}
