import { useState } from "react";
export default function CharacterCount() {
    const [show,setshow] = useState("");
  return (
    <div>


<input type="text" placeholder="Type something..." onChange={(e)=>setshow(e.target.value.length)} />
<p>Character Count: {show}</p>
 

    </div>
  );
}