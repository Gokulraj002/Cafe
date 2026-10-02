'use client';

import { useRef, useState } from 'react';
import menu from '@/data/menu';
import useGsap from '@/hooks/useGsap';
import { gsap } from '@/lib/animations';
import SectionHeading from '@/components/common/SectionHeading';
import MenuCategory from './MenuCategory';

/**
 * The café menu with category tabs (WAI-ARIA tabs pattern: arrow keys move
 * between tabs, Home/End jump to the ends).
 *
 * @param {string} [theme] Theme class for the section, e.g. "theme-espresso"
 */
export default function MenuSection({
  id = 'menu',
  eyebrow = 'The Menu',
  title = 'Made to order, never rushed.',
  intro = 'A short menu, done properly, priced inclusive of GST. Oat or almond milk at no extra cost.',
  theme = 'theme-espresso',
  className = '',
}) {
  const sectionRef = useRef(null);
  const panelRef = useRef(null);
  const tabRefs = useRef([]);
  const hasSwitchedTab = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeCategory = menu[activeIndex];

  useGsap(
    ({ reduceMotion }) => {
      // Only animate a tab change — the first panel is revealed with the page.
      if (reduceMotion || !hasSwitchedTab.current) return;
      gsap.from(panelRef.current.querySelectorAll('.menu-item'), {
        autoAlpha: 0,
        y: 18,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.05,
      });
    },
    sectionRef,
    [activeIndex],
  );

  function showCategory(index) {
    hasSwitchedTab.current = true;
    setActiveIndex(index);
  }

  function selectTab(index) {
    const nextIndex = (index + menu.length) % menu.length;
    showCategory(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  }

  function handleTabKeyDown(event) {
    const keyActions = {
      ArrowRight: () => selectTab(activeIndex + 1),
      ArrowLeft: () => selectTab(activeIndex - 1),
      Home: () => selectTab(0),
      End: () => selectTab(menu.length - 1),
    };
    const action = keyActions[event.key];
    if (!action) return;
    event.preventDefault();
    action();
  }

  return (
    <section ref={sectionRef} id={id} className={`section menu-section ${theme} ${className}`} aria-labelledby={`${id}-title`}>
      <div className="container">
        <div className="row g-5 align-items-end mb-5">
          <div className="col-lg-7">
            <SectionHeading id={`${id}-title`} eyebrow={eyebrow} title={title} intro={intro} />
          </div>
          <div className="col-lg-5">
            <div className="menu-tabs" role="tablist" aria-label="Menu categories">
              {menu.map((category, index) => (
                <button
                  key={category.id}
                  ref={(element) => {
                    tabRefs.current[index] = element;
                  }}
                  type="button"
                  role="tab"
                  id={`${id}-tab-${category.id}`}
                  aria-selected={index === activeIndex}
                  aria-controls={`${id}-panel`}
                  tabIndex={index === activeIndex ? 0 : -1}
                  className={`menu-tabs__tab ${index === activeIndex ? 'is-active' : ''}`}
                  onClick={() => showCategory(index)}
                  onKeyDown={handleTabKeyDown}
                >
                  {category.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div
          ref={panelRef}
          id={`${id}-panel`}
          role="tabpanel"
          aria-labelledby={`${id}-tab-${activeCategory.id}`}
          className="menu-panel"
        >
          <p className="menu-panel__note type-lead type-italic">{activeCategory.note}</p>
          <MenuCategory category={activeCategory} showTitle={false} className="menu-category--columns" />
        </div>
      </div>
    </section>
  );
}
