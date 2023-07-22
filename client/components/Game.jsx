import React, { useEffect, useState } from 'react'
import { Image, Layer } from 'react-konva'
import useImage from 'use-image'

import { isLoaded } from './utils'
import Neuroevolution from './utils/Neuroevolution'
import Birb from './Bird'
import Pipe from './Pipe'

const Neuvol = new Neuroevolution

function Game({ height, width }) {
	
	const [pipes, setPipes] = useState([])
	const [birds, setBirds] = useState([])
	const [score, setScore] = useState(0)
	const [period, setPeriod] = useState(0)
	const [gen, setGen] = useState([])
	const [genCount, setGenCount] = useState(0)
	const [aliveCount, setAliveCount] = useState(0)
	const [backgroundx, setBackgroundx] = useState(0)
	const [maxScore, setMaxScore] = useState(0)

	const spawnInterval = 90
	const backgroundSpeed = 0.5
	// TODO: let user change w buttons
	let FPS = 60

	useEffect(() => {
		start()
	}, [])
	
	// START
	const start = () => {
		// console.log('game start', birds)

		
		setPeriod(0)
		setScore(0)
		setPipes([])
		
		const nextGen = Neuvol.nextGeneration()
		
		setGen(nextGen)
		setGenCount(1)
		setAliveCount(nextGen.length)

		const birds = nextGen.map((gen, i) => ({ id: `${genCount}-${i}`, gen}))
		// console.log('start finish', birds)

		setBirds(birds)
	}

	// UPDATE
	useEffect(() => {
		setBackgroundx(prev => prev + backgroundSpeed)

		// const nextHole = 0

		// if(birds.length){
		// 	for(let i = 0; i < pipes.length; i += 2){
		// 		const pipe = pipes[i]
		// 		if(pipe.x + pipe.width > birds[0].x){
		// 			nextHole = pipe.height/height
		// 			break
		// 		}
		// 	}
		// }

		// // UPDATE - birbs
		// console.log('update', birds)
		// for(let i in birds){
		// 	const bird = birds[i]
		// 	console.log(i)

		// 	if(bird.alive){
		// 		console.log(i, 'alive')

		// 		const inputs = [ (bird.y / height), nextHole ]
		// 		const res = gen[i].compute(inputs)

	

		// // UPDATE - pipes
		// for(let i = 0; i < pipes.length; i++){
		// 	pipes[i].update()
		// 	if(pipes[i].isOut()){
		// 		// TODO: don't splice - need to setState
		// 		this.pipes.splice(i, 1)
		// 		i--
		// 	}
		// }

		// // UPDATE - period >> spawn pipes
		// if(period == 0){
		// 	// WTF IS deltaBord
		// 	const deltaBord = 50
		// 	const pipeHole = 120
		// 	const holePosition = Math.round(Math.random() * (height - deltaBord * 2 - pipeHole)) +  deltaBord

		// 	setPipes((prevPipes) => [
		// 		...prevPipes,
		// 		<Pipe type='top' pos={width} y={0} height={holePosition} />,
		// 		<Pipe type='bot' pos={width} y={holePosition + pipeHole} height={height} />
		// 	])
		// }

		// setPeriod(i => i + 1)
		// if(period == spawnInterval){
		// 	setPeriod(0)
		// }
		
		// console.log('check', aliveCount, birds.length)
		if(score && aliveCount === 0){
			start()
			if(score > maxScore) setMaxScore(score)
		} else {
			FPS == 0 ? setScore(s => s + 1) :	setTimeout(() => setScore(s => s + 1), 10000/FPS);
		}
		
	}, [score])

	// const isEnd = () => {
	// 	for(let birb of birds){
	// 		if(birb.alive){
	// 			return false;
	// 		}
	// 	}
	// 	return true
	// }

	// DISPLAY 
	// TODO: move these to individual places
	// display = () => {

	// 	ctx.fillStyle = "#FFC600";
	// 	ctx.strokeStyle = "#CE9E00";

	// 	for(let i in birds){
	// 		if(birds[i].alive){
	// 			ctx.save()
	// 			ctx.translate(birds[i].x + birds[i].width/2, birds[i].y + birds[i].height/2)
	// 			ctx.rotate(Math.PI/2 * birds[i].gravity/20)
	// 			ctx.drawImage(images.bird, -birds[i].width/2, -birds[i].height/2, birds[i].width, birds[i].height)
	// 			ctx.restore()
	// 		}
	// 	}

	// 	ctx.fillStyle = "white";
	// 	ctx.font="20px Oswald, sans-serif";
	// 	ctx.fillText("Score : " + score, 10, 25);
	// 	ctx.fillText("Max Score : " + maxScore, 10, 50);
	// 	ctx.fillText("Generation : " + genCount, 10, 75);
	// 	ctx.fillText(`Alive : ${aliveCount} / ${Neuvol.options.population}`, 10, 100)
	// }

	const [backgroundImg] = useImage('/img/background.png')
	const repeat = isLoaded(backgroundImg) ? Math.ceil(width / backgroundImg.width) + 1 : 0
	const backgrounds = new Array(repeat).fill(0).map((x, i) => <Image key={i} x={i * backgroundImg.width - Math.floor(backgroundx % backgroundImg.width)} y={0} image={backgroundImg}/>)

	const updateFlock = (id, g) => {
		setAliveCount(prev => prev - 1)
		Neuvol.networkScore(g, score)

		setBirds(birds => birds.filter(b => b.id !== id))
	}

	const hitPipe = (x, y, height, width) => {
		for(let pipe of pipes){
			if(!(
				x > pipe.x + pipe.width || 
				x + width < pipe.x || 
				y > pipe.y + pipe.height || 
				y + height < pipe.y
			)){
				return true
			}
		}
	}

	// console.log('birds:', aliveCount, birds.length)
	return <Layer>
		{backgrounds}
		{birds.map((b, i) => <Birb 
			key={i} 
			id={b.id} 
			gen={b.gen} 
			bottomEdge={height} 
			updateFlock={updateFlock} 
			hitPipe={hitPipe} 
			tick={score} 
			/>)}
		{/* {pipes} */}
	</Layer>

}

export default Game
