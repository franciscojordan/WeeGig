import React from 'react';
import GoogleMapReact from 'google-map-react';
import credentials from '../../../credentials';

interface MapProps {
    center: { lat: number; lng: number };
    zoom: number;
    markerPosition: { lat: number; lng: number };
}

const MapComponent: React.FC<MapProps> = ({ center, zoom, markerPosition }) => {
    const redPinStyle: React.CSSProperties = {
        width: '32px',
        height: '32px',
        backgroundImage: 'url("https://maps.google.com/mapfiles/ms/icons/red-pushpin.png")',
        backgroundSize: 'cover',
        transform: 'translate(-50%, -100%)',
    };

    const mapOptions = {
        fullscreenControl: false,
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: 'horizontal_bar',
            position: 'bottom_center',
            mapTypeIds: ['roadmap', 'satellite', 'hybrid'],
        },
    };

    const Marker: React.FC<{ lat: number; lng: number; text: string }> = () => (
        <div style={redPinStyle}></div>
    );

    return (
        <div style={{ height: '500px', width: '50%', paddingLeft: '24vw' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: credentials.apiKey }}
                defaultCenter={center}
                defaultZoom={zoom}
                draggable={false}
                options={mapOptions}
            >
                <Marker
                    lat={markerPosition.lat}
                    lng={markerPosition.lng}
                    text="Your Location"
                />
            </GoogleMapReact>
        </div>
    );
};

export default MapComponent;
