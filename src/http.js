export async function fetchAvailablePlaces () {
    const response = await fetch('http://localhost:3000/places');
    const resData = await response.json();

    if (!response.ok) {
        throw new Error('An Error occured!!')
    }

    return resData.places
}

export async function fetchUserPlaces () {
    const response = await fetch('http://localhost:3000/user-places');
    const resData = await response.json();

    if (!response.ok) {
        throw new Error('An Error occured!!')
    }

    return resData.places
}

export async function updateUserPlaces(places) {
    const response = await fetch('http://localhost:3000/user-placess', {
        method: 'PUT',
        body: JSON.stringify({places}),
        headers: {
            'Content-type': 'application/json'
        }
    });
    const resData = await response.json();

    if (!response.ok) {
        throw new Error('An error Occurred!!')
    }

    return resData.message;
}