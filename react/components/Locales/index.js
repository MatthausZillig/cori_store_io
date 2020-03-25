import React, {
    useState, useEffect
} from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import axios from 'axios'
import "./Locales.global.css"

const style = {
    width: '100%',
    height: '100%',
    position: 'relative !important'
}

const Locales = ({ google }) => {
    const [jsonLocales, setJsonLocales] = useState([])
    const [zoom, setZoom] = useState(7)
    const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 })
    const [showingInfoWindow, setShowingInfoWindow] = useState(false)
    const [activeMarker, setActiveMarker] = useState({})
    const [selectedPlace, setSelectedPlace] = useState({})

    const setCenter = (lat, lng) => {
        setZoom(13)
        setMapCenter({
            lat, lng
        })
    }

    const onMarkerClick = (props, marker, e) => {
        setSelectedPlace(props)
        setActiveMarker(marker)
        setShowingInfoWindow(true)
    }

    const onClose = props => {
        if (showingInfoWindow) {
            setShowingInfoWindow(false)
            setActiveMarker(null)
        }
    };

    const getLocales = () => {

        return axios.get("/files/locales.json").then(res => {

            const jsonLocales = res.data
            let indexCenter = res.data.findIndex((local, index) => {
                if (local.id == 659) {
                    return index
                }
            })
            indexCenter = indexCenter < 0 ? 0 : indexCenter
            setMapCenter({ lat: jsonLocales[indexCenter].address.location.latitude, lng: jsonLocales[indexCenter].address.location.longitude })
            setJsonLocales(jsonLocales)

            return jsonLocales
        })
    }

    useEffect(() => {
        getLocales()
    }, [])

    return (
        <div className="container">
            <div id="mapa" className="row">
                <div className="col col-md-6">
                    <div className="headerLocales">
                        <div className="w-100 col">
                            <h3>Nuestras tiendas</h3>
                        </div>
                        <div className="w-100">
                            <div className="col col-auto">Usted está en: <strong>Capital Federal</strong></div>
                        </div>
                        <div className="w-100 d-flex">
                            <div className="col col-sm-6">
                                <h5>Província</h5>
                                <select>
                                    <option value="Capital Federal">Capital Federal</option>
                                </select>
                            </div>
                            <div className="col col-sm-6">
                                <h5>Localidad</h5>
                                <select>
                                    <option value="Capital Federal">Capital Federal</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="listLocales col">
                        <ul>
                            {jsonLocales.map(local => (
                                <li className="d-flex flex-wrap" onClick={() => setCenter(local.address.location.latitude, local.address.location.longitude)}>
                                    <div className="col col-1 icon">
                                        <img src="/arquivos/logo.png" />
                                    </div>
                                    <div className="col col-11 data">
                                        <h3>{local.name}</h3>
                                        <p>{local.address.street + ", " + local.address.number + " - " + local.address.neighborhood + " - " + local.address.city + " - " + local.address.state}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="col col-md-6">
                    <Map className="map"
                        google={google}
                        zoom={showingInfoWindow ? 16 : zoom}
                        style={style}
                        initialCenter={mapCenter}
                        center={mapCenter}
                    >
                        {
                            jsonLocales.map(marker => (
                                <Marker
                                    onClick={onMarkerClick}
                                    name={marker.name}
                                    position={{ lat: marker.address.location.latitude, lng: marker.address.location.longitude }}
                                    addres={marker.address.street + ", " + marker.address.number + ", " + marker.address.neighborhood + ", " + marker.address.state}
                                    icon={{
                                        url: "/arquivos/icon.png"
                                    }}
                                />

                            ))
                        }
                        <InfoWindow
                            marker={activeMarker}
                            visible={showingInfoWindow}
                            onClose={onClose}
                        >
                            <div className="infoWindow">
                                <h4><strong>{selectedPlace.name}</strong></h4>
                                <p>{selectedPlace.addres}</p>
                            </div>
                        </InfoWindow>
                    </Map>
                </div>
            </div>
        </div>
    );
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyA0EawXKSOj5HvGOiVqPnOU6KiqutlbFw8'
})(Locales)