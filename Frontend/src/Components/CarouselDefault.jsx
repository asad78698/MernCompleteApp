import React from 'react';
import { Carousel } from "@material-tailwind/react";
import { newimg } from '../assets/Images';


export function CarouselDefault() {
  return (
   <section className='max-w-screen-2xl mx-auto'>
     <Carousel className=" rounded-md">
      <img
        src={newimg}
        alt="image 2"
        className="h-full w-full object-cover"
      />

       <img
        src={newimg}
        alt="image 2"
        className="h-full w-full object-cover"
      />

       <img
        src={newimg}
        alt="image 1"
        className="h-full w-full object-cover"
      />
     
    </Carousel>
   </section>
  );
}

export default CarouselDefault;
