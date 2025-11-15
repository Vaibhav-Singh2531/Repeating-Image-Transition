import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { preloadImages } from './utils';
import { useImageTransition } from './hooks/useImageTransition';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { gridSections } from './data/gridItems';
import Header from './components/Header';
import GridSection from './components/GridSection';
import Panel from './components/Panel';
import Footer from './components/Footer';

function App() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const panelRef = useRef(null);
  const panelImgRef = useRef(null);
  const panelContentRef = useRef(null);
  const mainRef = useRef(null);

  const { handleGridItemClick, resetView } = useImageTransition();
  useSmoothScroll();

  useEffect(() => {
    preloadImages('.grid__item-image, .panel__img').then(() => {
      setIsLoading(false);
      document.body.classList.remove('loading');
    });
  }, []);

  const handleItemClick = (item, event) => {
    const clickedElement = event?.currentTarget || document.querySelector(`[aria-labelledby="caption${item.id}"]`);
    const gridElement = clickedElement?.closest('.grid') || mainRef.current?.querySelector('.grid') || document.querySelector('.grid');
    const panelElement = panelRef.current;
    const panelImgElement = panelElement?.querySelector('.panel__img');
    const panelContentElement = panelElement?.querySelector('.panel__content');
    
    const frameElements = [
      mainRef.current?.querySelector('.frame'),
      ...Array.from(mainRef.current?.querySelectorAll('.heading') || [])
    ].filter(Boolean);

    if (!clickedElement || !gridElement || !panelElement || !panelImgElement || !panelContentElement) {
      console.error('Missing required elements:', { 
        clickedElement: !!clickedElement, 
        gridElement: !!gridElement, 
        panelElement: !!panelElement, 
        panelImgElement: !!panelImgElement, 
        panelContentElement: !!panelContentElement 
      });
      return;
    }

    handleGridItemClick(
      clickedElement,
      item,
      gridElement,
      panelElement,
      panelContentElement,
      panelImgElement,
      frameElements,
      () => {
        setSelectedItem(item);
        setIsPanelOpen(true);
      }
    );
  };

  const handleClose = () => {
    const panelElement = panelRef.current;
    const allItems = document.querySelectorAll('.grid__item');

    if (!panelElement || allItems.length === 0) return;
    
    const frameElements = [
      mainRef.current?.querySelector('.frame'),
      ...Array.from(mainRef.current?.querySelectorAll('.heading') || [])
    ].filter(Boolean);

    gsap.to(frameElements, {
      opacity: 1,
      duration: 0.5,
      ease: 'sine.inOut',
      pointerEvents: 'auto',
    });

    resetView(panelElement, allItems, () => {
      setSelectedItem(null);
      setIsPanelOpen(false);
    });
  };

  return (
    <div className={isLoading ? 'loading' : ''}>
      <main ref={mainRef} className="p-[var(--page-padding)]">
        <Header />
        
        {gridSections.map((section, index) => (
          <GridSection key={index} section={section} onItemClick={handleItemClick} />
        ))}

        <Panel
          ref={panelRef}
          panelImgRef={panelImgRef}
          panelContentRef={panelContentRef}
          isOpen={isPanelOpen}
          item={selectedItem}
          onClose={handleClose}
        />

        <Footer />
      </main>
    </div>
  );
}

export default App;
