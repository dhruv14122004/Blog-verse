import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';

const SpiderLogo = (props) => {
    const mesh = useRef();
    const [hovered, setHover] = useState(false);
    const [active, setActive] = useState(false);

    useFrame((state, delta) => {
        if (mesh.current) {
            // Continuous rotation
            mesh.current.rotation.y += delta * 0.2;
            // Float intrinsic
            mesh.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2;
        }
    });

    return (
        <group {...props}>
            <mesh
                ref={mesh}
                scale={active ? 1.5 : 1}
                onClick={() => setActive(!active)}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
            >
                <octahedronGeometry args={[1, 0]} />
                <meshStandardMaterial
                    color={hovered ? '#ff2d2d' : '#1f6fff'}
                    wireframe={true}
                    emissive={hovered ? '#ff2d2d' : '#1f6fff'}
                    emissiveIntensity={2}
                />
            </mesh>
            {/* Core */}
            <mesh scale={0.5}>
                <dodecahedronGeometry args={[1, 0]} />
                <meshStandardMaterial color="#0b0b0f" roughness={0.2} metalness={0.8} />
            </mesh>
        </group>
    );
};

const SceneContent = () => {
    const groupRef = useRef();

    useEffect(() => {
        const handleScroll = () => {
            if (groupRef.current) {
                // Rotate entire group based on scroll Y
                const scrollY = window.scrollY;
                groupRef.current.rotation.y = scrollY * 0.001;
                groupRef.current.position.z = -scrollY * 0.002; // Move slightly away
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <group ref={groupRef}>
            <SpiderLogo position={[2, 0, 0]} />
            <SpiderLogo position={[-2, 1, -2]} scale={0.5} />
            <SpiderLogo position={[0, -2, -1]} scale={0.8} />
        </group>
    );
};

const SpiderScene = () => {
    return (
        <div className="fixed inset-0 w-full h-full -z-10 bg-[#0b0b0f]">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#7a00ff" />

                <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                    <SceneContent />
                </Float>

                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <Environment preset="city" />
            </Canvas>
        </div>
    );
};

export default SpiderScene;
