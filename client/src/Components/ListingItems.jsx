import React from 'react'
import { Link } from 'react-router-dom'
import { FaMapMarkerAlt} from 'react-icons/fa'

export default function ListingItems({ listing }) {
    // console.log(listing);
    return (

        // bg-white flex flex-col gap-4 shadow-md hover:shadow-lg rounded-md overflow-hidden transition-shadow w-full sm:w-[330px] border
            <div className="estate bg-white flex flex-col gap-4 shadow-md hover:shadow-lg rounded-md overflow-hidden w-full transition-shadow border">

                {/* <a className='contents' href="#"></a> */}
                <Link to={`/listing/${listing._id}`}>
                    <img className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300" src={listing.imageUrls[0]} alt="estate-img" />

                    <div className='w-full p-3 gap-2 flex flex-col'>
                        <p className='font-semibold m-0 text-lg truncate text-slate-700'>{listing.name}</p>
                        <p className='text-xs flex text-gray-600 truncate items-center'>
                        <FaMapMarkerAlt className='text-green-700 text-xs pe-1' />{listing.address}</p>
                        <p className='text-xs text-gray-600 line-clamp-2'>{listing.description}</p>
                        <p className='text-slate-500 mt-2 font-semibold'>
                            
                            $
                            {listing.offer ? listing.discountPrice : listing.regularPrice }
                            {listing.type === "rent" && " / month"}
                            </p>

                        <div className='flex items-center gap-4 text-slate-700'>
                                <div className='font-bold text-xs'>
                                    {listing.bedrooms < 1 ? `${listing.bedrooms} beds ` : `${listing.bedrooms} bed`}
                                </div>
                                <div className='font-bold text-xs'>
                                    {listing.bathrooms < 1 ? `${listing.bathrooms} baths ` : `${listing.bathrooms} bath`}
                                </div>
                            
                        </div>
                    </div>
                </Link>

            </div>
        

    )
}
