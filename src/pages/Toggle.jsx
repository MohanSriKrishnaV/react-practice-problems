import { useState } from "react";
export default function Toggler() {
    const [show,setshow] = useState(false);
  return (
    <div>

        <button onClick={()=>setshow(!show)}> Toggle   </button>
    

 {show ? <p>The toggler is ON</p> : <p>The toggler is OFF</p>}


    </div>
  );
}