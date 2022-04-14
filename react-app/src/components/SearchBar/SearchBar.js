import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import GameDetailsModal from "../Modals/GameDetailsModal";
import './SearchBar.css';

const SearchBar = () => {
    const [search, setSearch] = useState('');
    const [games, setGames] = useState([]);
    const dispatch = useDispatch();

    const reset = () => {
        setSearch('');
    }

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/games');
            const searchResults = await response.json();
            setGames(searchResults.games);
        }

        fetchData();
    }, [dispatch]);

    return (
        <div className='search-bar-container' >
            <div className='search-box'>
                <p className='search-text'>Looking for a game?</p>
                <input
                    className='search-input'
                    placeholder='Search for a game here!'
                    value={search}
                    onChange={(e) => { setSearch(e.target.value) }}
                    // onBlur={reset}
                />
                {/* <button type='submit' >Search</button> */}
            </div>
            <div className='searchbar-results-container'>
                <div className='searchbar-results'>
                    <div className='searchbar-results-innercontainer'>
                        {games.filter((game) => {
                            if (search === '') return null;
                            else if (game.name.toLowerCase().includes(search.toLowerCase()))
                                return game;
                        })
                            .map((game) => (
                                <div className='search-bar-game' key={game.id}  >
                                    <GameDetailsModal game={game} search={search} />
                                    {/* {game.name} */}
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default SearchBar;