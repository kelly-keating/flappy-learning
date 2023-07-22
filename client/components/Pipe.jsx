import React, { useState } from 'react'
import { Image } from 'react-konva'
import useImage from 'use-image'


function Pipe ({ score, type, pos, y, height }) {

	const [x, setX] = useState(pos)

	const width = 50
	const speed = 3

	const update = () => {
		setX(prev => prev - speed)
	}

	const isOut = () => {
		if(x + width < 0){
			return true
		}
	}

	const [topImg] = useImage('/img/pipetop.png')
	const [bottomImg] = useImage('/img/pipebottom.png')

	return <Image x={x} y={y} height={height} image={type === 'top' ? topImg : bottomImg} />
}

export default Pipe