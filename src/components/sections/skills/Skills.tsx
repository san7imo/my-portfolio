// src/components/sections/skills/Skills.tsx
import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import DaySkyCanvas from './components/DaySkyCanvas';
import SpaceStation from './components/SpaceStation';
import MoonSurface from './components/MoonSurface';
import SkillSprite from './components/SkillSprite';
import MissionProgress from './components/MissionProgress';
import { softSkillsData } from '../../../data/skillsData';

const TITLE_DELAY = 1000;
const ROCKET_DELAY = 2000;

const Skills: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [exploredSkills, setExploredSkills] = useState<Set<string>>(new Set());
  const [rocketLanded, setRocketLanded] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  
  const sectionRef = useRef<HTMLDivElement>(null);

  // Activar la sección cuando sea visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setShowTitle(true), TITLE_DELAY);
          setTimeout(() => setRocketLanded(true), ROCKET_DELAY);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSkillClick = useCallback((skillId: string) => {
    setSelectedSkill(skillId);
    setExploredSkills(prev => new Set(prev).add(skillId));
  }, []);

  const missionCompleted = useMemo(
    () => exploredSkills.size === softSkillsData.length && exploredSkills.size > 0,
    [exploredSkills]
  );

  return (
    <section 
      ref={sectionRef}
      id="skills" 
      className="relative w-full min-h-screen overflow-hidden flex flex-col"
    >
      {/* Fondo espacial con parallax */}
      <div className="absolute inset-0 z-0">
        <DaySkyCanvas />
      </div>


      {/* Título */}
      <div className="absolute top-4 sm:top-8 left-1/2 -translate-x-1/2 sm:left-8 sm:translate-x-0 z-10 w-full sm:max-w-md px-4 sm:px-0 transition-all duration-[2000ms] 
        ease-out"
        style={{ 
          opacity: showTitle ? 1 : 0, 
          transform: `translateY(${showTitle ? 0 : -32}px)` 
        }}
      >
        <div className="relative">
          {/* Glow */}
          <div className="absolute inset-0 blur-2xl scale-110 rounded-full animate-pulse"></div>
          
          <h2 className="relative text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-transparent 
            bg-gradient-to-r from-cyan-400 via-blue-300 to-purple-400 bg-clip-text mb-2 sm:mb-4 pixel-text text-center sm:text-left">
            🚀 MISIÓN: EXPLORACIÓN LUNAR
          </h2>
          
          <div className="relative backdrop-blur-sm rounded-xl p-3 sm:p-4 border-2 border-cyan-500/40 shadow-2xl max-w-xs z-[15]">
            <p className="text-cyan-300 text-sm sm:text-lg font-semibold mb-2 pixel-text text-center">
              Explora la superficie lunar para descubrir mis soft skills
            </p>
          </div>        </div>
      </div>

      {/* Barra de progreso */}
      <div className="absolute bottom-[8%] sm:bottom-auto sm:top-8 left-1/2 sm:left-auto sm:right-8 -translate-x-1/2 sm:translate-x-0 z-10">
        <MissionProgress 
          exploredSkills={exploredSkills}
          totalSkills={softSkillsData.length}
          isVisible={showTitle}
          missionCompleted={missionCompleted}
        />
      </div>

      {/* Superficie Lunar */}
      <div className="absolute inset-0 flex justify-center items-center z-10 -mt-20 sm:mt-0">
        <MoonSurface isVisible={isVisible}>
          {softSkillsData.map((skill, index) => (
            <SkillSprite
              key={skill.id}
              skill={skill}
              index={index}
              isVisible={isVisible && rocketLanded}
              onSkillClick={handleSkillClick}
              isSelected={selectedSkill === skill.id}
            />
          ))}
        </MoonSurface>
      </div>

      {/* Estación Espacial */}
      <SpaceStation isVisible={isVisible} />

      {/* Misión Completada */}
      {missionCompleted && (
        <div className="absolute inset-0 z-50 pointer-events-none">
          {Array.from({ length: 10 }, (_, i) => {
            const left = 20 + Math.random() * 60;
            const top = 20 + Math.random() * 60;
            return (
              <div
                key={`firework-${i}`}
                className="absolute w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-ping"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: `${2 + Math.random()}s`
                }}
              />
            );
          })}
        </div>
      )}

      {/* Pixel font */}
      <style>{`
        .pixel-text {
          font-family: 'Courier New', monospace;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
          image-rendering: pixelated;
        }
      `}</style>
    </section>
  );
};

export default Skills;
