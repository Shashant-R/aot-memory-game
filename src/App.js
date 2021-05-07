import React, {useEffect, useState} from 'react';
import CardList from './components/CardList';
import initializeDeck from './Deck';
import Score from './components/Score';
import './App.css';
function Greeting(props){
	if(props.won)
	{
		return <h1><strong>Shinzou wo Sasageyo!</strong><br/>Hit refresh to play again</h1>
	}
	else
	{
		return <></>
	}
}
export default function App() {

	const [tiles, setTiles] = useState([])
	const [flipped, setFlipped] = useState([])
	const [dimension, setDimension] = useState(400)
	const [solved, setSolved] = useState([])
	const [disabled, setDisabled] = useState(false)
	const [flipcount, setFlipcount] = useState(0)
	const [landscape, setLandscape] = useState(true)
	const [won, setWon] = useState(false)

	const resizeBoard = () => {
		const sc_ht = document.documentElement.clientHeight
		const sc_wd = document.documentElement.clientWidth 
		setLandscape(
			sc_wd	>	sc_ht
		)
		setDimension(
			landscape ? sc_wd/2 : sc_wd
		)
	}
	useEffect(()=> {
		resizeBoard()
		setTiles(initializeDeck())
	}, tiles)

	useEffect(() => {
		preloadImages()
	}, [])
	
	const preloadImages = () => {
		tiles.map(tile => {
			const src = `./img/${tile.type}.png`
			new Image().src = src
		})
	}
	useEffect(() =>{
		console.log('Hello')
		setWon(solved.length===16? true:false)
	})
	useEffect(()=> {
		const resizeListener = window.addEventListener('resize', resizeBoard)
		return () => window.addEventListener('resize', resizeListener)
	})
	
	const handleClick = (id) => {
		setDisabled(true)
		if(flipped.length === 0){
			setFlipped([id])
			setDisabled(false)
			return
		}else {
			if(sameCardClicked(id))
			{
				setDisabled(false)
				return
			}
			setFlipped([flipped[0], id])
			if (isMatch(id)) {
				setSolved([...solved, flipped[0], id])
				resetTiles()
			}
			else
			{
				setFlipcount(flipcount+1)
				setTimeout(resetTiles, 1000)
			}
		}
		
	}
	const resetTiles = () => {
		setFlipped([])
		setDisabled(false)

	}
	const isMatch = (id) => {
		const clickedTile = tiles.find((tile)=>tile.id === id)
		const flippedTile = tiles.find((tile)=>flipped[0] === tile.id)
		return flippedTile.type === clickedTile.type
	}
	const sameCardClicked = (id) => flipped.includes(id)
  	return (
	<>	  
  	<div className='body'>
		<Score
			className = 'scorebutton'
			score = {solved.length/2 * 100 - flipcount}
		/>
    	<CardList
			className = 'container'
			landscape = {landscape}
			dimension = {dimension}
			tiles={tiles}
			flipped={flipped}
			handleClick={handleClick}
			disabled={disabled}
			solved={solved}
    	/>
		<Greeting id='congo' won={won}/>
	</div>
	</>
  );
}

