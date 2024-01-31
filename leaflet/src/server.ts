import mongoose from "mongoose";
import {
  addPointAction,
  deletePointsAction,
  getPolylineAction,
} from "./services/actions";

import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", async (ws) => {
  await mongoose.connect("mongodb://localhost:27017/leaflet");

  const rootPolyline = await getPolylineAction();

  ws.send(JSON.stringify(rootPolyline));

  ws.on("error", console.error);

  ws.on("message", async (data: string) => {
    const parsedData = JSON.parse(data);

    if (parsedData?.point) {
      console.log("received:", parsedData.point);
      await addPointAction(parsedData.point);

      //send array of coords every new point
      const polyline = await getPolylineAction();

      ws.send(JSON.stringify(polyline));
    }

    if (parsedData?.clear) {
      //reset route
      console.log(parsedData?.clear);
      await deletePointsAction();
    }
  });
});
