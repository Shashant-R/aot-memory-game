import React from 'react';
import PropTypes from 'prop-types';
import Tile from './Tile';
import './CardList.css';

export default function CardList({
    landscape, solved, disabled, dimension, tiles, flipped, handleClick}) {
        return (
        <div className={`cardlist ${landscape ? '':'landscape'}` }>
            {tiles.map((tile) => (
                <Tile 
                    key={tile.id}
                    id={tile.id}
                    type={tile.type}
                    width={dimension / 5}
                    height={dimension / 5}
                    flipped={flipped.includes(tile.id)}
                    handleClick={()=> handleClick(tile.id)}
                    disabled = {disabled || solved.includes(tile.id)}
                    solved = {solved.includes(tile.id)}
                />
            ))}
        </div>
    )
}
CardList.propTypes = {
    landscape: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
    dimension: PropTypes.number.isRequired,
    tiles: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    flipped: PropTypes.arrayOf(PropTypes.number).isRequired,
    solved: PropTypes.arrayOf(PropTypes.number).isRequired,
    handleClick: PropTypes.func.isRequired,
}