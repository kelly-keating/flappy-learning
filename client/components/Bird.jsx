import React, { useEffect, useState } from 'react'
import { Image } from 'react-konva'
import useImage from 'use-image'

function Bird ({id, gen, bottomEdge, nextHole, updateFlock, hitPipe, tick}){

	const [gravity, setGravity] = useState(0)
	const [y, setY] = useState(250)
	const [alive, setAlive] = useState(true)
	
	const x = 80
	const width = 40
	const height = 30
	const velocity = 0.3
	const jump = -6

	useEffect(() => {
		const inputs = [ (y / height), 200 ]
		const [res] = gen.compute(inputs)

		if(res > 0.5){
			flap()
		}
		update()

		if(isOutOfBounds() || hitPipe(x, y, height, width)){
			crash()
		}
	}, [tick])

	const flap = () => {
		setGravity(jump)
	}

	const crash = () => {
		// console.log('crash')
		updateFlock(id, gen)
	}

	const update = () => {
		setGravity(prev => prev + velocity)
		setY(prev => prev + gravity)
	}

	const isOutOfBounds = () => {
		if(y >= bottomEdge || y + height <= 0){
			return true
		}
		return false
		// for(let pipe of pipes){
		// 	if(!(
		// 		x > pipe.x + pipe.width || 
		// 		x + width < pipe.x || 
		// 		y > pipe.y + pipe.height || 
		// 		y + height < pipe.y
		// 	)){
		// 		setAlive(false)
		// 		return true
		// 	}
		// }
	}

	const [image] = useImage('/img/bird.png')
	// console.log('render', y)
	return <Image x={x} y={y} image={image} />
}

export default Bird
