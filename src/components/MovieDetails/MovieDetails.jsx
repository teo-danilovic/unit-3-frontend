import { useState, useEffect, useContext } from 'react';
import * as movieService from '../../services/movieService';
import ReviewForm from '../ReviewForm/ReviewForm';
import { UserContext } from '../../contexts/UserContext';
import { useParams, Link } from 'react-router';





const MovieDetails = (props) => {
    const { movieId } = useParams();

    const { user } = useContext(UserContext);

    const [movie, setMovie] = useState(null);

    const handleAddReview = async (reviewFormData) => {
        const newReview = await movieService.createReview(movieId, reviewFormData);
        setMovie({ ...movie, reviews: [...movie.reviews, newReview] });
    };

    console.log('movieId', movieId);

    useEffect(() => {
        const fetchMovie = async () => {
            const movieData = await movieService.show(movieId);
            setMovie(movieData);
        };
        fetchMovie();
    }, [movieId]);

    console.log('movie state:', movie);

    if (!movie) return <main>Loading...</main>; {

        return (
            <main>
                <section>
                    <header>
                        <p>{movie.category.toUpperCase()}</p>
                        <h1>{movie.title}</h1>
                        <p>
                            {`${movie.author.username} posted on
                    ${new Date(movie.createdAt).toLocaleDateString()}`}
                        </p>
                        {movie.author._id === user._id && (
                            <>
                                <Link to={`/movies/${movieId}/edit`}>Edit</Link>

                                <button onClick={() => props.handleDeleteMovie(movieId)}>
                                    Delete
                                </button>
                            </>
                        )}
                    </header>
                    <p>{movie.text}</p>
                </section>
                <section>
                    <h2>Reviews</h2>
                    <ReviewForm handleAddReview={handleAddReview} />

                    {!movie.reviews.length && <p>There are no reviews.</p>}

                    {movie.reviews.map((review) => (
                        <article key={review._id}>
                            <header>
                                <p>
                                    {`${review.author.username} posted on
                ${new Date(review.createdAt).toLocaleDateString()}`}
                                </p>
                            </header>
                            <p>{review.text}</p>
                        </article>
                    ))}
                </section>
            </main>
        );
    };
}



export default MovieDetails;