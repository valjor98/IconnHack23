import { Environment, OrbitControls } from "@react-three/drei";
import {Model as Piso} from '../../models/piso'
import {Model as Speaking} from '../../models/speaking'


const Banorte = ({loadingBanorte}) => {
    return(
        <>
            <ambientLight intensity={0.5}/>
            <OrbitControls enableZoom={false} enablePan={false} enableDamping={false} maxAzimuthAngle={0} minAzimuthAngle={0} maxPolarAngle={Math.PI / 2 - Math.PI / 6} minPolarAngle={Math.PI / 2 - Math.PI / 6}></OrbitControls>
            <group position={[-6.5, -4, 0]}>
            <Speaking loadingBanorte = {loadingBanorte} position={[1,-4,-5]}/>
                <Piso position={[7, -5, -10]}/>
            </group>
        </>
    )
}

export default Banorte;