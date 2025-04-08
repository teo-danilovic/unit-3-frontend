const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/movies`;



const index = async () => {
    try {
        const res = await fetch(BASE_URL, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });

        if (!res.ok) { // Check if response is not OK (status code is not 2xx)
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        return res.json();
    } catch (error) {
        console.log('Error fetching movies:', error.message); // Log detailed error message
    }
};

const show = async (movieId) => {
    try {
        const res = await fetch(`${BASE_URL}/${movieId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

const create = async (movieFormData) => {
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movieFormData),
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};


const createReview = async (movieId, reviewFormData) => {
    try {
        const res = await fetch(`${BASE_URL}/${movieId}/reviews`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewFormData),
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

const deleteMovie = async (movieId) => {
    try {
        const res = await fetch(`${BASE_URL}/${movieId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};


async function update(movieId, movieFormData) {
    try {
        const res = await fetch(`${BASE_URL}/${movieId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movieFormData),
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
}

export {
    index,
    show,
    create,
    createReview,
    deleteMovie,
    update,
};


