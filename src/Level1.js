import TicTacToe from "./TicTacToe";
function Level1 (props) {
    const {setLevel,setdisableLevel2} = props;
    return (
        <div className="Level1">
          <h1 className="headline">WIN THREE TIMES IN TIC-TAC-TOE BACHU</h1>
          <TicTacToe setdisableLevel2={setdisableLevel2} setLevel={setLevel}/>
        </div>
      );
}
export default Level1;