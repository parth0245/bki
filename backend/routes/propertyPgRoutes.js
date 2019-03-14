const express = require("express");
const multer = require("multer");
const PropertyPG = require("../models/propertyPG");
const router = express.Router();

const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg"
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log('file.mimetype10', file.mimetype);
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mime type");
        if (isValid) {
            error = null;
        }
        cb(error, "backend/images");
    },
    filename: (req, file, cb) => {
        const name = file.originalname
            .toLowerCase()
            .split(" ")
            .join("-");
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + "-" + Date.now() + "." + ext);
    }
});


router.post(
    "",
    multer({ storage: storage }).array("image", 12),
    (req, res, next) => {
        const url = req.protocol + "://" + req.get("host");
        var files = req.files;
        var imagesPath = [];
        if (files) {
            files.forEach(function (file) {
                imagesPath.push(
                    {
                        name: file.filename,
                        file: url + "/" + file.filename
                    }
                );
            })
        } else {
            console.log('no file found')
        }
        const property = new PropertyPG({
            email: req.body.email,
            mobile: req.body.mobile,
            date: req.body.date,
            propertyCaption: req.body.propertyCaption,
            parking: req.body.parking,
            propertyFor: req.body.propertyFor,
            propertyType: req.body.propertyType,
            propertyLocation: req.body.propertyLocation,
            societyName: req.body.societyName,
            address: req.body.address,
            propertyTotalFloors: req.body.propertyTotalFloors,
            propertyYourFloor: req.body.propertyYourFloor,
            propertyFurnishedStatus: req.body.propertyFurnishedStatus,
            pgAvailableFor: req.body.pgAvailableFor,
            pgOccupancy: req.body.pgOccupancy,
            pgAge: req.body.pgAge,
            pgtenants: req.body.pgtenants,
            propertyBathrooms: req.body.propertyBathrooms,
            pgBalcony: req.body.pgBalcony,
            pgCommonArea: req.body.pgCommonArea,
            propertyPrice: req.body.propertyPrice,
            propertyMainPrice: req.body.propertyMainPrice,
            propertyElectricityPrice: req.body.propertyElectricityPrice,
            laundryCharges:req.body.laundryCharges,
            securityCharges:req.body.securityCharges,
            noticePeriod:req.body.noticePeriod,
            propertyDesc :req.body.propertyDesc,
            images: imagesPath
        });
        property.save().then(createdPost => {
            res.status(201).json({
                message: "Post added successfully",
                post: {
                    ...createdPost,
                    id: createdPost._id
                }
            });
        });
    }
);


router.get("/all-pg-post", (req, res, next) => {
    PropertyPG.find().then(post => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: "No Properties found!" });
        }
    });
});

router.post("/PgByUser", (req, res, next) => {
    PropertyPG.find({email:req.body.email}).then(post => {
         if (post) {
             res.status(200).json(post);
         } else {
             res.status(404).json({ message: "No Properties found!" });
         }
     });
 });



module.exports = router;