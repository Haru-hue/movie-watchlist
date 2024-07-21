import useEmblaCarousel from 'embla-carousel-react'
import { ReactNode } from 'react';
export const EmblaCarousel = ({ children }: { children: ReactNode }) => {
  const [emblaRef] = useEmblaCarousel()
      
  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container gap-4">
          {children}
        </div>
      </div>
    
    </div>
  );
};
