import Places from './Places.jsx';
import { useState, useEffect } from 'react';
import Error from './Error.jsx';
import {sortPlacesByDistance} from '../loc.js';
import {fetchAvailablePlaces} from '../http.js';

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [error, setError] = useState('');

  useEffect(()=> {
    async function fetchPlaces() {
      setIsLoader(true);
      try {
        const places = await fetchAvailablePlaces();
        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(places, position.coords.latitude, position.coords.longitude);
          setAvailablePlaces(sortedPlaces);

        })
        setAvailablePlaces(places);
        setIsLoader(false);
      } catch(error) {
        setError({
          message: error.message || 'Could not fetch records. Please try again later'
        });
        setIsLoader(false);
      }
    }

    fetchPlaces();
    // fetch('http://localhost:3000/places').then((response) => {
    //   return response.json()
    // }).then((resData) => {
    //   setAvailablePlaces(resData.places)
    // })
  }, []);

  if (error) {
    return <Error title="An Error Occurred" message={error.message}/>
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isLoader}
      isLoadingText="Fetching places data...."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
