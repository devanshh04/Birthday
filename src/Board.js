import React, { useState, useEffect } from "react";
import Tile from "./Tile";
import { TILE_COUNT, GRID_SIZE, BOARD_SIZE } from "./constants"
import { canSwap, shuffle, swap, isSolved } from "./helpers"
import slideImage from "./Assets/imageForSlideGame.jpeg"

function Board(props) {
  const {setLevel,setdisableMessage} = props;
  const [tiles, setTiles] = useState([...Array(TILE_COUNT).keys()]);

  const shuffleTiles = () => {
    const shuffledTiles = shuffle(tiles)
    setTiles(shuffledTiles);
  }

  const swapTiles = (tileIndex) => {
    if (canSwap(tileIndex, tiles.indexOf(tiles.length - 1))) {
      const swappedTiles = swap(tiles, tileIndex, tiles.indexOf(tiles.length - 1))
      setTiles(swappedTiles)
    }
  }

  const [hasWon,setHasWon] = useState(false);
  const [started,setStarted] = useState(false);
  const checkForWon = () => {
    if(isSolved(tiles)===true)
    {
      setHasWon(isSolved(tiles));
    }
  }

  const handleTileClick = (index) => {
    swapTiles(index);
    setStarted(true);
  }
  const reset = () => {
    if(hasWon)
    {
      setLevel("0");
    }
    else
    {
      shuffleTiles();
    }
    
  }

  useEffect(()=>{
    if(started)
    {
      checkForWon();
    }
    
  },[tiles])

  useEffect(()=>{
    shuffleTiles()
  },[])

  const pieceWidth = Math.round(BOARD_SIZE / GRID_SIZE);
  const pieceHeight = Math.round(BOARD_SIZE / GRID_SIZE);
  const style = {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
  };
  const styleForReset = {
    backgroundColor: "rgb(21, 148, 42)",
    color: "black",
    border: "solid",
    borderColor: "white",
    borderRadius: "2rem",
    fontSize: "15px",
    fontFamily:"Franklin Gothic Medium",
    padding: "10px",
    paddingLeft: "30px",
    paddingRight: "30px",
    margin: "20px"
  }
  //const hasWon2 = isSolved(tiles);
  const ifWon = () => {
    if(hasWon===true)
    {
      console.log("hasWon: " + hasWon);
      setdisableMessage(false);
      return true;
    }
    else
    {
      return false;
    }
  }
  return (
    <>
      {!hasWon && <ul style={style} className="board">
        {tiles.map((tile, index) => (
          <Tile
            key={tile}
            index={index}
            tile={tile}
            width={pieceWidth}
            height={pieceHeight}
            handleTileClick={handleTileClick}
          />
        ))}
      </ul>}
      {hasWon && <img src={slideImage} width="500px" height="500px"/>}
      <button style={styleForReset} onClick={reset}>{hasWon?"WHAT'S NEXT??":"RESET"}</button>
      {ifWon()}
      {hasWon && <div className="congrats">Congratulations Bhai!!! Game and dil dono jeet gyi bc!</div>}
    </>
  );
}

export default Board;