import MemoryGame from "./memoryGame";
function Level2 (props) {
    const {setLevel,setdisableLevel3} = props;
    return (
        <div className="Level2">
          <h1 className="headline">LET'S SEE HOW SHARP YOUR MEMORY IS BETUUU</h1>
          <MemoryGame setdisableLevel3={setdisableLevel3} setLevel={setLevel}/>
        </div>
      );
}
export default Level2;