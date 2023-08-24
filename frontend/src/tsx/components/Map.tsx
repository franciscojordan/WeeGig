import React from 'react';
import GoogleMapReact from 'google-map-react';
import credentials from '../../../../credentials';

interface MapProps {
    center: { lat: number; lng: number };
    zoom: number;
    markerPosition: { lat: number; lng: number };
}

const MapComponent: React.FC<MapProps> = ({ center, zoom, markerPosition }) => {
    return (
        <div style={{ height: '500px', width: '50%', paddingLeft: "24vw"}}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: credentials.apiKey }} // Replace with your Google Maps API key
                defaultCenter={center}
                defaultZoom={zoom}
                draggable={false}
                options={mapOptions}
            >
            <Marker
                    lat={markerPosition.lat}
                    lng={markerPosition.lng}
                    text="Your Location" // Text to display when marker is clicked
                />
            </GoogleMapReact>
        </div>
    );
};
const redPinStyle: React.CSSProperties = {
    width: '32px',
    height: '32px',
    backgroundImage: 'url("https://maps.google.com/mapfiles/ms/icons/red-pushpin.png")',
    backgroundSize: 'cover',
    transform: 'translate(-50%, -100%)',
};  
const mapOptions = {
    fullscreenControl: false, // Hide fullscreen button
    mapTypeControl: true,
    mapTypeId: google.maps.MapTypeId.SATELLITE,
    mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.BOTTOM_CENTER,
        mapTypeIds: [
            google.maps.MapTypeId.ROADMAP,
            google.maps.MapTypeId.SATELLITE,
            google.maps.MapTypeId.HYBRID
        ]
    },
};
const Marker: React.FC<{ lat: number; lng: number; text: string }> = () => (
    <div style={redPinStyle}></div>
);
export default MapComponent;