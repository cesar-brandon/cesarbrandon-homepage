"use client"
import React, { useCallback } from 'react'
import useEmblaCarousel, {
  EmblaOptionsType,
  EmblaCarouselType
} from 'embla-carousel-react'
import { DotButton, useDotButton } from '@/components/common/carousel-dot-button'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from '@/components/common/carousel-arrow-buttons'
import Autoplay from 'embla-carousel-autoplay'
import ClientSideRoute from './ClientSideRoute'
import BlurImage from './blur-image'
import urlFor from '@/lib/urlFor'
import { cn } from '@/utilities/style'

type PropType = {
  slides: Post[] | Project[]
  options?: EmblaOptionsType
  className?: string
}

const Carousel: React.FC<PropType> = (props) => {
  const { slides, options, className } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()])

  const onButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const { autoplay } = emblaApi.plugins()
    if (!autoplay) return
    if (autoplay.options.stopOnInteraction !== false) autoplay.stop()
  }, [])

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onButtonClick
  )

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi, onButtonClick)

  const axis = options?.axis;

  return (
    <div className={cn("overflow-hidden border-2 border-black rounded-lg z-[1]", className)}>
      <div ref={emblaRef}>
        <div className={`${!axis && "flex"}`}>
          {slides.map(({ _id, slug, author, mainImage }: Post | Project) => (
            <ClientSideRoute
              key={_id}
              route={`/projects/${slug.current}`}
            >
              <div className={`${axis ? "w-full" : "w-[50rem]"}  h-96 overflow-hidden`}>
                <BlurImage
                  src={urlFor(mainImage).url()}
                  alt={author.name}
                  width="1920"
                  height="1080"
                />
              </div>
            </ClientSideRoute>
          ))}
        </div>
      </div>

      {!axis && (
        <>
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </>
      )}

      {axis && (
        <div className="flex items-end flex-col gap-1 absolute right-0 top-1/2">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'w-6 h-1 bg-black rounded-full'.concat(
                index === selectedIndex ? ' w-8' : ''
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Carousel;
