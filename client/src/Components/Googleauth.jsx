import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../Redux/User/UserSlice';
import { useNavigate } from 'react-router-dom';

export default function Googleauth() {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const GoogleHandler = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const resultdata = await signInWithPopup(auth, provider)
            console.log(resultdata,"result data");

            const res =await fetch("/api/auth/google",{
                method: "POST",
                headers:{ 
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    name : resultdata.user.displayName,
                    email : resultdata.user.email,
                    photo : resultdata.user.photoURL
                })
                
            })
                
            

            console.log("Response status:", res.status);
        // const text = await res.text();
        // console.log("Response text:", text);

        // const data = JSON.parse(text); // Parsing JSON response
        // console.log("Parsed data:", data);

            const data = await res.json();
            console.log(data);
            dispatch(signInSuccess(data));
            navigate('/');

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <button type='button' className=' mt-4 bg-red-700 hover:bg-red-600 p-3 rounded-lg text-white w-full' onClick={GoogleHandler}>CONTINUE WITH GOOGLE</button>
        </>
    )
}
