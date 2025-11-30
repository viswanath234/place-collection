import React, { useRef, useEffect } from "react";

import "./Map.css";

const Map = (props) => {
  const mapRef = useRef();

  const { center, zoom } = props;

  useEffect(() => {
    if (!window.ol) {
      console.error("OpenLayers library not loaded");
      return;
    }

    const markerSource = new window.ol.source.Vector();

    const markerStyle = new window.ol.style.Style({
      image: new window.ol.style.Icon({
        anchor: [0.5, 1],
        src: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCAzMiA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSIxNCIgZmlsbD0iI0VBNDMzNSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIi8+PHBhdGggZD0iTTAgMTZDMCA3LjE3MTYgNy4xNzE2IDAgMTYgMEMyNC44Mjg0IDAgMzIgNy4xNzE2IDMyIDE2QzMyIDI0LjgyODQgMjQgNDggMTYgNDhDOCA0OCAyNCAyNC44Mjg0IDAgMTZaIiBmaWxsPSIjRUE0MzM1IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz48Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSI0IiBmaWxsPSJ3aGl0ZSIvPjwvc3ZnPg==",
        scale: 1.2,
      }),
    });

    const markerLayer = new window.ol.layer.Vector({
      source: markerSource,
      style: markerStyle,
    });

    const markerFeature = new window.ol.Feature({
      geometry: new window.ol.geom.Point(
        window.ol.proj.fromLonLat([center.lng, center.lat])
      ),
    });

    markerSource.addFeature(markerFeature);

    new window.ol.Map({
      target: mapRef.current.id,
      layers: [
        new window.ol.layer.Tile({
          source: new window.ol.source.OSM(),
        }),
        markerLayer,
      ],
      view: new window.ol.View({
        center: window.ol.proj.fromLonLat([center.lng, center.lat]),
        zoom: zoom,
      }),
    });
  }, [center, zoom]);

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
      id="map"
    ></div>
  );
};

export default Map;
