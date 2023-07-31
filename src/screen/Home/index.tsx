import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Autoplay, EffectFade, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { dataSwiper, ourBlog, partner, photoSamples } from '@/data';

import Blog from '@/components/Blogs';
import { Input, Title } from '@/components/common';
import Layout from '@/components/layout/Layout';
import NextImage from '@/components/NextImage';
import ProductItem from '@/components/Products/ProductItem';

import { CmsApi } from '@/api/cms-api';
import ItemSwiper from '@/screen/Home/Swiper';
import { WithLayout } from '@/shared/types';
import { ReqSearchProduct } from '@/shared/types/itemType';
import { Product } from '@/shared/types/productType';

interface IService {
  icon: React.ReactElement;
  title: string;
  content: string;
}

const services: IService[] = [
  {
    icon: (
      <Image
        src='/svg/airplane-mode-active.svg'
        alt='airplane-mode-active'
        width={35}
        height={35}
      />
    ),
    title: 'Miễn phí vận chuyển toàn cầu',
    content: 'Cho tất cả đơn hàng trên $75.00',
  },
  {
    icon: (
      <Image
        width={35}
        height={35}
        src='/svg/payment-methods.svg'
        alt='apayment-methods'
      />
    ),
    title: 'Thanh toán 100% an toàn',
    content: 'Chúng tôi đảm bảo thanh toán an toàn với PEV',
  },
  {
    icon: (
      <Image
        width={35}
        height={35}
        src='/svg/return-icon.jpg'
        alt='apayment-methods'
      />
    ),
    title: '30 ngày đổi trả',
    content: 'Đổi trả trong vòng 20 ngày',
  },
];

const Home: NextPage & WithLayout = () => {
  const [product, setProduct] = useState<Product[]>([]);

  useEffect(() => {
    const handleSort = async ({ page, take }: ReqSearchProduct) => {
      try {
        const res = await CmsApi.getProducts({ page, take });
        setProduct(res.data.data);
      } catch (error) {
        toast.error('Lỗi load sản phẩm');
      }
    };
    handleSort({ page: 1, take: 12 });
  }, []);

  return (
    <div className='bg-background-home bg-cover bg-fixed bg-center bg-no-repeat'>
      <div className='bg-white px-10'>
        <div className='relative mb-10 w-full overflow-hidden'>
          <Swiper
            className='swiper'
            modules={[Autoplay, EffectFade, Pagination]}
            slidesPerView={1}
            // effect='fade'
            // fadeEffect={{ crossFade: true }}
            loop={true}
            scrollbar={{ draggable: true }}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            speed={800}
          >
            <div>
              {dataSwiper.map((item) => (
                <SwiperSlide key={item.image}>
                  <ItemSwiper {...item} />
                </SwiperSlide>
              ))}
            </div>
          </Swiper>
        </div>

        <div className='grid w-full grid-cols-2 gap-6 bg-white pb-7 md:grid-cols-4'>
          <NextImage
            src='/images/banner1.png'
            alt=''
            width={1000}
            height={1000}
            className='h-full w-full'
          />
          <NextImage
            src='/images/banner2.png'
            alt=''
            width={1000}
            height={1000}
            className='h-full w-full '
          />
          <NextImage
            src='/images/banner3.png'
            alt=''
            width={1000}
            height={1000}
            className=' col-span-2 hidden h-full w-full md:block'
          />
        </div>
        <section className='pb-10'>
          <Title
            title='Sản phẩm thịnh hành'
            content='Xem nhiều nhất trong tuần'
          />
          <div className='grid grid-flow-col gap-6'>
            <div>
              <NextImage
                className='hidden h-full w-full cursor-pointer md:block'
                width={1000}
                height={1000}
                src='https://cdn.shopify.com/s/files/1/0376/9440/6700/files/banner-product_1080x.jpg?v=1629543119'
                alt=''
              />
            </div>
            <div className='grid grid-cols-2 gap-6 md:grid-cols-3'>
              {product.slice(0, 6).map((item) => (
                <ProductItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        </section>
        <section className='mt-10 pb-6'>
          <div className='flex gap-6'>
            <NextImage
              width={1000}
              height={1000}
              src='https://cdn.shopify.com/s/files/1/0376/9440/6700/files/banner14_900x.jpg?v=1629543119'
              alt=''
            />
            <NextImage
              width={1000}
              height={1000}
              src='https://cdn.shopify.com/s/files/1/0376/9440/6700/files/banner15_900x.jpg?v=1629543119'
              alt=''
            />
          </div>
        </section>
        <section className='hidden pb-16 md:block'>
          <Title
            title='Sản phẩm bán chạy nhất'
            content='Xem nhiều nhất trong tuần'
          />
          <div className='grid gap-6  md:grid-cols-4 xl:grid-cols-6'>
            {product.map((item) => (
              <ProductItem key={item.id} item={item} />
            ))}
          </div>
        </section>
      </div>
      <section className='flex w-full items-center justify-center bg-transparent py-[80px]'>
        <div className=' inline-block w-full max-w-[690px] bg-white py-12 px-10 text-center'>
          <h3 className='mb-3 pt-6 text-3xl'>Theo dõi bản tin của chúng tôi</h3>
          <span className='text-gray-700'>
            Đăng ký nhận bản tin hàng tuần và xây dựng các cửa hàng thương mại
            điện tử tốt hơn.
          </span>
          <form className='my-8 flex w-full justify-between gap-4'>
            <Input
              type='text'
              placeholder='Địa chỉ email của bạn...'
              className='w-full rounded-md border-gray-300 px-4 focus:border-gray-300'
            />
            <button
              type='submit'
              className='w-32 rounded-sm bg-black px-4 font-normal text-white transition-all hover:bg-amber-400'
            >
              Đăng ký
            </button>
          </form>
          <span className='text-gray-700'>
            Chúng tôi tôn trọng quyền riêng tư của bạn, vì vậy chúng tôi không
            bao giờ chia sẻ thông tin của bạn.
          </span>
        </div>
      </section>
      <div className=' bg-white'>
        <section className='bg-[#f8f8f8] px-10'>
          <div className='hidden w-full items-center justify-around py-20 md:flex '>
            {services.map((service) => (
              <div
                key={service.title}
                className='flex w-full flex-col items-center justify-center gap-2 border-r last:border-0'
              >
                <span>{service.icon}</span>
                <h4 className='font-semibold'>{service.title}</h4>
                <p>{service.content}</p>
                <Link
                  href='/'
                  className='mt-2 flex items-center justify-center gap-2'
                >
                  <span className='font-bold'>Đọc thêm</span>
                  <span>
                    <Image
                      width={12}
                      height={8}
                      src='/svg/arrow-right-icon.png'
                      alt='arrow-right-icon'
                    />
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </section>
        <section className='px-10 pt-10'>
          <Title
            title='From Our Blog'
            content='Commodo sociosqu venenatis cras dolor sagittis integer luctus sem primis eget'
          />
          <div className='grid grid-cols-2 gap-6 pt-2 md:grid-cols-3'>
            {ourBlog.slice(0, 3).map((item) => (
              <Blog key={item.author} item={item} />
            ))}
          </div>
        </section>
        <section className='px-10'>
          <div className='mt-10 flex items-center justify-around border-t border-b p-5'>
            {partner.map((item) => (
              <NextImage
                key={item}
                src={item}
                alt=''
                width='78'
                height='72'
                className='transition-all hover:opacity-50'
              />
            ))}
          </div>
        </section>
        <section className='px-10 pt-10 pb-20'>
          <Title
            title='Theo dõi chúng tôi trên Instagram'
            content='@ Rubix Instagram'
          />
          <div className='grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6'>
            {photoSamples.map((item) => (
              <NextImage
                className='h-full w-full cursor-pointer'
                key={item}
                src={item}
                alt=''
                width='500'
                height='500'
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;

Home.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};
