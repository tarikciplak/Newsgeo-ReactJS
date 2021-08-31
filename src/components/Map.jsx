import React, { useState, useEffect, useMemo, useRef } from "react";
import styled from "styled-components";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  LayerGroup,
  ZoomControl
} from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "leaflet";
import MapState from "./MapState";
import { fetchNews } from "../actions/newsActions";

const MainDiv = styled.main`
  grid-area: map;
  border-radius: 20px;
  padding: 0.25rem;
  overflow: hidden;
`;

const customIcon = new Icon({
  iconUrl: "logo.png",
  iconSize: [40, 50],
});
const circle = { color: "#1a73e8", fillColor: "aqua" };

const Map = () => {
  const zoomRef = useRef()
  const center = [38.274561, 27.245505];
  const zoom = 8;
  const dispatch = useDispatch();
  const [position, setPosition] = useState(center);
  const news = useSelector((state) => state.news.news);
  const [map, setMap] = useState(null);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);
 
  const displayMap = useMemo(
    () => (
      <MapContainer
        style={{ height: "90vh", width: "100wh" }}
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        whenCreated={setMap}
      >
       
        <LayerGroup>
          <Circle
            
            center={position}
            pathOptions={circle}
            radius={46000}
          />
        </LayerGroup>

        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {news.map((item, idx) => {
          return (
            <Marker key={idx} position={item.position} icon={customIcon}>
              <Popup>{item.title}</Popup>
            </Marker>
          );
        })}
      </MapContainer>
    ),
    [news,position]
  );

  return (
    <MainDiv>
      {map ? <MapState map={map} positionChange={setPosition} /> : null}
      {displayMap}
    </MainDiv>
  );
};
export default Map;
