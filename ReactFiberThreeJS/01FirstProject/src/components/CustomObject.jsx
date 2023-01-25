import { Mesh, MeshPhysicalMaterial } from "three"
import * as THREE from 'three'


const CustomObject = () => {

    const verticesCount = 10 * 3 // 30 positions, 10 triangle, 3 points vertex per triangle(x,y,z)
    const positions= new Float32Array(verticesCount * 3) //Each vertex needs 3 points(x,y,z)
    
    for(let i = 0; i < verticesCount * 3; i++){
        positions[i]= (Math.random() - 0.5) * 3 //Math random will go from -0.5 to positive 0.5. Random triangles
    }

  return (
    <mesh>
        <bufferGeometry>
            <bufferAttribute 
                attach="attributes-position" //it will be 
                count={verticesCount}
                itemSize={3} //(x,y,z)
                array={positions} //random, any weird figure can appear
            />
        </bufferGeometry>
        <meshBasicMaterial color="red"/>
    </mesh>
  )
}

export default CustomObject