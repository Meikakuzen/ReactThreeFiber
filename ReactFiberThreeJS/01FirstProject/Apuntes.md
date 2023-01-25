# REACT THREE FIBER (FIBER)

- Installation
> npm i three@0.145 @react-three/fiber@8.8

- react-three is a big system. @ means a big system, we call it scope
- You'll have a multiple paths from here
- Later I will install more packages from this scope 
-----
# SYNTAXIS

- In native Threejs we need to have a new instance of mesh, mesh.geometry and mesh.material

~~~js
const mesh = new THREE.Mesh()

mesh.geometry = new THREE.BoxGeometry(1,1,1)
mesh.material = new THREE.MeshBasicMaterial({color: 'red'})

scene.add(mesh)
~~~

- In Fiber looks like this

~~~js
<>
    <mesh>
        <boxGeometry />
        <meshBasicMaterial color="red">
    </mesh>
</>
~~~

- Change position and rotation 
- In Native Three will be

~~~js
mesh.position.set(1,2,3)
mesh.rotation.x= 0.5
~~~

- In Fiber will be like this

~~~js
<>
    <mesh position={[1,2,3]} rotation-x={0.5}>
        <boxGeometry />
        <meshBasicMaterial color="red">
    </mesh>
</>
~~~

- If I want to create a group just in Native Threejs will be

~~~js
const group = new THREE.Group()

scene.add(group)

group.add(mesh1, mesh2)
~~~

- In Fiber will be in this way.   add() is called automatically

~~~js
<>
    <group>
        <mesh position={[1,2,3]} rotation-x={0.5}>
            <boxGeometry />
            <meshBasicMaterial color="red">
        </mesh>
        <mesh position={[1,2,3]} rotation-x={0.5}>
            <sphereGeometry />
            <meshBasicMaterial color="orange">
        </mesh>
    </group>
</>
~~~

- attach atribute. 
- When the name ends with Geometry, it will assign it to the geometry property
- When the name ends with Material, it will assign it to the material property
- It's automatic, I don't have to use attach

~~~js
<>
    <group>
        <mesh position={[1,2,3]} rotation-x={0.5}>
            <boxGeometry attach="geometry" />
            <meshBasicMaterial attach="material" color="red">
        </mesh>
        <mesh position={[1,2,3]} rotation-x={0.5}>
            <sphereGeometry  attach="geometry"/>
            <meshBasicMaterial attach="material" color="orange">
        </mesh>
    </group>
</>
~~~

- The classes in three.js are called as a tags in FIBER (?)

~~~js
THREE.boxGeometry => <boxGeometry>
THREE.meshBasicMaterial => <meshBasicMaterial>
~~~

- The updates will work automatically
- Automatically generated primitive componens are in camelCase
- More specific components are in PascalCase

# FIRST SCENE

## Canvas 

> import { Canvas } from "@react-three/fiber"

- Render a torus

~~~js
import { Canvas } from "@react-three/fiber"

function App() {
 

  return (
      <Canvas>
        <mesh>
          <torusKnotGeometry />
          <meshNormalMaterial />
        </mesh>
      </Canvas>
  )
}

export default App
~~~

- For resize de canvas go to index.css

~~~css
html, body, #root{
    position: fixed;
    top: 0;
    left:0;
    width: 100%;
    height: 100%;
    overflow: hidden;
}
~~~
- With Fiber:
    - We dont have toi create a scene, WebGLRenderer, a PerspectiveCamera
    - We dont have to pull back from the center
    - Is responsive
    - We don't have to import mesh, meshNormalMaterial, etc
    - We don't have to reload the page
-----
# The **hooks from fiber** only works with components inside the canvas

- I use a component called Experience to render it inside the Canvas
~~~js
function App() {
 

  return (
      <Canvas>
        <Experience />
      </Canvas>
  )
}
~~~

- I changed the geometry and material from Experience

~~~js
const Experience = () => {


  return (
    <mesh>
        <sphereGeometry />
        <meshBasicMaterial />
   </mesh>
  )
}
~~~

- I can use the documentation to see the parameters that are avaliable for this geometry
- Will be radius (1 by default), widthSegments(32 by default), heightSegments(32 by default)
- The parameters of the constructor will be in the prop args with an array

~~~js
const Experience = () => {


  return (
    <mesh>
        <sphereGeometry  args={[1.5, 32,32]}/>
        <meshBasicMaterial />
   </mesh>
  )
}
~~~

## Be carefull not to update those values too much, cause it will means destroy and recreate the figure again

- If you want it bigger you can change the scale on the mesh
- In the material I can pass args too. Only one parameter inside the array, and is an object
~~~js
import React from 'react'

const Experience = () => {


  return (
    <mesh>
        <sphereGeometry  args={[1.5, 32,32]}/>
        <meshBasicMaterial args={[{ color: 'red', wireframe: true}]}/>
   </mesh>
  )
}

export default Experience
~~~

- You can do it in this way, but also you can use props as a parameters

~~~js
  return (
    <mesh>
        <sphereGeometry  args={[1.5, 32,32]}/>
        <meshBasicMaterial color="mediumpurple" wireframe />
   </mesh>
  )
~~~

- We can play with the position, rotation, and scale on the mesh
- scale = x,y,z
- If you put in just one value will be the x value

~~~js
  return (
    <mesh scale={[1.5, 1.5, 1.5]} position={[2, 0, 0]} rotation={Math.PI * 0.25}>
        <sphereGeometry  args={[1.5, 32,32]}/>
        <meshBasicMaterial color="mediumpurple" wireframe/>
   </mesh>
  )
~~~

- I will add another figure. I will change sphere to a box, and set the parameters quite different

~~~js
import React from 'react'

const Experience = () => {


  return (
    <>
    <mesh position-x={-2}>
        <sphereGeometry />
        <meshBasicMaterial color="orange" />
    </mesh>

    <mesh scale={1.5} position-x={2} rotation-y={Math.PI * 0.25}>
        <boxGeometry scale={1.5} />
        <meshBasicMaterial color="mediumpurple" wireframe/>
   </mesh>
    
    </>
  )
}

export default Experience
~~~

- I will add another figure
- If I dont put the - on Math.PI I will se the backface, so I can´t see anything

~~~js
<mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
       <meshBasicMaterial color="greenyellow"/>
   </mesh>
~~~

## ANIMATE

- Using the useFrame hook from Fiber to change the mesh's parameters
- To do that I will use a reference using useRef
- Always use **.current** for a ref

~~~js
import { useFrame } from '@react-three/fiber'
import {useRef} from 'react'

const Experience = () => {

  const cubeRef= useRef()

  useFrame(()=>{
    cubeRef.current.rotation.y += 0.01
  })

  return (
    <>
    <mesh position-x={-2}>
        <sphereGeometry />
        <meshBasicMaterial color="orange" />
    </mesh>

    <mesh scale={1.5} position-x={2} rotation-y={Math.PI * 0.25} ref={cubeRef}>
        <boxGeometry scale={1.5} />
        <meshBasicMaterial color="mediumpurple" wireframe/>
   </mesh>

   <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
       <meshBasicMaterial color="greenyellow"/>
   </mesh>
    
    </>
  )
}

export default Experience
~~~

- We are incrementing the rotation.y without takimg care of the frame rate
- We need to know how much time passed since the last frame
- The first parameter of useFrame is a state, the secons is deltaTime (you can use just delta)


~~~js
  useFrame((state, delta)=>{
    cubeRef.current.rotation.y += delta
  })
~~~
----

- We can group  objects with the Group class
- I will put the sphere and the cube inside a group and animated like a carroussel

~~~js
import { useFrame } from '@react-three/fiber'
import {useRef} from 'react'

const Experience = () => {

  const cubeRef= useRef()
  const groupRef= useRef()

  useFrame((state, delta)=>{
    cubeRef.current.rotation.y += delta
    groupRef.current.rotation.y += delta
  })

  return (
    <>
    <group ref={groupRef}>

        <mesh position-x={-2}>
            <sphereGeometry />
            <meshBasicMaterial color="orange" />
        </mesh>

        <mesh scale={1.5} position-x={2} rotation-y={Math.PI * 0.25} ref={cubeRef}>
            <boxGeometry scale={1.5} />
            <meshBasicMaterial color="mediumpurple" wireframe/>
      </mesh>

    </group>

   <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
       <meshBasicMaterial color="greenyellow"/>
   </mesh>
    
    </>
  )
}

export default Experience
~~~

## OrbitControls

- In the next lesson we will see another way to implement orbit controls faster and easer.
- Now, we will use a little bit difficult way
- OrbitControls is not a part of THREE.js
- We are going to import it and convert it into a declarative vresion

> import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

- Then import extend from fiber
- If I want to use OrbitControls as a tag/component I need extends

> import { extend } from '@react-three/fiber'

- You can use it in this way outside the component

~~~js
extend({OrbitControls})
~~~

- You can add it more with a ,
- Now the component OrbitControls is avaliable
- You will need 2 parameters: the camera and the DOM element
- I can find them in the state from useFrame
- You can use a console.log to see a lot of values inside state
- Two of those are camera and gl
- To using these values I need another THREE.js hook called **useThree**

# WITH useThree WE GET THE STATE

- I can use desestructuring to get the values
- I pass it to orbitControls with an array in args

~~~js
import { useFrame, extend, useThree } from '@react-three/fiber'
import {useRef} from 'react'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'


extend({OrbitControls})

const Experience = () => {

  const {camera, gl} = useThree()

  const cubeRef= useRef()
  const groupRef= useRef()

  useFrame((state, delta)=>{
    cubeRef.current.rotation.y += delta
    groupRef.current.rotation.y += delta
  })

  return (
    <>
    <orbitControls args={[camera, gl.domElement]} />


      <group ref={groupRef}>

          <mesh position-x={-2}>
              <sphereGeometry />
              <meshBasicMaterial color="orange" />
          </mesh>

          <mesh scale={1.5} position-x={2} rotation-y={Math.PI * 0.25} ref={cubeRef}>
              <boxGeometry scale={1.5} />
              <meshBasicMaterial color="mediumpurple" wireframe/>
          </mesh>

      </group>

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
          <planeGeometry />
        <meshBasicMaterial color="greenyellow"/>
      </mesh>
    
    
    </>
  )
}

export default Experience
~~~
----
## LIGHTS

- I use the tag directionalLight
- To see the lights I need to change to another material like StandardMaterial

~~~js
import { useFrame, extend, useThree } from '@react-three/fiber'
import {useRef} from 'react'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'


extend({OrbitControls})

const Experience = () => {

  const {camera, gl} = useThree()

  const cubeRef= useRef()
  const groupRef= useRef()

  useFrame((state, delta)=>{
    cubeRef.current.rotation.y += delta
    groupRef.current.rotation.y += delta
  })

  return (
    <>
    <orbitControls args={[camera, gl.domElement]} />

    <directionalLight />

      <group ref={groupRef}>

          <mesh position-x={-2}>
              <sphereGeometry />
              <meshStandardMaterial color="orange" />
          </mesh>

          <mesh scale={1.5} position-x={2} rotation-y={Math.PI * 0.25} ref={cubeRef}>
              <boxGeometry scale={1.5} />
              <meshStandardMaterial color="mediumpurple" wireframe={false}/>
          </mesh>

      </group>

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
          <planeGeometry />
        <meshStandardMaterial color="greenyellow"/>
      </mesh>
    
    
    </>
  )
}

export default Experience
~~~

- I can change the direction with the prop position

~~~js
<directionalLight position={[1,2,3]}/>
~~~

- I can change the color and the intensity

~~~js
<directionalLight position={[1,2,3]} color="red" intensity={1.5}/>
~~~

- I can use an ambientLight to normalize the light

~~~js
   <directionalLight position={[1,2,3]} color="red" intensity={1.5}/>
    <ambientLight intensity={0.5} />
~~~

----

## CUSTOM GEOMETRY

- Process:
    - Create a Float32Array
    - Put a bunch of values in it
    - Create a BufferAttribute out of this Float32Array
    - Add it to the attributes of the BufferGeometry

- I will create a new component as a CustomObject
- (see the comments)
- I change to bufferGeometry and put in the bufferAttribute

~~~js
const CustomObject = () => {

    const verticesCount = 10 * 3 // 30 positions, 10 triangle, 3 points vertex per triangle(x,y,z)
    const positions= new Float32Array(verticesCount * 3) //Each vertex needs 3 points(x,y,z)
    
    for(let i = 0; i < verticesCount * 3; i++){
        positions[i]= (Math.random() - 0.5) * 3 //Math random will go from -0.5 to positive 0.5. Random triangles
    }

  return (
    <mesh>
        <bufferGeometry>
            <bufferAttribute />
        </bufferGeometry>
        <meshBasicMaterial color="red"/>
    </mesh>
  )
}
~~~

- We need a way to specify that this attribute is the position attribute.
- We can do it with the attach attribute
- It will result as Geometry.attributes.position ( the dash will be a dot)
- I need to provide three more values
- How many vortices will have
    - count
- How many values for one vertex === 3 => x,y,z
    - itemSize
- How many positions, will be an array
    - array
~~~js
import { Mesh, MeshPhysicalMaterial } from "three"


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
~~~

- By default we can only see their frontside
- We need to set the side property to THREE.DoubleSide but we don't have access tho the THREE variable
- import all from THREE

> import * as THREE from 'three'

- 1:26:26
