interface ICard {
  image: {
    source: string;
    alt: string;
  };
  title: string;
  onClick: () => void;
}

export function CardButton({ image, title, onClick }: ICard) {
  return (
    <button
      className="bg-zinc-800 rounded-lg py-5 w-24 flex-1 flex flex-col items-center gap-2 
      border-2 border-transparent hover:border-brand-500 focus:border-brand-500
      focus:outline-none"
      onClick={onClick}
      type="button"
    >
      <img src={image?.source} alt={image?.alt} />
      <span>{title}</span>
    </button>
  )
}