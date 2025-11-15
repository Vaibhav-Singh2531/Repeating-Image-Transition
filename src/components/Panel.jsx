import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';

const Panel = forwardRef(({ isOpen, item, onClose, panelImgRef, panelContentRef }, ref) => {
  const panelRef = useRef(null);
  
  useImperativeHandle(ref, () => panelRef.current);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return (
    <figure
      ref={panelRef}
      className="panel fixed m-0 w-full h-screen p-[var(--page-padding)] top-0 left-0 grid gap-[var(--panel-gap)] opacity-0 pointer-events-none z-[9999] will-change-[transform,clip-path] justify-center bg-[var(--color-bg)]"
      role="img"
      aria-labelledby="caption"
    >
      <div
        ref={panelImgRef}
        className="panel__img bg-cover bg-center w-full h-auto aspect-[4/5] md:h-full md:w-auto md:max-w-full relative z-[1]"
        style={{ backgroundImage: item ? `url(assets/${item.img})` : 'none' }}
      />
      <figcaption
        ref={panelContentRef}
        className="panel__content flex flex-col gap-2 justify-end items-end text-right relative z-[1]"
        id="caption"
      >
        <h3 className="m-0 text-base font-medium">{item?.title || ''}</h3>
        <p className="m-0 max-w-[150px] text-pretty">{item?.desc || ''}</p>
        <button
          type="button"
          className="panel__close bg-transparent border-0 p-0 m-0 font-inherit cursor-pointer text-[var(--color-close)] hover:text-[var(--color-link-hover)] focus:outline-none"
          onClick={onClose}
          aria-label="Close preview"
        >
          Close
        </button>
      </figcaption>
    </figure>
  );
});

Panel.displayName = 'Panel';

export default Panel;

