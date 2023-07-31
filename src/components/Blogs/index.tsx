import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import React from 'react';

import { IBlog } from '@/data';

import NextImage from '@/components/NextImage';

const Blog = ({ item }: { item: IBlog }) => {
  return (
    <div className='flex w-full flex-col gap-4 p-2 shadow-md' key={item.author}>
      <NextImage
        className='w-full cursor-pointer'
        width={600}
        height={600}
        src={item.blog_image}
        alt=''
      />
      <span className='w-20 cursor-pointer rounded-md bg-amber-400 py-1  text-center text-xs font-bold text-white'>
        LIFESTYLE
      </span>
      <div>
        <div className='flex items-center justify-between'>
          <h6 className='mr-2 text-sm font-bold lg:text-lg'>{item.author}</h6>
          <span className='text-[11px] text-gray-700 lg:text-lg'>
            {item.date}
          </span>
        </div>
        <h4 className='text-md pb-6 pt-2 sm:text-xl'>{item.title}</h4>
        <p className='hidden text-gray-700 md:block'>{item.description}</p>
      </div>
      <button className='mt-6 flex h-full w-full items-end '>
        <div className='flex h-14 w-36 items-center justify-center gap-1 rounded-md border-2 font-semibold transition-all hover:border-amber-400 hover:text-amber-400'>
          <span>Read More</span>
          <span>
            <KeyboardArrowRightIcon />
          </span>
        </div>
      </button>
    </div>
  );
};

export default Blog;
