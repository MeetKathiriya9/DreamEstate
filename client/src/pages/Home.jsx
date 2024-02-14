import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore from 'swiper'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css/bundle'
import { Link } from 'react-router-dom'
import ListingItems from '../Components/ListingItems'

export default function Home() {

  SwiperCore.use([Navigation, Autoplay])

  const [offerListings, setOfferListings] = useState([]);
  const [sellListings, setSellListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);

  useEffect(() => {

    const fetchOfferListings = async () => {
      try {

        const res = await fetch(`/api/listing/get?type=all&offer=true&limit=4`);
        const data = await res.json();

        setOfferListings(data)
        fetchRentListings();

      } catch (error) {
        console.log(error);
      }
    }

    const fetchRentListings = async () => {
      try {

        const res = await fetch(`/api/listing/get?type=rent&limit=4`);
        const data = await res.json();

        setRentListings(data)
        fetchSellListings();

      } catch (error) {
        console.log(error);
      }
    }

    const fetchSellListings = async () => {
      try {

        const res = await fetch(`/api/listing/get?type=sell&limit=4`);
        const data = await res.json();

        setSellListings(data)

      } catch (error) {
        console.log(error);
      }
    }

    fetchOfferListings();
  })

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


          {
            offerListings && offerListings.length > 0 && offerListings.map((listing) => (
              <SwiperSlide>

                <div className="h-[500px]"
                  style={{ background: `url(${listing.imageUrls[0]}) center no-repeat`, backgroundSize: 'cover' }}>
                </div>

              </SwiperSlide>
            ))
          }


        </Swiper>
      </div>

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>

        {offerListings && offerListings.length > 0 && (

          <div className='my-5'>
            <div className='my-3 pt-5'>
              <h3 className='text-2xl font-semibold text-slate-600'>Recent offers</h3>

              <Link to={"search?offer=true"} className='text-sm text-blue-800 hover:underline'>
                Show more offers
              </Link>

            </div>

            <div className='flex flex-wrap gap-4'>
              {offerListings.map((listing) => (
                <ListingItems listing={listing} key={listing._id}></ListingItems>
              ))}
            </div>
          </div>

        )}

        {rentListings && rentListings.length > 0 && (

          <div className='my-5'>
            <div className='my-3 pt-5'>
              <h3 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h3>

              <Link to={"search?type=rent"} className='text-sm text-blue-800 hover:underline'>
                Show more offers
              </Link>

            </div>

            <div className='flex flex-wrap gap-4'>
              {rentListings.map((listing) => (
                <ListingItems listing={listing} key={listing._id}></ListingItems>
              ))}
            </div>
          </div>

        )}

        {sellListings && sellListings.length > 0 && (

          <div className='my-5'>
            <div className='my-3 pt-5'>
              <h3 className='text-2xl font-semibold text-slate-600'>Recent places for sell</h3>

              <Link to={"search?type=sell"} className='text-sm text-blue-800 hover:underline'>
                Show more offers
              </Link>

            </div>

            <div className='flex flex-wrap gap-4'>
              {sellListings.map((listing) => (
                <ListingItems listing={listing} key={listing._id}></ListingItems>
              ))}
            </div>
          </div>

        )}

      
          </div>
        </div>
  )
}
