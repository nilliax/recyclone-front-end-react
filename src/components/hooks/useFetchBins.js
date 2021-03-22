import {useState, useEffect} from 'react'

const useFetchBins = (location, binsData) => {
    const [bins, setBins] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const url = `http://localhost:5001/public/bins?lat=${location.lat}&long=${location.long}&rad=${binsData.rad}`
        fetch(url)
        .then(res => {
            if(!res.ok) {
                throw Error('could not fetch the data');
            }
            return res.json();
        })
        .then(data => {
            setIsPending(false);
            setBins(data);
            setError(null);
        })
        .catch(err => {
            setIsPending(false);
            setError(err.message);
        })
    },[location, binsData])
    return {bins, isPending, error};
}

export default useFetchBins;