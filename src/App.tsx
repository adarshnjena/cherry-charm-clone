import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { NextUIProvider } from "@nextui-org/react";
import Interface from "./interface/Interface";
import Game from "./Game";
import { Toaster } from "react-hot-toast";

const App = () => {
  const [windowWidth] = useState(window.innerWidth);
  const cameraPositionZ = windowWidth > 500 ? 30 : 40;

  return (
    <>
      <Toaster position="top-left" />
      <NextUIProvider>
        <Interface />
      </NextUIProvider>
      <Canvas
        camera={{ fov: 85, position: [0, 0, cameraPositionZ] }}
        style={{
          background: "url(/images/bg.png ) no-repeat center center fixed",
        }}
      >
        <Game />
      </Canvas>
    </>
  );
};

export default App;
