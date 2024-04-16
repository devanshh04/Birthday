import Board from "./Board";
function Level3 (props) {
    const {setLevel,setdisableMessage} = props;
    return (
      <>
        <div className="Level3">
          <h1 className="headline">SOLVE THE SLIDING PUZZLE DUMBASS</h1>
          <Board setLevel={setLevel} setdisableMessage={setdisableMessage}/>
        </div>
      </>
      );
}
export default Level3;