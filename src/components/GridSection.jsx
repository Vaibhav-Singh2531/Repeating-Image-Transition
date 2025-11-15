import GridItem from './GridItem';

const GridSection = ({ section, onItemClick }) => {
  return (
    <>
      <div className="heading flex flex-wrap items-end justify-between gap-4 my-40 mb-4">
        <h2 className="heading__title font-owners font-bold uppercase text-[clamp(2rem,10vw,6rem)] m-0 leading-[0.77]">
          {section.title}
        </h2>
        <span className="heading__meta after:content-['\00B7'] after:font-serif after:text-[3.5rem] after:leading-[0.2] after:align-middle after:ml-2 after:inline-flex">
          {section.meta}
        </span>
      </div>
      <div className="grid">
        {section.items.map((item) => (
          <GridItem key={item.id} item={item} onClick={onItemClick} />
        ))}
      </div>
    </>
  );
};

export default GridSection;

