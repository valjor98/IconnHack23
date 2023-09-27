import { Canvas } from "@react-three/fiber";
import Banorte from "../banorte/banorte";
import ChatText from "../text/ChatText";
import { useState } from "react";

const Chat = () => {
    const [loadingBanorte, setLoadingBanorte] = useState(true)
    return(
        < div style={{position:"absolute",top:0, left:0, width:"100vw", height:"100vh", zIndex: 10}}>
            <Canvas 
                className="canvas"
                shadows
                camera={{position: [0,10.5,60], fov: 15}}
                color={"#ffffff"}
                style={{zIndex: 10}} 
                >
                    <Banorte loadingBanorte = {loadingBanorte}/>

            </Canvas>
            <ChatText loadingBanorte={loadingBanorte} setLoadingBanorte={setLoadingBanorte}/>
        </div>
    )
}

export default Chat;