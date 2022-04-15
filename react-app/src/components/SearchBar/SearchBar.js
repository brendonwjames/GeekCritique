import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GameDetailsModal from "../Modals/GameDetailsModal";
import './SearchBar.css';

const SearchBar = () => {
    const [search, setSearch] = useState('');
    // const [games, setGames] = useState([]);
    // const dispatch = useDispatch();
    const games = useSelector((state => Object.values(state.game)));
    console.log('search bar games', games)


    // const reset = () => {
    //     setSearch('');
    //     setGames([]);
    // }

    // const fetched = async function fetchData() {
    //     const response = await fetch('/games');
    //     const searchResults = await response.json();
    //     setGames(searchResults.games);
    // }

    // useEffect(() => {
    // }, []);

    return (
        <div className='search-bar-container' >
            <div className='search-box'>
                <p className='search-text'>Looking for a game?</p>
                <input
                    className='search-input'
                    placeholder='Search for a game here!'
                    value={search}
                    onChange={(e) =>  setSearch(e.target.value) }
                    // onBlur={reset}
                >
                </input>
                <button onClick={() => setSearch(() => '')}>Reset</button>
                {/* <button type='submit' onSubmit={console.log('reset')}>Clear</button> */}
            </div>
            <div className='searchbar-results-container'>
                <div className='searchbar-results'>
                    <div className='searchbar-results-innercontainer'>
                        {games.filter((game) => {
                            if (search === '') return null;
                            else if (game.name.toLowerCase().includes(search.toLowerCase()))
                                return game;
                            // else return <div>no games yet</div>
                        })
                            .map((game) => (
                                <div className='search-bar-game' key={game.id}  >
                                    <GameDetailsModal game={game} search={search} />
                                    {/* {game.name} */}
                                </div>
                            ))
                            }
                            
                    </div>
                </div>
            </div>
        </div>
    );
};
export default SearchBar;