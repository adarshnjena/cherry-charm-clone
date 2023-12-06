import { useRef } from "react";
// import { OrbitControls } from "@react-three/drei";
// import { Perf } from "r3f-perf";
import Lights from "./lights/Lights";
import SlotMachine from "./SlotMachine";

const Game = () => {
  const slotMachineRef = useRef();

  return (
    <>
      {/* <Perf position="top-right" /> */}
      {/* <OrbitControls /> */}
      <Lights />
      <SlotMachine ref={slotMachineRef} value={[1, 2, 3]} />
    </>
  );
};

export default Game;
