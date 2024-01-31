import { geoDb, geoSchema } from "./schemas";

export const addPointAction = async (item: typeof geoSchema) => {
  const list = await geoDb.find();

  //check if root already exists
  //@ts-ignore
  if (+list[0]?.lat === item?.lat && +list[0]?.lng === item?.lng) {
    return;
  }
  const data = await geoDb.create(item);

  return data;
};

export const deletePointsAction = async () => {
  const data = await geoDb.deleteMany({});

  return data;
};

export const getPolylineAction = async () => {
  const data = await geoDb.find();

  //send leaflet array
  const polyline = data.map((el) => {
    return {
      lat: el.lat,
      lng: el.lng,
    };
  });

  return polyline;
};
