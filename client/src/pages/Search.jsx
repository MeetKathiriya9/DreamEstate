import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Search() {

    const navigate = useNavigate();
    
    const [sidebardata, setsidebardata] = useState({
        searchTerm: "",
        type: "all",
        parking: false,
        furnished : false,
        offer : false,
        sort : "created_at",
        order: "desc"
    })

    const [listing, setListing] = useState([]);
    const [loading, setLoading] = useState(false);

    console.log("listing",  listing);

    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search)

        const UrlsearchTerm = urlParams.get("searchTerm")
        const Urltype = urlParams.get("type")
        const Urlparking = urlParams.get("parking")
        const Urlfurnished = urlParams.get("furnished")
        const Urloffer = urlParams.get("offer")
        const Urlsort = urlParams.get("sort")
        const Urlorder = urlParams.get("order")

        if(UrlsearchTerm || Urltype || Urlparking || Urlfurnished || Urloffer || Urlsort || Urlorder){
            
            setsidebardata({
                searchTerm : UrlsearchTerm || "",
                type : Urltype || "all",
                parking : Urlparking === "true" ? true : false,
                furnished : Urlfurnished === "true" ? true : false,
                offer : Urloffer === "true" ? true : false,
                sort : Urlsort || "created_at",
                order : Urlorder || "desc",
            });

        }


        const FetchListing = async () => {
            setLoading(true);

            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/listing/get?${searchQuery}`)
            const data = await res.json();

            setListing(data);
            setLoading(false);
        }

        FetchListing();

    },[location.search])

    const ChangeHandler = (event) => {
        if(event.target.id === "all" || event.target.id === "rent" || event.target.id === "sell"){
            console.log(event.target.id);
            setsidebardata({...sidebardata, type: event.target.id})
        }

        if(event.target.id === "searchTerm"){
            setsidebardata({...sidebardata, searchTerm : event.target.value})
        }

        if(event.target.id === "parking" || event.target.id === "furnished" ||  event.target.id === "offer"){
            setsidebardata({...sidebardata, [event.target.id] : event.target.checked || event.target.checked === "true" ? true : false  })
        }

        if(event.target.id === "sort_order"){
            const sort = event.target.value.split("_")[0] || "created_at";
            const order = event.target.value.split("_")[1] || "desc";

            setsidebardata({...sidebardata, sort, order});
        }
    } 

    const SubmitHandler = (event) => {
        event.preventDefault();

        const urlParams = new URLSearchParams();

        urlParams.set("searchTerm", sidebardata.searchTerm)
        urlParams.set("type", sidebardata.type)
        urlParams.set("parking", sidebardata.parking)
        urlParams.set("furnished", sidebardata.furnished)
        urlParams.set("offer", sidebardata.offer)
        urlParams.set("sort", sidebardata.sort)
        urlParams.set("order", sidebardata.order)

        const searchQuery = urlParams.toString();

        navigate(`/search?${searchQuery}`)
    }

    return (
        <div>
            <div className='flex flex-col md:flex-row'>
                <div className='bg-transparent border-b-2 sm:border-r-2 p-7 h-auto md:min-h-screen flex-2'>
                    <form className='flex flex-col gap-8'onSubmit={SubmitHandler}>
                        <div className='flex items-center gap-2'>
                            <label className='whitespace-nowrap'>Search Term:</label>
                            <input type="text" id="searchTerm" placeholder="Search..." className="border rounded-lg p-3 w-full" value={sidebardata.searchTerm} onChange={ChangeHandler}></input>
                        </div>

                        <div className='flex flex-wrap items-center gap-2'>
                            <label className="whitespace-nowrap">Type:</label>
                            <div className='flex gap-2'>
                                <input type="checkbox" id="all" className="w-5" onChange={ChangeHandler} checked={sidebardata.type === "all"}></input>
                                <span>Rent &amp; Sell</span>
                            </div>

                            <div className='flex gap-2'>
                                <input type="checkbox" id="rent" className="w-5" onChange={ChangeHandler} checked={sidebardata.type === "rent"}></input>
                                <span>Rent</span>
                            </div>

                            <div className='flex gap-2'>
                                <input type="checkbox" id="sell" className="w-5" onChange={ChangeHandler} checked={sidebardata.type === "sell"}></input>
                                <span>Sell</span>
                            </div>

                            <div className='flex gap-2'>
                                <input type="checkbox" id="offer" className="w-5" onChange={ChangeHandler} checked={sidebardata.offer}></input>
                                <span>Offer</span>
                            </div>
                        </div>

                        <div className='flex items-center gap-2'>
                            <label className="whitespace-nowrap">Amenities:</label>
                            <div className="flex gap-2">
                                <input type="checkbox" id="parking" className="w-5"  onChange={ChangeHandler} checked={sidebardata.parking}></input>
                                <span>Parking</span>
                            </div>

                            <div className="flex gap-2">
                                <input type="checkbox" id="furnished" className="w-5"  onChange={ChangeHandler} checked={sidebardata.furnished}></input>
                                <span>Furnished</span>
                            </div>
                        </div>

                        <div className='flex items-center gap-2'>
                            <label>Sort:</label>
                            <select onChange={ChangeHandler} id="sort_order" className="border rounded-lg p-3" defaultValue="createdAt_desc">
                                <option value="regularPrice_desc">Price high to low</option>
                                <option value="regularPrice_asc">Price low to high </option>
                                <option value="createdAt_desc">Latest</option>
                                <option value="createdAt_asc">Oldest</option>
                            </select>
                        </div>

                        <button className="bg-slate-700 text-white p-3 uppercase rounded-lg w-full">
                            Search
                        </button>

                    </form>
                </div>


                <div className='flex-1'>
                    <h1 className="text-3xl m-5 font-semibold border-b p-3 text-slate-700">Listing results:</h1>

                    <div className='flex flex-wrap gap-4 p-7'>
                        <div className=" bg-white flex flex-col gap-4 shadow-md hover:shadow-lg rounded-md overflow-hidden transition-shadow w-full sm:w-[330px] border">

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
                    {/* delete from here */}





                    </div>

                </div>
            </div>

        </div>
    )
}
