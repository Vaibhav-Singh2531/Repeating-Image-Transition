import { useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { getClipPathsForDirection, lerp, getElementCenter } from '../utils';

const defaultConfig = {
  clipPathDirection: 'top-bottom',
  autoAdjustHorizontalClipPath: true,
  steps: 6,
  stepDuration: 0.35,
  stepInterval: 0.05,
  moverPauseBeforeExit: 0.14,
  rotationRange: 0,
  wobbleStrength: 0,
  panelRevealEase: 'sine.inOut',
  gridItemEase: 'sine',
  moverEnterEase: 'sine.in',
  moverExitEase: 'sine',
  panelRevealDurationFactor: 2,
  clickedItemDurationFactor: 2,
  gridItemStaggerFactor: 0.3,
  moverBlendMode: false,
  pathMotion: 'linear',
  sineAmplitude: 50,
  sineFrequency: Math.PI,
};

export const useImageTransition = () => {
  const isAnimatingRef = useRef(false);
  const currentItemRef = useRef(null);
  const configRef = useRef({ ...defaultConfig });

  const extractItemConfigOverrides = useCallback((item) => {
    const overrides = {};
    const dataset = item.dataset || {};

    if (dataset.clipPathDirection) overrides.clipPathDirection = dataset.clipPathDirection;
    if (dataset.steps) overrides.steps = parseInt(dataset.steps);
    if (dataset.stepDuration) overrides.stepDuration = parseFloat(dataset.stepDuration);
    if (dataset.stepInterval) overrides.stepInterval = parseFloat(dataset.stepInterval);
    if (dataset.rotationRange) overrides.rotationRange = parseFloat(dataset.rotationRange);
    if (dataset.wobbleStrength) overrides.wobbleStrength = parseFloat(dataset.wobbleStrength);
    if (dataset.moverPauseBeforeExit) overrides.moverPauseBeforeExit = parseFloat(dataset.moverPauseBeforeExit);
    if (dataset.panelRevealEase) overrides.panelRevealEase = dataset.panelRevealEase;
    if (dataset.gridItemEase) overrides.gridItemEase = dataset.gridItemEase;
    if (dataset.moverEnterEase) overrides.moverEnterEase = dataset.moverEnterEase;
    if (dataset.moverExitEase) overrides.moverExitEase = dataset.moverExitEase;
    if (dataset.panelRevealDurationFactor) overrides.panelRevealDurationFactor = parseFloat(dataset.panelRevealDurationFactor);
    if (dataset.clickedItemDurationFactor) overrides.clickedItemDurationFactor = parseFloat(dataset.clickedItemDurationFactor);
    if (dataset.gridItemStaggerFactor) overrides.gridItemStaggerFactor = parseFloat(dataset.gridItemStaggerFactor);
    if (dataset.moverBlendMode) overrides.moverBlendMode = dataset.moverBlendMode;
    if (dataset.pathMotion) overrides.pathMotion = dataset.pathMotion;
    if (dataset.sineAmplitude) overrides.sineAmplitude = parseFloat(dataset.sineAmplitude);
    if (dataset.sineFrequency) overrides.sineFrequency = parseFloat(dataset.sineFrequency);

    return overrides;
  }, []);

  const positionPanelBasedOnClick = useCallback((clickedItem, panelElement) => {
    const centerX = getElementCenter(clickedItem).x;
    const windowHalf = window.innerWidth / 2;
    const isLeftSide = centerX < windowHalf;

    if (panelElement) {
      if (isLeftSide) {
        panelElement.classList.add('panel--right');
      } else {
        panelElement.classList.remove('panel--right');
      }
    }

    if (configRef.current.autoAdjustHorizontalClipPath) {
      if (
        configRef.current.clipPathDirection === 'left-right' ||
        configRef.current.clipPathDirection === 'right-left'
      ) {
        configRef.current.clipPathDirection = isLeftSide ? 'left-right' : 'right-left';
      }
    }
  }, []);

  const generateMotionPath = useCallback((startRect, endRect, steps) => {
    const path = [];
    const fullSteps = steps + 2;
    const startCenter = {
      x: startRect.left + startRect.width / 2,
      y: startRect.top + startRect.height / 2,
    };
    const endCenter = {
      x: endRect.left + endRect.width / 2,
      y: endRect.top + endRect.height / 2,
    };

    for (let i = 0; i < fullSteps; i++) {
      const t = i / (fullSteps - 1);
      const width = lerp(startRect.width, endRect.width, t);
      const height = lerp(startRect.height, endRect.height, t);
      const centerX = lerp(startCenter.x, endCenter.x, t);
      const centerY = lerp(startCenter.y, endCenter.y, t);

      const sineOffset =
        configRef.current.pathMotion === 'sine'
          ? Math.sin(t * configRef.current.sineFrequency) * configRef.current.sineAmplitude
          : 0;

      const wobbleX = (Math.random() - 0.5) * configRef.current.wobbleStrength;
      const wobbleY = (Math.random() - 0.5) * configRef.current.wobbleStrength;

      path.push({
        left: centerX - width / 2 + wobbleX,
        top: centerY - height / 2 + sineOffset + wobbleY,
        width,
        height,
      });
    }

    return path.slice(1, -1);
  }, []);

  const computeStaggerDelays = useCallback((clickedItem, items) => {
    const baseCenter = getElementCenter(clickedItem);
    const distances = Array.from(items).map((el) => {
      const center = getElementCenter(el);
      return Math.hypot(center.x - baseCenter.x, center.y - baseCenter.y);
    });
    const max = Math.max(...distances);
    return distances.map((d) => (d / max) * configRef.current.gridItemStaggerFactor);
  }, []);

  const animateGridItems = useCallback((items, clickedItem, delays) => {
    const clipPaths = getClipPathsForDirection(configRef.current.clipPathDirection);

    gsap.to(items, {
      opacity: 0,
      scale: (i, el) => (el === clickedItem ? 1 : 0.8),
      duration: (i, el) =>
        el === clickedItem
          ? configRef.current.stepDuration * configRef.current.clickedItemDurationFactor
          : 0.3,
      ease: configRef.current.gridItemEase,
      clipPath: (i, el) => (el === clickedItem ? clipPaths.from : 'none'),
      delay: (i) => delays[i],
    });
  }, []);

  const animateTransition = useCallback((startEl, endEl, imgURL, gridContainer) => {
    const path = generateMotionPath(
      startEl.getBoundingClientRect(),
      endEl.getBoundingClientRect(),
      configRef.current.steps
    );
    const fragment = document.createDocumentFragment();
    const clipPaths = getClipPathsForDirection(configRef.current.clipPathDirection);

    path.forEach((step, index) => {
      const mover = document.createElement('div');
      mover.className = 'mover';
      const style = {
        backgroundImage: imgURL,
        position: 'fixed',
        left: step.left,
        top: step.top,
        width: step.width,
        height: step.height,
        clipPath: clipPaths.from,
        zIndex: 1000 + index,
        backgroundPosition: '50% 50%',
        rotationZ: gsap.utils.random(-configRef.current.rotationRange, configRef.current.rotationRange),
      };
      if (configRef.current.moverBlendMode) style.mixBlendMode = configRef.current.moverBlendMode;
      gsap.set(mover, style);
      fragment.appendChild(mover);

      const delay = index * configRef.current.stepInterval;
      gsap
        .timeline({ delay })
        .fromTo(
          mover,
          { opacity: 0.4, clipPath: clipPaths.hide },
          {
            opacity: 1,
            clipPath: clipPaths.reveal,
            duration: configRef.current.stepDuration,
            ease: configRef.current.moverEnterEase,
          }
        )
        .to(
          mover,
          {
            clipPath: clipPaths.from,
            duration: configRef.current.stepDuration,
            ease: configRef.current.moverExitEase,
          },
          `+=${configRef.current.moverPauseBeforeExit}`
        );
    });

    if (fragment.childNodes.length > 0) {
      document.body.appendChild(fragment);
    }

    const cleanupDelay =
      configRef.current.steps * configRef.current.stepInterval +
      configRef.current.stepDuration * 2 +
      configRef.current.moverPauseBeforeExit;
    gsap.delayedCall(cleanupDelay, () => {
      document.querySelectorAll('.mover').forEach((m) => m.remove());
    });
  }, [generateMotionPath]);

  const revealPanel = useCallback((panelElement, panelContentElement, endImgElement, onComplete) => {
    const clipPaths = getClipPathsForDirection(configRef.current.clipPathDirection);

    gsap.set(panelContentElement, { opacity: 0 });
    gsap.set(panelElement, { opacity: 1, pointerEvents: 'auto' });

    gsap
      .timeline({
        defaults: {
          duration: configRef.current.stepDuration * configRef.current.panelRevealDurationFactor,
          ease: configRef.current.panelRevealEase,
        },
      })
      .fromTo(
        endImgElement,
        { clipPath: clipPaths.hide },
        {
          clipPath: clipPaths.reveal,
          pointerEvents: 'auto',
          delay: configRef.current.steps * configRef.current.stepInterval,
        }
      )
      .fromTo(
        panelContentElement,
        { y: 25 },
        {
          duration: 1,
          ease: 'expo',
          opacity: 1,
          y: 0,
          delay: configRef.current.steps * configRef.current.stepInterval,
          onComplete: () => {
            isAnimatingRef.current = false;
            if (onComplete) onComplete();
          },
        },
        '<-=.2'
      );
  }, []);

  const resetView = useCallback((panelElement, allItems, onComplete) => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const delays = computeStaggerDelays(currentItemRef.current, allItems);

    gsap
      .timeline({
        defaults: { duration: configRef.current.stepDuration, ease: 'expo' },
        onComplete: () => {
          if (panelElement) {
            panelElement.classList.remove('panel--right');
          }
          isAnimatingRef.current = false;
          if (onComplete) onComplete();
        },
      })
      .to(panelElement, { opacity: 0 })
      .set(panelElement, { opacity: 0, pointerEvents: 'none' })
      .set(panelElement?.querySelector('.panel__img'), {
        clipPath: 'inset(0% 0% 100% 0%)',
      })
      .set(allItems, { clipPath: 'none', opacity: 0, scale: 0.8 }, 0)
      .to(
        allItems,
        {
          opacity: 1,
          scale: 1,
          delay: (i) => delays[i],
        },
        '>'
      );

    configRef.current = { ...defaultConfig };
  }, [computeStaggerDelays]);

  const handleGridItemClick = useCallback((item, itemData, gridContainer, panelElement, panelContentElement, panelImgElement, frameElements, onPanelOpen) => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    currentItemRef.current = item;

    const overrides = extractItemConfigOverrides(item);
    Object.assign(configRef.current, overrides);

    positionPanelBasedOnClick(item, panelElement);

    const imgURL = `url(assets/${itemData.img})`;
    if (panelImgElement) {
      panelImgElement.style.backgroundImage = imgURL;
    }
    if (panelContentElement) {
      const h3 = panelContentElement.querySelector('h3');
      const p = panelContentElement.querySelector('p');
      if (h3) h3.textContent = itemData.title;
      if (p) p.textContent = itemData.desc;
    }

    gsap.to(frameElements, {
      opacity: 0,
      duration: 0.5,
      ease: 'sine.inOut',
      pointerEvents: 'none',
    });

    const allItems = document.querySelectorAll('.grid__item');
    const delays = computeStaggerDelays(item, allItems);
    animateGridItems(allItems, item, delays);

    const startEl = item.querySelector('.grid__item-image');
    animateTransition(startEl, panelImgElement, imgURL, gridContainer);

    revealPanel(panelElement, panelContentElement, panelImgElement, () => {
      if (onPanelOpen) onPanelOpen();
    });
  }, [extractItemConfigOverrides, positionPanelBasedOnClick, computeStaggerDelays, animateGridItems, animateTransition, revealPanel]);

  return {
    handleGridItemClick,
    resetView,
    isAnimating: () => isAnimatingRef.current,
  };
};

