import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SECTIONS } from '../utils/constants';

gsap.registerPlugin(ScrollTrigger);

export const useScrollManager = (
  onSectionChange: (sectionId: string) => void
) => {
  useEffect(() => {
    SECTIONS.forEach((sectionId) => {
      const section = document.getElementById(sectionId);
      if (section) {
        ScrollTrigger.create({
          trigger: section,
          start: 'top 50%',
          end: 'bottom 50%',
          onEnter: () => onSectionChange(sectionId),
          onEnterBack: () => onSectionChange(sectionId)
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [onSectionChange]);
};