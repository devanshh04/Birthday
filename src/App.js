import React, {useState,useEffect,useRef} from "react";
import Level1 from "./Level1";
import Level2 from "./Level2";
import Level3 from "./Level3";
import Level4 from "./Level4";
import myMusic from "./Assets/myMusic.mp3"


function App() {

  const [music,setMusic] = useState(false);

  let playMusic = () =>{
    const targetAudio = document.getElementsByClassName("musicplay")[0];
    targetAudio.play();
    setMusic(true);
  }
  let stopMusic = () =>{
    const targetAudio = document.getElementsByClassName("musicplay")[0];
    targetAudio.pause();
    setMusic(false);
  }
  let playPauseMusic = () =>{
    if(music)
    {
      stopMusic();
    }
    else
    {
      playMusic();
    }
  }
  const [disableLevel2,setdisableLevel2] = useState(true);
  const [disableLevel3,setdisableLevel3] = useState(true);
  const [disableMessage,setdisableMessage] = useState(true);
  const [level,setLevel] = useState("0");

  const [showMessageBox, setShowMessageBox] = useState(false);
  const messageBoxRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (messageBoxRef.current && !messageBoxRef.current.contains(event.target)) {
        setShowMessageBox(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const toggleMessageBox = (e) => {
    e.stopPropagation();
    setShowMessageBox(!showMessageBox);
  };

  return (
    <div>
    {showMessageBox && <div className="backdrop"></div>}
    {level!=="0" && <button className="backBtn" onClick={()=>setLevel("0")}>Go to HomePage</button>}
    
    <button className="music" onClick={playPauseMusic}>{(music)?"Dev, Please Stop Singing 😭":"Dev, Please Sing For Me ❤️"}</button>
    <audio className="musicplay"><source src={myMusic}/></audio>

    {level==="0" && <button onClick={toggleMessageBox} className="rules">RULES</button>}
      {level==="0" && showMessageBox && (
        <div ref={messageBoxRef} className={`hint ${showMessageBox ? 'active' : ''}`}>
          "So basically, Captain Vanshika Singh, you need to win all three levels to reach the goal.<br></br> (Hint: The background image isn't just any image; it's the clue for the 3rd level, huhh :)"
          <br></br><br></br>
          ALL THE BESTTTT TO MY 11:11 WISHHHH
          <br></br><br></br>
          <button className="closeRules" onClick={toggleMessageBox}>Close</button>
        </div>
      )}

      {level==="0" && <>
      <p className="welcome">WELCOME ABOARD, CAPTAIN!<br></br>
      Your presence lights up the runway of my heart. Heh</p>
      <div className="levelsDisplay">
      <button className="playLevel" onClick={()=>setLevel("1")}>{!disableLevel2?"Level 1 🎀":"Level 1"}</button>
      <button disabled={disableLevel2} title="Win Level 1 to Unlock" className="playLevel" onClick={()=>setLevel("2")}>{!disableLevel3?"Level 2 🎀":"Level 2"}</button>
      <button disabled={disableLevel3} title="Win Level 2 to Unlock" className="playLevel" onClick={()=>setLevel("3")}>{!disableMessage?"Level 3 🎀":"Level 3"}</button>
      </div>
      <div className="goaldisplay">
        <button disabled={disableMessage} title="Win All Level to Unlock" className="goal" onClick={()=>setLevel("4")}>GOAL</button>
      </div>
      
      </>
      }

    <div className="App">
      {level==="1" && <Level1 setLevel={setLevel} setdisableLevel2={setdisableLevel2}/>}
      {level==="2" && <Level2 setLevel={setLevel} setdisableLevel3={setdisableLevel3}/>}
      {level==="3" && <Level3 setLevel={setLevel} setdisableMessage={setdisableMessage}/>}
      {level==="4" && <Level4 stopMusic={stopMusic}/>}
    </div>
    </div>
  );
}

export default App;