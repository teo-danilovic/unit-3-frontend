import { useState } from 'react';

const ReviewForm = (props) => {
    const [formData, setFormData] = useState({ text: '' });

    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        props.handleAddReview(formData);
        setFormData({ text: '' });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='text-input'>Your review:</label>
            <textarea
                required
                type='text'
                name='text'
                id='text-input'
                value={formData.text}
                onChange={handleChange}
            />
            <button type='submit'>SUBMIT REVIEW</button>
        </form>
    );
};

export default ReviewForm;
