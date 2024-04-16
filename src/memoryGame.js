import { useState } from 'react'
import Card from "./Card"
import img1 from "./Assets/1.jpeg"
import img2 from "./Assets/2.jpeg"
import img3 from "./Assets/3.jpeg"
import img4 from "./Assets/4.jpeg"
import img5 from "./Assets/5.jpeg"
import img6 from "./Assets/6.jpeg"
import img7 from "./Assets/7.jpeg"
import img8 from "./Assets/8.jpeg"
import img9 from "./Assets/9.jpeg"
import img10 from "./Assets/10.jpeg"
import img11 from "./Assets/11.jpeg"
import img12 from "./Assets/12.jpeg"

function MemoryGame(props){
    const {setdisableLevel3,setLevel} = props;
    const [items, setItems] = useState([
        { id: 1, img: img1, stat: "" },
        { id: 10, img: img1, stat: "" },
        { id: 2, img: img2, stat: "" },
        { id: 20, img: img2, stat: "" },
        { id: 3, img: img3, stat: "" },
        { id: 30, img: img3, stat: "" },
        { id: 4, img: img4, stat: "" },
        { id: 40, img: img4, stat: "" },
        { id: 5, img: img5, stat: "" },
        { id: 50, img: img5, stat: "" },
        { id: 6, img: img6, stat: "" },
        { id: 60, img: img6, stat: "" },
        { id: 7, img: img7, stat: "" },
        { id: 70, img: img7, stat: "" },
        { id: 8, img: img8, stat: "" },
        { id: 80, img: img8, stat: "" },
        { id: 9, img: img9, stat: "" },
        { id: 90, img: img9, stat: "" },
        { id: 10, img: img10, stat: "" },
        { id: 100, img: img10, stat: "" },
        { id: 11, img: img11, stat: "" },
        { id: 110, img: img11, stat: "" },
        { id: 12, img: img12, stat: "" },
        { id: 120, img: img12, stat: "" }
    ].sort(() => Math.random() - 0.5))

    const [prev, setPrev] = useState(-1);
    const [resetClicked,setResetClicked] = useState(0);
    
    function isGameSolved() {
        return items.every((item) => item.stat === "correct");
      }
    function level3Enable()
    {
        setdisableLevel3(false);
        return true;
    }

    function check(current){
        if(items[current].id === items[prev].id*10 || items[prev].id === items[current].id*10){
            items[current].stat = "correct"
            items[prev].stat = "correct"
            setItems([...items]);
            setPrev(-1);
        }else{
            items[current].stat = "wrong"
            items[prev].stat = "wrong"
            setItems([...items])
            setTimeout(() => {
                items[current].stat = ""
                items[prev].stat = ""
                setItems([...items])
                setPrev(-1)
            }, 1000)
        }
    }

    function handleClick(id){
        if(items[id].stat === "correct")
        {
            //do nothing
        }
        else if(prev === -1){
            items[id].stat = "active"
            setItems([...items])
            setPrev(id)
        }else{
            check(id)
        }
    }
    
    function reset(){
        if(isGameSolved())
        {
            setLevel("3");
        }
        items.forEach((item)=>{item.stat=""});
        items.sort(() => Math.random() - 0.5);
        setItems(items);
        setPrev(-1);
        setResetClicked(resetClicked+1);
    }

    return (
        <>
        <div className="container">
            { items.map((item, index) => (
                <Card key={index} item={item} id={index} handleClick={handleClick} />
            )) }
            
        </div>
        <button className="resetmemory" onClick={reset}>{isGameSolved()?"NEXT LEVEL":"RESET"}</button>{isGameSolved() && level3Enable() &&  <div className="congrats">Congratulations Bachuuu! You've passed the 2nd level!!!!</div>}
        </>
    )
}

export default MemoryGame