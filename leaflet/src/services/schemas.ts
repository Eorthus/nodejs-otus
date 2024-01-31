import mongoose from "mongoose";

export const geoSchema = new mongoose.Schema({
  lat: String,
  lng: String,
});

export const geoDb = mongoose.model("leaflet", geoSchema);
