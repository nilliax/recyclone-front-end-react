import React from 'react'
import L from 'leaflet'
import {Map, TileLayer, Marker, Popup} from 'react-leaflet'

function MyMap ({location, bins, clickable, binToAdd}) {
    const [newLoc, setNewLoc] = React.useState({lat: undefined, long: undefined})

    const generateIcon = (color) => {
        return L.icon({
            iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        })
    }

    const mapStyle = {
        width: '100%',
        height: '400px',
    }

    const handleClick = (e) => {
        if (clickable) {
            setNewLoc({lat: e.latlng.lat, long: e.latlng.lng})
            binToAdd.lat = e.latlng.lat
            binToAdd.long = e.latlng.lng
            console.log(binToAdd)
        }
    }

    return (
        <div>
            <Map center={[location.lat, location.long]} zoom={13} onMouseDown={handleClick}>
                <TileLayer 
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[location.lat, location.long]} icon={generateIcon('black')}>
                    <Popup>My Location</Popup>
                </Marker>
                {bins.map((bin) => {
                    {console.log(bin)}
                    return (<Marker position={[bin.latitude, bin.longitude]} icon={generateIcon('green')} key={bin._id}>
                        <Popup>
                            Bin Color: {bin.color} <br />
                            Type of recycling material: {bin.type}
                        </Popup>
                    </Marker>)
                })}
                {(newLoc.lat != undefined && newLoc.long != undefined && clickable) && <Marker position={[newLoc.lat, newLoc.long]} icon={generateIcon('orange')}>
                    </Marker>}
            </Map>
        </div>
    )
}

export default MyMap
