import React, { useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

const Map = ({ center, zoom, address1, address2 }) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: "AIzaSyCbadyqL5WW7_iyIgIL9hAH0qL7DtB1kaA",
      version: "weekly",
    });

    loader.load().then(() => {
      const mapOptions = {
        center: center,
        zoom: zoom,
      };
      const newMap = new window.google.maps.Map(
        document.getElementById("map"),
        mapOptions
      );
      setMap(newMap);
      var a1 = null;
      var a2 = null;
      geocode(address1).then((latLng) => {
        //if this is a valid address and geocode returns a latLng

        a1 = latLng;
        new window.google.maps.Marker({
          position: latLng,
          map: newMap,
          title: "Collect",

          //more options
          //colour
          color: "blue",
        });

        geocode(address2).then((latLng) => {
          a2 = latLng;
          new window.google.maps.Marker({
            position: latLng,
            map: newMap,
            title: "Deliver",
          });
          //pan to avg of a1 and a2
          var avgLat = (a1.lat + a2.lat) / 2;
          var avgLng = (a1.lng + a2.lng) / 2;
          newMap.panTo({ lat: avgLat, lng: avgLng });
          //zoom enough to see both markers
          newMap.fitBounds({
            north: Math.max(a1.lat, a2.lat),
            south: Math.min(a1.lat, a2.lat),
            east: Math.max(a1.lng, a2.lng),
            west: Math.min(a1.lng, a2.lng),
          });

          //show route
          var directionsService = new window.google.maps.DirectionsService();
          var directionsRenderer = new window.google.maps.DirectionsRenderer();
          directionsRenderer.setMap(newMap);
          var request = {
            origin: a1,
            destination: a2,
            travelMode: "DRIVING",
          };
          directionsService.route(request, function(result, status) {
            if (status == "OK") {
              directionsRenderer.setDirections(result);
            }
          });
          //distance on the route
          var service = new window.google.maps.DistanceMatrixService();
          service.getDistanceMatrix(
            {
              origins: [a1],
              destinations: [a2],
              travelMode: "DRIVING",
              unitSystem: window.google.maps.UnitSystem.METRIC,
              avoidHighways: false,
              avoidTolls: false,
            },
            callback
          );
          function callback(response, status) {
            //alert(response.rows[0].elements[0].distance.text);
            //set localstorage distance to this
            //if distance is a number that is not 0
            try {
              if (
                response.rows[0].elements[0].distance.text.split(" ")[0] != "0"
              ) {
                localStorage.setItem(
                  "distance",
                  response.rows[0].elements[0].distance.text
                );
              }
            } catch (err) {}
          }
        });
      });
      //SET MARKER
    });
  }, [address1, address2]);
  const isPhone = window.innerWidth < 500;

  return (
    <div
      id="map"
      style={{
        height: !isPhone ? "300px" : "200px",
        width: !isPhone ? "400px" : "300px",
      }}
    ></div>
  );
};

Map.defaultProps = {
  center: {
    lat: 37.7749,
    lng: -122.4194,
  },
  zoom: 13,
};

//convert an address to a marker
const geocode = (address) => {
  const geocoder = new window.google.maps.Geocoder();
  return new Promise((resolve, reject) => {
    geocoder.geocode({ address }, (results, status) => {
      if (status === "OK") {
        const geometry = results[0].geometry.location;
        const latLng = {
          lat: geometry.lat(),
          lng: geometry.lng(),
        };
        resolve(latLng);
        //what is happening till here
      } else {
        reject("ERROR");
      }
    });
  });
};

export default Map;
