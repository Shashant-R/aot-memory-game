import React from 'react';
import PropTypes from 'prop-types';

import './Tile.css';
export default function Tile({handleClick, id, type, flipped, height, width, disabled, solved}){
	return <div 
		className={`flip-container ${flipped ? 'flipped' : ''}`} 
		style={{
			width, height
		}}
		onClick={()=> disabled ? null : handleClick(id)}
		>
			<div className={`flipper ${flipped||solved ? '' : 'flippable'}`} >
					<img 
						style={{
							height, width
						}} 
					className={flipped || solved? (solved ? 'solved': 'front') : 'back'}
					src={flipped || solved ? `./img/${type}.png` : './img/erwin.png'}
					alt={`img = ${type}`}
					/>
			</div>
		</div>
}
Tile.propTypes = {
	handleClick: PropTypes.func.isRequired,
	id: PropTypes.number.isRequired,
	flipped: PropTypes.bool.isRequired,
	solved: PropTypes.bool.isRequired,
	type: PropTypes.string.isRequired,
	height: PropTypes.string.isRequired,
	width: PropTypes.number.isRequired,
	disabled: PropTypes.bool.isRequired,
}