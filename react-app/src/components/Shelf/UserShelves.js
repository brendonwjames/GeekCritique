import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGames } from "../../store/games";
import { allReviews } from "../../store/reviews";
import { getUserShelves } from "../../store/shelves";
import GameDetailsModal from "../Modals/GameDetailsModal";
import { getUsers } from "../../store/session";
import './UserShelves.css';


const UserShelves = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getAllGames());
        dispatch(allReviews());
        dispatch(getUsers());
        dispatch(getUserShelves(user.id));
    }, [dispatch])

    const shelves = useSelector((state => Object.values(state.shelf)))

    console.log('why would I not hit this')

    console.log('SHELVES++++', shelves)

return (
    <>
        Coming from usershelves component
        <div className='feed-title'>
            <h1>Shelves</h1>
        </div>
        <div className='game-container'>
            {shelves[0] && shelves[0].map((shelf) => (
                <div className='game-post' key={shelf.id}>
                    {shelf.name}
                    {/* {allUsers[review.user_id].username} */}
                    {/* {console.log(shelf)} */}
                </div>
            ))}
        </div>
    </>
)

}

export default UserShelves;