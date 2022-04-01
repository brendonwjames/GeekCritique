import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGames } from "../../store/games";
import { allReviews } from "../../store/reviews";
import { getUserShelves } from "../../store/shelves";
import { userGames } from "../../store/usergames";
import GameDetailsModal from "../Modals/GameDetailsModal";
import { getUsers } from "../../store/session";
import './UserShelves.css';


const UserShelves = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getUsers());
        dispatch(getAllGames());
        dispatch(userGames(user.id))
        dispatch(allReviews());
        dispatch(getUserShelves(user.id));
    }, [dispatch])

    const shelves = useSelector((state => Object.values(state.shelf)))
    
    



// const numbers = [2,3,4,4,2,3,3,4,4,5,5,6,6,7,5,32,3,4,5]

// console.log([...new Set(numbers)])

    // console.log('UNIQUE SHELVES', uniqueShelves, theseShelves)
    
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