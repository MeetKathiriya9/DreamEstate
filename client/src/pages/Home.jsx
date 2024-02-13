import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore from 'swiper'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css/bundle'
import { Link } from 'react-router-dom'

export default function Home() {

  SwiperCore.use([Navigation, Autoplay])

  return (
    <div>

      <section className=' max-w-6xl mx-auto py-28 px-3 max-sm:py-16'>
        <p className='text-slate-700 text-6xl font-bold lg:text-6xl max-md:text-5xl max-sm:text-3xl'>Find your next <span className='text-slate-500'>perfect</span> <br /> place with ease </p>

        <p className="text-gray-400 mt-6 text-md max-lg:text-sm max-sm:text-xs">Sahand Estate will help you find your home fast, easy and comfortable.<br /> Our expert support are always available.</p>

        <Link to="/search"><p className="text-sm mt-6 text-blue-800 font-bold hover:underline">Let's Start now...</p>
        </Link>
      </section>

      <div>
        <Swiper navigation autoplay={{ delay: 3000, pauseOnMouseEnter: true }}>


          <SwiperSlide>
            <div className="h-[500px]"
              style={{ background: `url("https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg") center no-repeat`, backgroundSize: 'cover' }}></div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="h-[500px]"
              style={{ background: `url("https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D") center no-repeat`, backgroundSize: 'cover' }}></div>
          </SwiperSlide>


        </Swiper>
      </div>

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>

        <div>

          <div className='my-5'>
            <div className='my-3 pt-5'>
              <h3 className=' text-2xl font-semibold text-slate-600'>Recent offers</h3>
              <Link to="/"><p className='text-sm text-blue-800 hover:underline'>Show more offers</p></Link>
            </div>

            {/* ul */}
            <div className='flex flex-wrap gap-4'>

              {/* li */}
              <div className=' bg-white flex flex-col gap-4 shadow-md hover:shadow-lg rounded-md overflow-hidden transition-shadow w-fu<ll sm:w-[330px] border'>


                {/* <a className='contents' href="#"></a> */}
                <Link to="/">
                  <img className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300" src="https://images.unsplash.com/photo-1559583985-c80d8ad9b29f?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXwxMDY1OTc2fHxlbnwwfHx8fHw%3D" alt="estate-img" />

                  <div className='w-full p-3 gap-2 flex flex-col'>
                    <p className='font-semibold m-0 text-lg truncate text-slate-700'>dnscjkdscndx</p>
                    <p className='text-xs  text-gray-600 truncate'>surat</p>
                    <p className='text-xs text-gray-600 line-clamp-2'>ioACNHBIasd</p>
                    <p className='text-slate-500 mt-2 font-semibold'>$50 / month</p>

                    <div className='flex items-center gap-4 text-slate-700'>
                      <div className='flex items-center gap-1'>
                        <p className='font-bold text-xs'>1 Bed</p>
                      </div>
                      <div className='flex items-center gap-1'>
                        <p className='font-bold text-xs'>1 Bath</p>
                      </div>
                    </div>
                  </div>
                </Link>

              </div>
              {/* li */}

              {/* delete from here */}

              <div className=" bg-white flex flex-col gap-4 shadow-md hover:shadow-lg rounded-md overflow-hidden transition-shadow w-full sm:w-[330px] border">

                <a className='contents' href="#"></a>
                <img className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300" src="https://images.unsplash.com/photo-1559583985-c80d8ad9b29f?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXwxMDY1OTc2fHxlbnwwfHx8fHw%3D" alt="estate-img" />

                <div className='w-full p-3 gap-2 flex flex-col'>
                  <p className='font-semibold m-0 text-lg truncate text-slate-700'>dnscjkdscndx</p>
                  <p className='text-xs  text-gray-600 truncate'>surat</p>
                  <p className='text-xs text-gray-600 line-clamp-2'>ioACNHBIasd</p>
                  <p className='text-slate-500 mt-2 font-semibold'>$50 / month</p>

                  <div className='flex items-center gap-4 text-slate-700'>
                    <div className='flex items-center gap-1'>
                      <p className='font-bold text-xs'>1 Bed</p>
                    </div>
                    <div className='flex items-center gap-1'>
                      <p className='font-bold text-xs'>1 Bath</p>
                    </div>
                  </div>
                </div>

              </div>
              <div className=" bg-white flex flex-col gap-4 shadow-md hover:shadow-lg rounded-md overflow-hidden transition-shadow w-full sm:w-[330px] border">

                <a className='contents' href="#"></a>
                <img className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300" src="https://images.unsplash.com/photo-1559583985-c80d8ad9b29f?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXwxMDY1OTc2fHxlbnwwfHx8fHw%3D" alt="estate-img" />

                <div className='w-full p-3 gap-2 flex flex-col'>
                  <p className='font-semibold m-0 text-lg truncate text-slate-700'>dnscjkdscndx</p>
                  <p className='text-xs  text-gray-600 truncate'>surat</p>
                  <p className='text-xs text-gray-600 line-clamp-2'>ioACNHBIasd</p>
                  <p className='text-slate-500 mt-2 font-semibold'>$50 / month</p>

                  <div className='flex items-center gap-4 text-slate-700'>
                    <div className='flex items-center gap-1'>
                      <p className='font-bold text-xs'>1 Bed</p>
                    </div>
                    <div className='flex items-center gap-1'>
                      <p className='font-bold text-xs'>1 Bath</p>
                    </div>
                  </div>
                </div>

              </div>
              <div className=" bg-white flex flex-col gap-4 shadow-md hover:shadow-lg rounded-md overflow-hidden transition-shadow w-full sm:w-[330px] border">

                <a className='contents' href="#"></a>
                <img className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300" src="https://images.unsplash.com/photo-1559583985-c80d8ad9b29f?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXwxMDY1OTc2fHxlbnwwfHx8fHw%3D" alt="estate-img" />

                <div className='w-full p-3 gap-2 flex flex-col'>
                  <p className='font-semibold m-0 text-lg truncate text-slate-700'>dnscjkdscndx</p>
                  <p className='text-xs  text-gray-600 truncate'>surat</p>
                  <p className='text-xs text-gray-600 line-clamp-2'>ioACNHBIasd</p>
                  <p className='text-slate-500 mt-2 font-semibold'>$50 / month</p>

                  <div className='flex items-center gap-4 text-slate-700'>
                    <div className='flex items-center gap-1'>
                      <p className='font-bold text-xs'>1 Bed</p>
                    </div>
                    <div className='flex items-center gap-1'>
                      <p className='font-bold text-xs'>1 Bath</p>
                    </div>
                  </div>
                </div>

              </div>


            </div>
            {/* ul */}

          </div>

          <div className='my-5'>
            <div className='my-3 pt-5'>
              <h3 className=' text-2xl font-semibold text-slate-600'>Recent places for rent</h3>
              <Link to="/"><p className='text-sm text-blue-800 hover:underline'>Show more places for rent</p></Link>
            </div>

            {/* ul */}
            <div className='flex flex-wrap gap-4'>

              {/* li */}
              <div className=' bg-white flex flex-col gap-4 shadow-md hover:shadow-lg rounded-md overflow-hidden transition-shadow w-fu<ll sm:w-[330px] border'>


                {/* <a className='contents' href="#"></a> */}
                <Link to="/">
                  <img className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300" src="https://images.unsplash.com/photo-1559583985-c80d8ad9b29f?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXwxMDY1OTc2fHxlbnwwfHx8fHw%3D" alt="estate-img" />

                  <div className='w-full p-3 gap-2 flex flex-col'>
                    <p className='font-semibold m-0 text-lg truncate text-slate-700'>dnscjkdscndx</p>
                    <p className='text-xs  text-gray-600 truncate'>surat</p>
                    <p className='text-xs text-gray-600 line-clamp-2'>ioACNHBIasd</p>
                    <p className='text-slate-500 mt-2 font-semibold'>$50 / month</p>

                    <div className='flex items-center gap-4 text-slate-700'>
                      <div className='flex items-center gap-1'>
                        <p className='font-bold text-xs'>1 Bed</p>
                      </div>
                      <div className='flex items-center gap-1'>
                        <p className='font-bold text-xs'>1 Bath</p>
                      </div>
                    </div>
                  </div>
                </Link>

              </div>
              {/* li */}

              {/* delete from here */}

              <div className=" bg-white flex flex-col gap-4 shadow-md hover:shadow-lg rounded-md overflow-hidden transition-shadow w-full sm:w-[330px] border">

                <a className='contents' href="#"></a>
                <img className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300" src="https://images.unsplash.com/photo-1559583985-c80d8ad9b29f?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXwxMDY1OTc2fHxlbnwwfHx8fHw%3D" alt="estate-img" />

                <div className='w-full p-3 gap-2 flex flex-col'>
                  <p className='font-semibold m-0 text-lg truncate text-slate-700'>dnscjkdscndx</p>
                  <p className='text-xs  text-gray-600 truncate'>surat</p>
                  <p className='text-xs text-gray-600 line-clamp-2'>ioACNHBIasd</p>
                  <p className='text-slate-500 mt-2 font-semibold'>$50 / month</p>

                  <div className='flex items-center gap-4 text-slate-700'>
                    <div className='flex items-center gap-1'>
                      <p className='font-bold text-xs'>1 Bed</p>
                    </div>
                    <div className='flex items-center gap-1'>
                      <p className='font-bold text-xs'>1 Bath</p>
                    </div>
                  </div>
                </div>

              </div>
              <div className=" bg-white flex flex-col gap-4 shadow-md hover:shadow-lg rounded-md overflow-hidden transition-shadow w-full sm:w-[330px] border">

                <a className='contents' href="#"></a>
                <img className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300" src="https://images.unsplash.com/photo-1559583985-c80d8ad9b29f?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXwxMDY1OTc2fHxlbnwwfHx8fHw%3D" alt="estate-img" />

                <div className='w-full p-3 gap-2 flex flex-col'>
                  <p className='font-semibold m-0 text-lg truncate text-slate-700'>dnscjkdscndx</p>
                  <p className='text-xs  text-gray-600 truncate'>surat</p>
                  <p className='text-xs text-gray-600 line-clamp-2'>ioACNHBIasd</p>
                  <p className='text-slate-500 mt-2 font-semibold'>$50 / month</p>

                  <div className='flex items-center gap-4 text-slate-700'>
                    <div className='flex items-center gap-1'>
                      <p className='font-bold text-xs'>1 Bed</p>
                    </div>
                    <div className='flex items-center gap-1'>
                      <p className='font-bold text-xs'>1 Bath</p>
                    </div>
                  </div>
                </div>

              </div>
              <div className=" bg-white flex flex-col gap-4 shadow-md hover:shadow-lg rounded-md overflow-hidden transition-shadow w-full sm:w-[330px] border">

                <a className='contents' href="#"></a>
                <img className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300" src="https://images.unsplash.com/photo-1559583985-c80d8ad9b29f?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXwxMDY1OTc2fHxlbnwwfHx8fHw%3D" alt="estate-img" />

                <div className='w-full p-3 gap-2 flex flex-col'>
                  <p className='font-semibold m-0 text-lg truncate text-slate-700'>dnscjkdscndx</p>
                  <p className='text-xs  text-gray-600 truncate'>surat</p>
                  <p className='text-xs text-gray-600 line-clamp-2'>ioACNHBIasd</p>
                  <p className='text-slate-500 mt-2 font-semibold'>$50 / month</p>

                  <div className='flex items-center gap-4 text-slate-700'>
                    <div className='flex items-center gap-1'>
                      <p className='font-bold text-xs'>1 Bed</p>
                    </div>
                    <div className='flex items-center gap-1'>
                      <p className='font-bold text-xs'>1 Bath</p>
                    </div>
                  </div>
                </div>

              </div>


            </div>
            {/* ul */}

          </div>

          <div className='my-5'>
            <div className='my-3 pt-5'>
              <h3 className=' text-2xl font-semibold text-slate-600'>Recent places for sale</h3>
              <Link to="/"><p className='text-sm text-blue-800 hover:underline'>Show more places for sale</p></Link>
            </div>

            {/* ul */}
            <div className='flex flex-wrap gap-4'>

              {/* li */}
              <div className=' bg-white flex flex-col gap-4 shadow-md hover:shadow-lg rounded-md overflow-hidden transition-shadow w-fu<ll sm:w-[330px] border'>


                {/* <a className='contents' href="#"></a> */}
                <Link to="/">
                  <img className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300" src="https://images.unsplash.com/photo-1559583985-c80d8ad9b29f?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXwxMDY1OTc2fHxlbnwwfHx8fHw%3D" alt="estate-img" />

                  <div className='w-full p-3 gap-2 flex flex-col'>
                    <p className='font-semibold m-0 text-lg truncate text-slate-700'>dnscjkdscndx</p>
                    <p className='text-xs  text-gray-600 truncate'>surat</p>
                    <p className='text-xs text-gray-600 line-clamp-2'>ioACNHBIasd</p>
                    <p className='text-slate-500 mt-2 font-semibold'>$50 / month</p>

                    <div className='flex items-center gap-4 text-slate-700'>
                      <div className='flex items-center gap-1'>
                        <p className='font-bold text-xs'>1 Bed</p>
                      </div>
                      <div className='flex items-center gap-1'>
                        <p className='font-bold text-xs'>1 Bath</p>
                      </div>
                    </div>
                  </div>
                </Link>

              </div>
              {/* li */}

              {/* delete from here */}

              <div className=" bg-white flex flex-col gap-4 shadow-md hover:shadow-lg rounded-md overflow-hidden transition-shadow w-full sm:w-[330px] border">

                <a className='contents' href="#"></a>
                <img className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300" src="https://images.unsplash.com/photo-1559583985-c80d8ad9b29f?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXwxMDY1OTc2fHxlbnwwfHx8fHw%3D" alt="estate-img" />

                <div className='w-full p-3 gap-2 flex flex-col'>
                  <p className='font-semibold m-0 text-lg truncate text-slate-700'>dnscjkdscndx</p>
                  <p className='text-xs  text-gray-600 truncate'>surat</p>
                  <p className='text-xs text-gray-600 line-clamp-2'>ioACNHBIasd</p>
                  <p className='text-slate-500 mt-2 font-semibold'>$50 / month</p>

                  <div className='flex items-center gap-4 text-slate-700'>
                    <div className='flex items-center gap-1'>
                      <p className='font-bold text-xs'>1 Bed</p>
                    </div>
                    <div className='flex items-center gap-1'>
                      <p className='font-bold text-xs'>1 Bath</p>
                    </div>
                  </div>
                </div>

              </div>
              <div className=" bg-white flex flex-col gap-4 shadow-md hover:shadow-lg rounded-md overflow-hidden transition-shadow w-full sm:w-[330px] border">

                <a className='contents' href="#"></a>
                <img className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300" src="https://images.unsplash.com/photo-1559583985-c80d8ad9b29f?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXwxMDY1OTc2fHxlbnwwfHx8fHw%3D" alt="estate-img" />

                <div className='w-full p-3 gap-2 flex flex-col'>
                  <p className='font-semibold m-0 text-lg truncate text-slate-700'>dnscjkdscndx</p>
                  <p className='text-xs  text-gray-600 truncate'>surat</p>
                  <p className='text-xs text-gray-600 line-clamp-2'>ioACNHBIasd</p>
                  <p className='text-slate-500 mt-2 font-semibold'>$50 / month</p>

                  <div className='flex items-center gap-4 text-slate-700'>
                    <div className='flex items-center gap-1'>
                      <p className='font-bold text-xs'>1 Bed</p>
                    </div>
                    <div className='flex items-center gap-1'>
                      <p className='font-bold text-xs'>1 Bath</p>
                    </div>
                  </div>
                </div>

              </div>
              <div className=" bg-white flex flex-col gap-4 shadow-md hover:shadow-lg rounded-md overflow-hidden transition-shadow w-full sm:w-[330px] border">

                <a className='contents' href="#"></a>
                <img className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300" src="https://images.unsplash.com/photo-1559583985-c80d8ad9b29f?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXwxMDY1OTc2fHxlbnwwfHx8fHw%3D" alt="estate-img" />

                <div className='w-full p-3 gap-2 flex flex-col'>
                  <p className='font-semibold m-0 text-lg truncate text-slate-700'>dnscjkdscndx</p>
                  <p className='text-xs  text-gray-600 truncate'>surat</p>
                  <p className='text-xs text-gray-600 line-clamp-2'>ioACNHBIasd</p>
                  <p className='text-slate-500 mt-2 font-semibold'>$50 / month</p>

                  <div className='flex items-center gap-4 text-slate-700'>
                    <div className='flex items-center gap-1'>
                      <p className='font-bold text-xs'>1 Bed</p>
                    </div>
                    <div className='flex items-center gap-1'>
                      <p className='font-bold text-xs'>1 Bath</p>
                    </div>
                  </div>
                </div>

              </div>


            </div>
            {/* ul */}

          </div>
        </div>

      </div>

    </div>
  )
}
