const mongoose = require("mongoose");
const imageSchema = mongoose.Schema({
    name: { type: String },
    file: { type: String }
});
const propertyPGSchema = mongoose.Schema({
    email: { type: String },
    mobile: { type: String },
    date: { type: String },
    propertyCaption: { type: String },
    parking: { type: String },
    propertyFor: { type: String },
    propertyType: { type: String },
    propertyLocation: { type: String },
    societyName: { type: String },
    address: { type: String },
    propertyTotalFloors: { type: String },
    propertyYourFloor: { type: String },
    propertyFurnishedStatus: {type : Array},
    pgAvailableFor: { type: String },
    pgOccupancy: { type: String },
    pgAge: { type: String },
    pgtenants: { type: String },
    propertyBathrooms: { type: String },
    pgBalcony: { type: String },
    pgCommonArea: { type: String },
    propertyPrice: { type: String },
    propertyMainPrice: { type: String },
    propertyElectricityPrice: { type: String },
    laundryCharges: { type: String },
    securityCharges: { type: String },
    noticePeriod: { type: String },
    propertyDesc :{ type: String },
    images: [imageSchema]
});

module.exports = mongoose.model("PropertyPG", propertyPGSchema);