import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Float } from '@react-three/drei';
import { usePortal } from '../../context/PortalContext';

// Define the 3D Room Box
const SpaRoom = ({ position, name, status, size = [4, 1.5, 4] }) => {
  // Color logic
  let color = '#90EE90'; // light green: available
  if (status === 'occupied') color = '#ff6b6b'; // red
  if (status === 'cleaning') color = '#FFD700'; // yellow

  return (
    <group position={position}>
      {/* Floor */}
      <mesh position={[0, -size[1]/2, 0]} receiveShadow>
        <boxGeometry args={[size[0], 0.2, size[2]]} />
        <meshStandardMaterial color={color} opacity={0.6} transparent roughness={0.1} />
      </mesh>
      
      {/* Walls */}
      <mesh position={[0, 0, -size[2]/2 + 0.1]} castShadow>
        <boxGeometry args={[size[0], size[1], 0.2]} />
        <meshPhysicalMaterial color="#ffffff" clearcoat={1} transmission={0.4} thickness={0.5} opacity={0.3} transparent />
      </mesh>
      <mesh position={[-size[0]/2 + 0.1, 0, 0]} castShadow>
        <boxGeometry args={[0.2, size[1], size[2]]} />
        <meshPhysicalMaterial color="#ffffff" clearcoat={1} transmission={0.4} thickness={0.5} opacity={0.3} transparent />
      </mesh>
      
      {/* Status glowing orb inside */}
      <Float speed={2} rotationIntensity={0} floatIntensity={0.5}>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshPhysicalMaterial color={color} emissive={color} emissiveIntensity={0.8} />
        </mesh>
      </Float>

      {/* Floating 3D Text Label */}
      <Text position={[0, size[1]/2 + 0.5, 0]} fontSize={0.6} color="#ffffff" anchorX="center" anchorY="middle">
        {name}
      </Text>
      <Text position={[0, size[1]/2 + 0.1, 0]} fontSize={0.3} color={color} anchorX="center" anchorY="middle">
        {status.toUpperCase()}
      </Text>
    </group>
  );
};

export const RoomsMap = () => {
  const { activeTimers } = usePortal();

  // Helper to determine status from the global Timers arrays
  const getRoomStatus = (roomId) => {
    // Check if the timer is actively assigned to this room
    const isActive = activeTimers.some(timer => timer.roomId === roomId && timer.timeLeft > 0);
    // Hardcode room 3 to cleaning for visual testing variety
    if (roomId === 3) return 'cleaning';
    return isActive ? 'occupied' : 'available';
  };

  return (
    <div className="animate-fade-in w-full h-[80vh] relative rounded-3xl overflow-hidden glass shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/20">
      
      <div className="absolute top-8 left-8 z-10 pointer-events-none">
        <h2 className="text-3xl font-serif text-white tracking-widest uppercase mb-2 drop-shadow-lg">Spa Rooms Nexus</h2>
        <p className="text-white/60 font-medium tracking-widest text-sm">Interactive Isometric Floor Plan</p>
        
        <div className="mt-6 flex flex-col gap-3 bg-black/40 p-4 rounded-xl backdrop-blur-md">
           <div className="flex items-center gap-3"><span className="w-4 h-4 rounded bg-[#90EE90]" /> <span className="text-white text-sm">Available</span></div>
           <div className="flex items-center gap-3"><span className="w-4 h-4 rounded bg-[#ff6b6b]" /> <span className="text-white text-sm">In Treatment</span></div>
           <div className="flex items-center gap-3"><span className="w-4 h-4 rounded bg-[#FFD700]" /> <span className="text-white text-sm">Cleaning</span></div>
        </div>
      </div>

      <Canvas camera={{ position: [0, 10, 15], fov: 45 }} shadows>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 20, 10]} intensity={1.5} castShadow shadow-mapSize={[1024, 1024]} />
        <pointLight position={[0, 5, 0]} intensity={0.5} color="#ffa2cc" />
        
        <OrbitControls enableZoom={true} enablePan={true} maxPolarAngle={Math.PI / 2.5} minPolarAngle={Math.PI / 6} />

        <group position={[0, -1, 0]}>
           {/* Room 1: Linked to timer */}
           <SpaRoom position={[-4.5, 0, -4.5]} name="Facial Room 1" status={getRoomStatus(1)} />
           {/* Room 2 */}
           <SpaRoom position={[4.5, 0, -4.5]} name="Facial Room 2" status={getRoomStatus(2)} />
           {/* Room 3 */}
           <SpaRoom position={[-4.5, 0, 4.5]} name="Massage 1" status={getRoomStatus(3)} />
           {/* Room 4 */}
           <SpaRoom position={[4.5, 0, 4.5]} name="Massage 2" status={getRoomStatus(4)} />
           
           {/* Hallway Floor logic */}
           <mesh position={[0, -0.76, 0]} receiveShadow>
             <boxGeometry args={[15, 0.1, 15]} />
             <meshStandardMaterial color="#2d2d2d" roughness={0.8} />
           </mesh>
        </group>
      </Canvas>
    </div>
  );
};
