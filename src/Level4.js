
function Level4 (props) {
    const {stopMusic} = props;
    return (
      <>
        <div className="youtube">
          <h1 className="headline" style={{fontSize:"60px",fontFamily:"fantasy"}}>HAPPYYYY BIRTHDAYYYY BITTUUUUU !!!!!</h1>
          <div class="video-container">
            <iframe onClick={stopMusic()} width="560" height="315" src="https://www.youtube.com/embed/XPzgEboHrfY" frameborder="0" allowfullscreen></iframe>
          </div>
        </div>
      </>
      );
}
export default Level4;