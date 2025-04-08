
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import * as movieService from '../../services/movieService';



const MovieForm = (props) => {
    const { movieId } = useParams();
    console.log(movieId);
    const [formData, setFormData] = useState({
        title: '',
        movieDescription: '',
        category: 'Western',
    });


    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (movieId) {
            props.handleUpdateMovie(movieId, formData);
        } else {
            props.handleAddMovie(formData);
        }
    };



    useEffect(() => {
        const fetchMovie = async () => {
            const movieData = await movieService.show(movieId);
            setFormData(movieData);
        };
        if (movieId) fetchMovie();

        return () => setFormData({ title: '', movieDescription : '', category: 'Western' });
    }, [movieId]);

    return (
        <main>
            <h1>{movieId ? 'Edit Movie' : 'New Movie'}</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='title-input'>Title</label>
                <input
                    required
                    type='text'
                    name='title'
                    id='title-input'
                    value={formData.title}
                    onChange={handleChange}
                />
                <label htmlFor='text-input'>Movie Description</label>
                <textarea
                    required
                    type='text'
                    name='text'
                    id='text-input'
                    value={formData.text}
                    onChange={handleChange}
                />
                <label htmlFor='category-input'>Category</label>
                <select
                    required
                    name='category'
                    id='category-input'
                    value={formData.category}
                    onChange={handleChange}
                >
                    <option value='Action'>News</option>
                    <option value='Comedy'>Games</option>
                    <option value='Drama'>Music</option>
                    <option value='Fantasy'>Movies</option>
                    <option value='Horror'>Sports</option>
                    <option value='Mystery'>Television</option>
                    <option value='Romance'>Sports</option>
                    <option value='Thriller'>Sports</option>
                    <option value='Western'>Sports</option>
                    <option value='Sci-Fi'>Sports</option>
                    <option value='Documentary'>Sports</option>
                    <option value='Animation'>Sports</option>


                </select>
                <button type='submit'>SUBMIT</button>
            </form>
        </main>
    );
};

export default MovieForm;
