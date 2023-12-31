type PropType = {
  selected: boolean
  imgSrc: string
  onClick: () => void
}

export const Thumb: React.FC<PropType> = (props) => {
  const { selected, imgSrc, onClick } = props

  return (
    <div
      className={'embla-thumbs__slide'.concat(
        selected ? ' embla-thumbs__slide--selected opacity-100' : ' opacity-50'
      )}
    >
      <button
        onClick={onClick}
        className="embla-thumbs__slide__button"
        type="button"
      >
        <img
          className="embla-thumbs__slide__img rounded-full w-32 h-32 object-cover"
          src={imgSrc}
          alt="Your alt text"
        />
      </button>
    </div>
  )
}