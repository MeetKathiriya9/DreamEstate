import Listing from "../Model/listing.model.js";
import { errorHandler } from "../Util/error.js";
// import Listingrouter from "../Router/ListingRoute.js";

export const createListing = async (req, res, next) => {
    try {

        const listing = await Listing.create(req.body);
        // console.log("list",listing);
        return res.status(201).json(listing)

    } catch (error) {
        next(error)
    }
}

export const deleteListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
        return next(errorHandler(404, "Listing not found"))
    }

    if (req.user.id !== listing.userRef) {
        return next(errorHandler(401, "You can only delete your own listing!"))
    }

    try {
        await Listing.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "Listing has been Deleted Successfully !" })
    } catch (error) {
        next(error)
    }
}

export const updateListing = async (req, res, next) => {
    try {
        const update = await Listing.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {
            new: true
        })

        if(!update){
            return next(errorHandler(401,"Listing not found..."))
        }

        res.status(200).json(update)

    } catch (error) {
        return next(errorHandler(500,"Something went wrong while updating listing..."))
    }
}

export const getEditListing = async (req,res,next) => {
    try {
       const updatedata = await Listing.findById(req.params.id) 

       if(!updatedata){
            return next(errorHandler(500,"Listing Not Found..."))
       }

       res.status(200).json(updatedata)

    } catch (error) {
        return next(errorHandler(500,"Something went wrong while updating listing..."))
    }
}


export const getListings = async (req,res,next) => {

    try {
        
        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;

        let offer = req.query.offer;

        if(offer === undefined || offer === "false"){
            offer = { $in : [false,true]}
        }

        let furnished = req.query.furnished;

        if(furnished === undefined || furnished === "false"){
            furnished = { $in : [false,true]}
        }
        
        let parking = req.query.parking;

        if(parking === undefined || parking === "false"){
            parking = { $in : [false,true]}
        }

        let type = req.query.type;

        if(type === undefined || type === "all"){
            type = { $in : ['sell','rent'] }
        }

        const searchTerm = req.query.searchTerm || "";

        const sort = req.query.sort || "createdAt";

        const order = req.query.order || "desc";

        const listings = await Listing.find({
            name : { $regex : searchTerm, $options: "i"},
            offer,
            furnished,
            parking,
            type,
        }).sort({ [sort] : order }).limit(limit).skip(startIndex);

        return res.status(200).json(listings);


    } catch (error) {
        
    }

}