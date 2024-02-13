import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ListingItems from '../Components/ListingItems';

export default function Search() {

    const navigate = useNavigate();

    const [sidebardata, setsidebardata] = useState({
        searchTerm: "",
        type: "all",
        parking: false,
        furnished: false,
        offer: false,
        sort: "created_at",
        order: "desc"
    })

    const [listing, setListing] = useState([]);
    const [loading, setLoading] = useState(false);

    console.log("listing", listing);

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)

        const UrlsearchTerm = urlParams.get("searchTerm")
        const Urltype = urlParams.get("type")
        const Urlparking = urlParams.get("parking")
        const Urlfurnished = urlParams.get("furnished")
        const Urloffer = urlParams.get("offer")
        const Urlsort = urlParams.get("sort")
        const Urlorder = urlParams.get("order")

        if (UrlsearchTerm || Urltype || Urlparking || Urlfurnished || Urloffer || Urlsort || Urlorder) {

            setsidebardata({
                searchTerm: UrlsearchTerm || "",
                type: Urltype || "all",
                parking: Urlparking === "true" ? true : false,
                furnished: Urlfurnished === "true" ? true : false,
                offer: Urloffer === "true" ? true : false,
                sort: Urlsort || "created_at",
                order: Urlorder || "desc",
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

    }, [location.search])

    const ChangeHandler = (event) => {
        if (event.target.id === "all" || event.target.id === "rent" || event.target.id === "sell") {
            console.log(event.target.id);
            setsidebardata({ ...sidebardata, type: event.target.id })
        }

        if (event.target.id === "searchTerm") {
            setsidebardata({ ...sidebardata, searchTerm: event.target.value })
        }

        if (event.target.id === "parking" || event.target.id === "furnished" || event.target.id === "offer") {
            setsidebardata({ ...sidebardata, [event.target.id]: event.target.checked || event.target.checked === "true" ? true : false })
        }

        if (event.target.id === "sort_order") {
            const sort = event.target.value.split("_")[0] || "created_at";
            const order = event.target.value.split("_")[1] || "desc";

            setsidebardata({ ...sidebardata, sort, order });
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
                    <form className='flex flex-col gap-8' onSubmit={SubmitHandler}>
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
                                <input type="checkbox" id="parking" className="w-5" onChange={ChangeHandler} checked={sidebardata.parking}></input>
                                <span>Parking</span>
                            </div>

                            <div className="flex gap-2">
                                <input type="checkbox" id="furnished" className="w-5" onChange={ChangeHandler} checked={sidebardata.furnished}></input>
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

                    <div className='p-7 flex gap-4'>
                        {!loading && listing.length === 0 && (
                            <p className='text-xl text-slate-700'>No Listing Found !</p>
                        )}
                        {
                            loading && (
                                <p className='text-xl text-slate-700 text-center w-full'>Loading...</p>
                            )
                        }
                        <div className='grid grid-flow-row grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5'>
                            {!loading && listing && listing.map((listing) => <ListingItems key={listing._id} listing={listing}></ListingItems>)}
                        </div>
                    </div>
                </div>

            </div>


        </div>


    )
}
