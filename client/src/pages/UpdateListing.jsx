import React from 'react'
import { useState } from 'react';
import { useRef } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase.js'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';


export default function CreateListing() {

    const { id } = useParams();
    const [files, setFiles] = useState([])

    //File counter
    const fileRef = useRef(null);
    const [fileCounter, setFileCounter] = useState(0)

    const filecounterHandler = (event) => {

        const selected = event.target.files;
        setFiles(selected)
        setFileCounter(selected.length)
    }


    //File uploads & Data fetch
    const [formData, setFormData] = useState({
        imageUrls: [],
        name: "",
        description: "",
        address: "",
        type: 'rent',
        bedrooms: 1,
        bathrooms: 1,
        regularPrice: 50,
        discountPrice: 0,
        offer: false,
        parking: false,
        furnished: false
    })
    const [uploading, setUploading] = useState(false);
    const [imageUploadError, setImageUplaodError] = useState(false);

    //createlisting
    const navigate = useNavigate();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false)
    const { currentUser } = useSelector(state => state.user)

    useEffect(() => {

        const fetchdata = async () => {
            try {
                const res = await fetch(`/api/listing/get/${id}`)

                const data = await res.json();

                if (data.success === false) {
                    console.log(data.message);
                }

                setFormData({
                    ...formData,
                    imageUrls: data.imageUrls,
                    name: data.name,
                    description: data.description,
                    address: data.address,
                    type: data.type,
                    parking: data.parking,
                    furnished: data.furnished,
                    offer: data.offer,
                    bedrooms: data.bedrooms,
                    bathrooms: data.bathrooms,
                    regularPrice: data.regularPrice,
                    discountPrice: data.discountPrice
                })

            } catch (error) {
                console.log(error.message);
            }
        }

        fetchdata();

    }, [id])

    const imagesubmitHandler = (event) => {
        event.preventDefault();

        if (files.length > 0 && files.length + formData.imageUrls.length < 7) {

            setUploading(true)

            const promises = [];

            for (let i = 0; i < files.length; i++) {
                promises.push(storeImage(files[i]))
            }

            Promise.all(promises).then((urls) => {

                // console.log("urls:- ,", urls);
                setFormData({ ...formData, imageUrls: formData.imageUrls.concat(urls) })
                setImageUplaodError(true)
                setUploading(false)

            }).catch((err) => {

                console.log(err);
                setImageUplaodError("Image Upload Falied (2 MB max per Image)")
                setUploading(false)

            })
            console.log(formData);
        }
        else {
            setImageUplaodError("You can only upload 6 Images per listing")
            setUploading(false)
        }
    }


    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {

            const storage = getStorage(app);
            const filename = new Date().getTime() + file.name;
            const storageRef = ref(storage, filename);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on("state_changed", (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload is ${progress}% done`);
            },
                (error) => {
                    reject(error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL)
                    })
                })
        })
    }

    const ChangeHandler = (event) => {

        if (event.target.id === "rent" || event.target.id === "sell") {
            setFormData({ ...formData, type: event.target.id })
        }
        if (event.target.id === "parking" || event.target.id === "furnished" || event.target.id === "offer") {
            setFormData({ ...formData, [event.target.id]: event.target.checked })
        }
        if (event.target.type === 'number' || event.target.type === 'text' || event.target.type === 'textarea') {
            setFormData({ ...formData, [event.target.id]: event.target.value })
        }

        // console.log("data",formData);
    }

    const imageRemoveHandler = (index) => {
        setFormData({
            ...formData,
            imageUrls: formData.imageUrls.filter((_, i) => i !== index)
        })
    }

    const formSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            if (formData.imageUrls.length < 1) {
                return setError('You must upload at least one image');
            }
            if (+formData.regularPrice < +formData.discountPrice) {
                return setError('Discount price must be lower than regular price')
            }

            setLoading(true)
            setError(false)

            const res = await fetch(`/api/listing/update/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...formData,
                    userRef: currentUser._id
                })
            })

            const data = await res.json();
            console.log("Data", data);
            setLoading(false)

            if (data.success === false) {
                setError(data.message)
            }
            console.log("idddddddddddddddd",data._id);

            navigate(`/listing/${data._id}`)

        } catch (error) {
            setError(error.message)
            setLoading(false)
        }
    }

    return (
        <div className="p-3 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-center my-7">Edit a Listing</h1>

            <form className="flex flex-col sm:flex-row gap-4" onSubmit={formSubmitHandler}>
                <div className="flex flex-col gap-4 flex-1">

                    <input type="text" placeholder="Name" className="border p-3 rounded-lg"
                        id="name"  required onChange={ChangeHandler} value={formData.name}></input>

                    <textarea type="text" placeholder="Description" className="border p-3 rounded-lg" id="description" required onChange={ChangeHandler} value={formData.description} ></textarea>

                    <input type="text" placeholder="Address" className="border p-3 rounded-lg"
                        id="address" required onChange={ChangeHandler} value={formData.address}></input>

                    <div className="flex gap-6 flex-wrap">
                        <div className="flex gap-2">
                            <input type="checkbox" id="sell" className="w-5" onChange={ChangeHandler} checked={formData.type === "sell"} ></input>
                            <span>Sell</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="rent" className="w-5" onChange={ChangeHandler} checked={formData.type === "rent"}></input>
                            <span>Rent</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="parking" className="w-5" onChange={ChangeHandler} checked={formData.parking}></input>
                            <span>Parking spot</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="furnished" className="w-5" onChange={ChangeHandler} checked={formData.furnished}></input>
                            <span>Furnished</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="offer" className="w-5" onChange={ChangeHandler} checked={formData.offer}></input>
                            <span>Offer</span>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-6">
                        <div className="flex items-center gap-2">
                            <input type="number" id="bedrooms" min="1" max="10" className="p-3 border border-gray-300 rounded-lg"
                                onChange={ChangeHandler} value={formData.bedrooms} required></input>
                            <p>Beds</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="number" id="bathrooms" min="1" max="10" className="p-3 border border-gray-300 rounded-lg" onChange={ChangeHandler} value={formData.bathrooms} required></input>
                            <p>Baths</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="number" id="regularPrice" min="40" max="10000000" className="p-3 border border-gray-300 rounded-lg" onChange={ChangeHandler} value={formData.regularPrice} required></input>
                            <div className="flex flex-col items-center">
                                <p>Regular price</p>

                                {formData.type === "rent" ? (<span className="text-xs">($ / Month)</span>) : ""}

                            </div>
                        </div>

                        {formData.offer === true ? (<div className="flex items-center gap-2">
                            <input type="number" id="discountPrice" min="1" max="10000000" className="p-3 border border-gray-300 rounded-lg" onChange={ChangeHandler} value={formData.discountPrice} required></input>
                            <div className="flex flex-col items-center">
                                <p>Discounted price</p>
                                <span className="text-xs">($ / Month)</span>
                            </div>
                        </div>) : ""}

                    </div>
                </div>
                <div className="flex flex-col flex-1 gap-4">
                    <p className="font-semibold">Images:<span className="font-normal text-gray-600 ml-2">The first image will be the cover (max 6)</span></p>
                    <div className="flex gap-4">
                        <input type="file" id="images" className="p-3 border border-gray-300 rounded w-full" accept="image/*" onChange={filecounterHandler} ref={fileRef} multiple hidden></input>

                        <div onClick={() => fileRef.current.click()} className='border rounded items-center p-3 text-base w-full border-gray-500'><i className="ri-folder-3-line pe-2"></i>{fileCounter} image(s) uploaded</div>

                        <button className="p-3 text-sky-700 rounded border border-sky-700 hover:bg-sky-700 hover:text-white hover:duration-700 hover:shadow-lg" onClick={imagesubmitHandler}>{uploading === true ? "UPLOADING..." : "UPLOAD"}</button>
                    </div>

                    <p className="text-red-700 font-semibold">{imageUploadError &&
                        imageUploadError}</p>

                    <div className=' max-h-80 overflow-auto'>
                        {
                            formData.imageUrls.length > 0 &&
                            formData.imageUrls.map((url, index) => (

                                <div key={url} className='flex justify-between p-3 border items-center' >
                                    <img src={url} alt='listing image' className='w-20 h-20 object-contain rounded-lg' />
                                    <button type='button' className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75' onClick={() => imageRemoveHandler(index)}>Delete</button>
                                </div>

                            ))
                        }

                    </div>
                    <button disabled={loading || uploading} className="p-3 bg-sky-600 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">{loading ?
                        "Editing....." : "Edit Listing"}</button>
                    <p className="text-red-700 text-sm font-semibold text-center">{error}</p>

                    {/* <button className="p-3  bg-sky-600  text-white rounded-lg uppercase hover:opacity-95">Create Listing</button> */}
                </div>
            </form>
        </div>
    )
}
