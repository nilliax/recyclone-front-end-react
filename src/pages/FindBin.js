import React from 'react'
import { useState, useEffect } from 'react'
import useFetchBins from '../components/hooks/useFetchBins'
import MyMap from '../components/Map'
import style from './style/FindBin.module.css'
import SidePane from '../components/SidePane'
import FilterForm from '../components/FilterForm'
import SearchForm from '../components/SearchForm'
import AddForm from '../components/AddForm'

function FindBin(props) {
    // State that is responsible for menu management
    const [activeMenu, setActiveMenu] = useState({
        filter: false, search: false, add: false,
    })
    // Sate responsible for holding current location data
    const [currentLocation, setCurrentLocation] = useState({
        lat: 45.4215, long: -75.6972
    })
    // State responsible for fetch bins parameters
    const [binsData, setBinsData] = useState({
        types: [], rad: 1
    })
    // State responsible for holding bin to add
    const [binToAdd, setBinToAdd] = useState({lat: undefined, long: undefined, types: [], colors: []})

    const {bins, isPending, error} = useFetchBins(currentLocation, binsData)

    useEffect(() => {
        getCurrLocation()
    }, [])

    const setMenu = (menu) => {
        switch (menu) {
            case 'filter':
                setActiveMenu({filter: !activeMenu.filter, search: false, home: false,
                    add: false, fullScreen: false,})
                break
            case 'search':
                setActiveMenu({filter: false, search: !activeMenu.search, home: false,
                    add: false, fullScreen: false,})
                break
            case 'add':
                setActiveMenu({filter: false, search: false, home: false,
                    add: !activeMenu.add, fullScreen: false,})
                break
            case 'fullScreen':
                props.switchNav()
                break
            case 'home':
                getCurrLocation()
            
        }
    }

    const getCurrLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setCurrentLocation({lat: position.coords.latitude, long: position.coords.longitude})
            })
        }
    }

    const addrToGeo = async (addr) => {
        var loc;
        var res = await fetch(`https://us1.locationiq.com/v1/search.php?key=pk.9dc4852939a1766bbd3827f072b48473&q=${addr}&format=json`)
        var data = await res.json()
        return {lat: data[0].lat, long: data[0].lon}
     }

    
    const setBinParameters = async (location, types, rad) => {
        if (location) {
            var location = await addrToGeo(location)
            setCurrentLocation(location)
        }
        setBinsData({types, rad})
    }

    const setLocation = async (location) => {
        console.log(location)
        var loc = await(addrToGeo(location))
        console.log(loc)
        setCurrentLocation(await addrToGeo(location))
    }

    const addNewBin = () => {
        console.log(binToAdd)
        binToAdd.types.forEach((_, i) => {
            let binObject = {
                latitude: binToAdd.lat,
                longitude: binToAdd.long,
                type: binToAdd.types[i],
                color: binToAdd.colors[i]
            }
            console.log(binObject)
            let link = `http://192.168.2.46:5001/public/bins`
            fetch(link, {
                method: 'POST',
                body: JSON.stringify(binObject),
                headers: {'Content-Type': 'application/json'}
            })
        })
        setCurrentLocation({lat: currentLocation.lat, long: currentLocation.long})
    }

    return (
        <div className={style.root}>
            <div className={style.sidePane}>
                <SidePane setters={{setMenu: setMenu}} />
            </div>
            {activeMenu.filter === true && <div className={style.filterForm}>
                 <FilterForm setBinParameters={setBinParameters} />
            </div>}
            {activeMenu.search === true && <div className={style.filterForm}>
                 <SearchForm setLocation={setLocation} setBinParameters={setBinParameters} />
            </div>}
            {activeMenu.add === true && <div className={style.filterForm}>
                 <AddForm addNewBin={addNewBin} binToAdd={binToAdd} />
            </div>}
            <div className={style.map}>
                <MyMap binToAdd={binToAdd} location={{lat: currentLocation.lat, long: currentLocation.long}} bins={bins} clickable = {activeMenu.add} />
            </div>
        </div>
    )
}

export default FindBin
