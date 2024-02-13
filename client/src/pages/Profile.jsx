import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useEffect } from 'react';
import { app } from '../firebase'
import { useState } from 'react';
import { updateInFailure, updateInStart, updateInSuccess, userOutFailure, userOutStart, userOutSuccess } from '../Redux/User/UserSlice';
import { Link } from 'react-router-dom'

export default function Profile() {

  const fileRef = useRef(null);
  const { currentUser } = useSelector(state => state.user)
  // console.log(currentUser);

  const [file, setFile] = useState(undefined)

  const [Isfileuploaderr, setIsfileUploadErr] = useState(false)

  const [fileperc, setFileperc] = useState(0);
  // console.log(fileperc);

  const [formdata, setFormData] = useState({})
  // console.log(formdata);


  //update user data
  const dispatch = useDispatch();
  const [updateSuccess, setUpdateSuccess] = useState();

  //getUserListing
  const [showListingError, setShowListingError] = useState(false)
  const [UserListings, setUserListings] = useState([])


  useEffect(() => {
    if (file) {
      HandleFileupload(file);
    }
  }, [file])

  const HandleFileupload = (file) => {
    const storage = getStorage(app)
    // console.log(file.name);

    const filename = new Date().getTime() + file.name;
    // console.log(filename);

    const storageref = ref(storage, filename)
    // console.log(storageref);

    const uploadTask = uploadBytesResumable(storageref, file);
    // console.log(uploadTask);

    uploadTask.on('state_changed', (snapshot) => {

      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      // console.log('Upload is ' + progress + '% done');
      setFileperc(Math.round(progress))

    },
      (error) => {
        setIsfileUploadErr(true)
        console.log(error);
      },
      () => {

        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formdata, avatar: downloadURL })
        });
      })

  }


  //update user data
  const changeHandler = (e) => {
    setFormData({
      ...formdata,
      [e.target.id]: e.target.value,
    }, () => {
      console.log(e.target.value, "value");
    })
  }

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    dispatch(updateInStart())

    try {
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formdata)
      })

      // console.log(formdata);

      const data = await res.json()
      console.log("data", data);

      if (data.success === false) {
        dispatch(updateInFailure(data.message))
        return;
      }

      dispatch(updateInSuccess(data))
      setUpdateSuccess(true)
    }
    catch (error) {
      dispatch(updateInFailure(error.message))
    }
  }

  const usersignoutHandler = async (event) => {
    event.preventDefault();

    try {
      dispatch(userOutStart())

      const res = await fetch(`/api/user/signout/${currentUser._id}`, {
        method: "DELETE"
      })

      const data = await res.json()
      console.log(data);
      if (data.success === false) {
        dispatch(userOutFailure(data.message))
      }
      dispatch(userOutSuccess())

    } catch (error) {
      dispatch(userOutFailure(error.message))
    }
  }

  const userdeleteHandler = async (event) => {
    event.preventDefault();

    try {
      dispatch(userOutStart())

      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE"
      })

      const data = await res.json()
      console.log(data);

      if (data.success === false) {
        dispatch(userOutFailure(data.message))
      }
      dispatch(userOutSuccess())

    } catch (error) {
      dispatch(userOutFailure(error.message))
    }
  }

  const showListingHandler = async () => {
    try {

      setShowListingError(false)

      const res = await fetch(`api/user/listing/${currentUser._id}`)
      const data = await res.json()

      setUserListings(data)

    } catch (error) {
      console.log(error);
      setShowListingError(error)
    }
  }

  const deleteListingHandler = async (listingID) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingID}`, {
        method: "Delete"
      })

      const data = await res.json();

      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) => prev.filter((listing) => listing._id !== listingID))
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>

      <form className='flex flex-col gap-4' onSubmit={formSubmitHandler}>
        <input onChange={(e) => setFile(e.target.files[0])} type='file' ref={fileRef} hidden accept='image/*'></input>

        <img onClick={() => fileRef.current.click()} src={formdata.avatar || currentUser.avatar}
          className='rounded-full h-32 w-32 object-cover cursor-pointer self-center mt-2' alt="Profile"></img>

        <p className='text-sm text-center'>
          {
            Isfileuploaderr ? (
              <span className=' text-red-600'>image upload error(choosen image must less than 2 mb)</span>
            ) : (
              fileperc > 0 && fileperc < 100 ? (
                <span className=' text-green-500'>{fileperc}% uploaded</span>
              ) : (
                fileperc === 100 ? (
                  <span className=' text-green-500'>Image Uploaded Successfully</span>
                ) : ""
              )
            )
          }
        </p>

        <input type='text' placeholder='Username' className='border p-3 mt-5 rounded-lg' defaultValue={currentUser.username} onChange={changeHandler} id='username'></input>

        <input type='text' placeholder='Email' className='border p-3 rounded-lg' defaultValue={currentUser.email} onChange={changeHandler} id='email'></input>

        <input type='text' placeholder='Password' className='border p-3 rounded-lg' defaultValue={currentUser.password} onChange={changeHandler} id='password'></input>
        <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>Update</button>
      </form>

      <button className=' bg-sky-600 mt-2 w-full  text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'><Link to="/createlisting">Create Listing</Link></button>


      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer' onClick={userdeleteHandler}>Delete Account</span>
        <span className='text-red-700 cursor-pointer' onClick={usersignoutHandler}>Sign Out</span>
      </div>

      {/* <p className='text-red-700 mt-5 text-center font-semibold'>{error ? error : ""}</p> */}
      <p className='text-green-700 mt-5 text-center font-semibold'>{updateSuccess ? "Your Profile Updated Successfully....!" : ""}</p>


      {/* Write in Render Method */}

      <button onClick={showListingHandler} className='text-green-700 w-full'>Show Listing</button>

      <p>{showListingError ? "Error showing listings" : ""}</p>
      {
        UserListings.length > 0 ? (
          <div className='flex flex-col gap-4'>
            <h1 className='text-2xl text-center mt-7 font-semibold'>Your Listing</h1>
            {
              UserListings.map((listing) => (
                <div key={listing._id} className='border rounded-lg p-3 flex justifybetween items-center gap-4'>
                  <Link to={`/listing/${listing._id}`}>
                    <img src={listing.imageUrls[0]} alt='listing cover' className='h-16 w-16 object-contain' />
                  </Link>
                  <Link className='flex-1 text-slate-700 font-semibold hover:underline truncate' to={`/listing/${listing._id}`}>
                    <p className=''>{listing.name}</p>
                  </Link>
                  <div className='flex flex-col items-center'>
                    <button onClick={() => deleteListingHandler(listing._id)} className='text-red-700 uppercase'>Delete</button>
                    <Link to={`/updatelisting/${listing._id}`}>
                      <button className='text-green-700 uppercase'>Edit</button>
                    </Link>
                  </div>
                </div>
              ))
            }
          </div>
        ) : ""
      }

    </div>
  )
}