
const GridItem = ({ item, onClick }) => {
  const handleClick = (e) => {
    onClick(item, e);
  };

  const dataAttributes = {};
  if (item.dataSteps !== undefined) dataAttributes['data-steps'] = item.dataSteps;
  if (item.dataRotationRange !== undefined) dataAttributes['data-rotation-range'] = item.dataRotationRange;
  if (item.dataStepInterval !== undefined) dataAttributes['data-step-interval'] = item.dataStepInterval;
  if (item.dataMoverPauseBeforeExit !== undefined) dataAttributes['data-mover-pause-before-exit'] = item.dataMoverPauseBeforeExit;
  if (item.dataMoverEnterEase) dataAttributes['data-mover-enter-ease'] = item.dataMoverEnterEase;
  if (item.dataMoverExitEase) dataAttributes['data-mover-exit-ease'] = item.dataMoverExitEase;
  if (item.dataPanelRevealEase) dataAttributes['data-panel-reveal-ease'] = item.dataPanelRevealEase;
  if (item.dataStepDuration !== undefined) dataAttributes['data-step-duration'] = item.dataStepDuration;
  if (item.dataPathMotion) dataAttributes['data-path-motion'] = item.dataPathMotion;
  if (item.dataSineAmplitude !== undefined) dataAttributes['data-sine-amplitude'] = item.dataSineAmplitude;
  if (item.dataClipPathDirection) dataAttributes['data-clip-path-direction'] = item.dataClipPathDirection;
  if (item.dataAutoAdjustHorizontalClipPath !== undefined) dataAttributes['data-auto-adjust-horizontal-clip-path'] = item.dataAutoAdjustHorizontalClipPath;
  if (item.dataPanelRevealDurationFactor !== undefined) dataAttributes['data-panel-reveal-duration-factor'] = item.dataPanelRevealDurationFactor;
  if (item.dataMoverBlendMode) dataAttributes['data-mover-blend-mode'] = item.dataMoverBlendMode;

  return (
    <figure
      className="grid__item m-0 p-0 flex flex-col gap-1 cursor-pointer will-change-[transform,clip-path] overflow-hidden"
      role="img"
      aria-labelledby={`caption${item.id}`}
      onClick={handleClick}
      {...dataAttributes}
    >
      <div
        className="grid__item-image w-full aspect-[4/5] bg-[length:100%] bg-[position:50%_50%] transition-opacity duration-150 ease-[cubic-bezier(0.2,0,0.2,1)] hover:opacity-70"
        style={{ backgroundImage: `url(assets/${item.img})` }}
      />
      <figcaption className="grid__item-caption" id={`caption${item.id}`}>
        <h3 className="text-base font-medium m-0 text-right">{item.title}</h3>
        <p className="hidden">{item.desc}</p>
      </figcaption>
    </figure>
  );
};

export default GridItem;

