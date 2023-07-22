import React from 'react'
import { Stage } from 'react-konva'

import Game from './Game'

function App () {

  const changeSpeed = (n) => {
    console.log(`Thrusters to ${n}!`)
  }

  const w = 500
  const h = 512

  return 	<>
    <div>
      <Stage height={h} width={w} >
        <Game  height={h} width={w} />
      </Stage>
    </div>
    <button onClick={() => changeSpeed(60)}>x1</button> 
    <button onClick={() => changeSpeed(120)}>x2</button> 
    <button onClick={() => changeSpeed(180)}>x3</button> 
    <button onClick={() => changeSpeed(300)}>x5</button> 
    <button onClick={() => changeSpeed(0)}>MAX</button> 
  </>
}

export default App
