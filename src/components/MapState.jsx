import React from "react";
import { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { mapState } from "../actions/mapActions";

const center = [51.505, -0.09];
const zoom = 13;

const MapState = ({ map, positionChange }) => {
  const dispatch = useDispatch();

  const onClick = useCallback(() => {
    map.setView(center, zoom);
  }, [map]);

  const onMove = useCallback(() => {
    positionChange(map.getCenter());
    let latlng = [map.getCenter().lat, map.getCenter().lng];
    dispatch(mapState(latlng));
  }, [map]);

  useEffect(() => {
    map.on("move", onMove);
    return () => {
      map.off("move", onMove);
    };
  }, [map, onMove]);

  return <></>;
};
export default MapState;
