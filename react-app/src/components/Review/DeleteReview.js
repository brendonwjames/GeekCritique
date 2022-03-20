import React from 'react';
import { useDispatch } from 'react-redux';
import { removeReview } from '../../store/reviews';
import './DeleteReview.css';

const DeleteReview = ({ review }) => {
    // console.log('DELETE MODAL:', game)

    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(removeReview(review.id))
    }

    return (
        <>
            <div className='delete-review-button'>
                <button onClick={handleDelete} className='delete-button'>Delete</button>
                {/* <button className='cancel-button' onClick={() => setShowModal(false)}>Cancel</button> */}
             </div>

        </>
    )
}


export default DeleteReview;