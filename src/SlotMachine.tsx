import {
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import useGame from "./stores/store";
import devLog from "./utils/functions/devLog";
import segmentToFruit from "./utils/functions/segmentToFruit";
// import endgame from "./utils/functions/endgame";
import { WHEEL_SEGMENT } from "./utils/constants";
import Reel from "./Reel";
import Button from "./Button";
// import Casing from "./Casing";
// import Bars from "./Bars";

interface ReelGroup extends THREE.Group {
  reelSegment?: number;
  reelPosition?: number;
  reelSpinUntil?: number;
  reelStopSegment?: number;
}

interface SlotMachineProps {
  value: (0 | 1 | 2 | 3 | 4 | 5 | 6 | 7)[];
}

const SlotMachine = forwardRef(({ value }: SlotMachineProps, ref) => {
  // const valuesUrl = useGame((state) => state.valuesUrl);
  const fruit0 = useGame((state) => state.fruit0);
  const fruit1 = useGame((state) => state.fruit1);
  const fruit2 = useGame((state) => state.fruit2);
  const setFruit0 = useGame((state) => state.setFruit0);
  const setFruit1 = useGame((state) => state.setFruit1);
  const setFruit2 = useGame((state) => state.setFruit2);
  // const receivedSegments = useGame((state) => state.receivedSegments);
  // const setReceivedSegments = useGame((state) => state.setReceivedSegments);
  // const setSparkles = useGame((state) => state.setSparkles);
  const phase = useGame((state) => state.phase);
  const start = useGame((state) => state.start);
  const end = useGame((state) => state.end);
  const addSpin = useGame((state) => state.addSpin);
  // const spinsLeft = useGame((state) => state.spinsLeft);
  const updateSpinsLeft = useGame((state) => state.updateSpinsLeft);
  const spins = useGame((state) => state.spins);
  const setWon = useGame((state) => state.setWon);
  const coffeti = useGame((state) => state.coffeti);
  const won = useGame((state) => state.won);
  const setCoffetiVisible = useGame((state) => state.setCoffetiVisible);
  const dataModal = useGame((state) => state.dataModal);
  const rewardModal = useGame((state) => state.rewardModal);
  const spinsLeft = useGame((state) => state.spinsLeft);
  // const fetchSegmentValues = async () => {
  //   try {
  //     const requestOptions = {
  //       method: "GET",
  //       headers: { "Content-Type": "application/json" },
  //     };
  //     const response = await fetch(valuesUrl, requestOptions);
  //     if (response.ok) {
  //       const data = await response.json();

  //       setReceivedSegments(data);
  //       console.log(data[0]);
  //     } else {
  //       console.error("Failed to fetch scratch card: ", response.status);
  //     }
  //   } catch (error) {
  //     console.error("Error while fetching scratch card: ", error);
  //   }
  // };

  useEffect(() => {
    devLog("PHASE: " + phase);

    if (
      fruit0 === fruit1 &&
      fruit1 === fruit2 &&
      fruit0 === fruit2 &&
      fruit0 !== ""
    ) {
      console.log("WON");
      setWon(true);
      setCoffetiVisible(true);
      setTimeout(() => {
        rewardModal(true);
        setCoffetiVisible(false);
      }, 3000);
      coffeti.current.goToAndPlay(0, true);
    }

    // setSparkles(true);
    // setTimeout(() => {
    //   setSparkles(false);
    // }, 1000);
  }, [phase, fruit0, fruit1, fruit2]);

  const reelRefs = [
    useRef<ReelGroup>(null),
    useRef<ReelGroup>(null),
    useRef<ReelGroup>(null),
  ];

  const spinSlotMachine = () => {
    start();
    const min = 15;
    const max = 30;
    const getRandomStopSegment = () =>
      Math.floor(Math.random() * (max - min + 1)) + min;

    const spinReel = (reelIndex: number) => {
      const reel = reelRefs[reelIndex].current;
      if (reel) {
        // Reset rotation
        reel.rotation.x = 0;
        // Reset all attributes
        reel.reelSegment = 0;
        reel.reelPosition = 0;
        reel.reelSpinUntil = 0;
        reel.reelStopSegment = 0;
        // Clear fruits from previous spins
        setFruit0("");
        setFruit1("");
        setFruit2("");
        let stopSegment = getRandomStopSegment();
        console.log("stopSegment: " + stopSegment);
        console.log("spins: " + spins);
        if (spins > 3) {
          if (reelIndex == 0) {
            stopSegment = 19;
          }
          if (reelIndex == 1) {
            stopSegment = 26;
          }
          if (reelIndex == 2) {
            stopSegment = 22;
          }
        }
        devLog(`Stop segment of reel ${reelIndex}: ${stopSegment}`);

        reel.reelSpinUntil = stopSegment;
      }
    };

    spinReel(0);
    spinReel(1);
    spinReel(2);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        if (phase !== "spinning") {
          if (spins < 5) {
            // fetchSegmentValues();
            spinSlotMachine();
            addSpin();
            updateSpinsLeft(-1);
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [phase]);

  useFrame(() => {
    for (let i = 0; i < reelRefs.length; i++) {
      const reel = reelRefs[i].current;
      if (reel) {
        if (reel.reelSpinUntil !== undefined) {
          if (reel.reelSegment === undefined) {
            reel.reelSegment = 0;
          }

          const targetRotationX =
            (reel.reelSpinUntil - reel.reelSegment) * WHEEL_SEGMENT;
          const rotationSpeed = 0.1;

          if (reel.rotation.x < targetRotationX) {
            reel.rotation.x += rotationSpeed;
            reel.reelSegment = Math.floor(reel.rotation.x / WHEEL_SEGMENT);
          } else if (reel.rotation.x >= targetRotationX) {
            // The reel has stopped spinning at the desired segment
            setTimeout(() => {
              end();
            }, 1000);
            const fruit = segmentToFruit(i, reel.reelSegment);

            if (fruit) {
              switch (i) {
                case 0:
                  setFruit0(fruit);
                  break;
                case 1:
                  setFruit1(fruit);
                  break;
                case 2:
                  setFruit2(fruit);
                  break;
              }
            }

            devLog(
              `Reel ${i + 1} stopped at segment ${reel.reelSegment} ${fruit}`
            );
            reel.reelSpinUntil = undefined; // Reset reelSpinUntil to stop further logging
          }
        }
      }
    }
  });

  useImperativeHandle(ref, () => ({
    reelRefs,
  }));

  // useImperativeHandle(ref, () => ({
  //   reelRefs: reelRefs.map((ref) => ref.current),
  // }));

  const [buttonZ, setButtonZ] = useState(0);
  const [buttonY, setButtonY] = useState(-13);

  const [textZ, setTextZ] = useState(1.6);
  const [textY, setTextY] = useState(-14);

  return (
    <>
      {/* <Casing
        scale={[25, 25, 25]}
        position={[0, -12, 13.8]}
        rotation={[0.2,  Math.PI, 0]}
      /> */}
      {/* <Bars /> */}
      <Reel
        ref={reelRefs[0]}
        value={value[0]}
        map={0}
        position={[-8, 0, 0]}
        rotation={[0, 0, 0]}
        scale={[12, 10, 10]}
        reelSegment={0}
      />
      <Reel
        ref={reelRefs[1]}
        value={value[1]}
        map={1}
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
        scale={[12, 10, 10]}
        reelSegment={0}
      />
      <Reel
        ref={reelRefs[2]}
        value={value[2]}
        map={2}
        position={[8, 0, 0]}
        rotation={[0, 0, 0]}
        scale={[12, 10, 10]}
        reelSegment={0}
      />
      <Button
        scale={[0.055, 0.045, 0.045]}
        position={[0, buttonY, buttonZ]}
        rotation={[-Math.PI / 8, 0, 0]}
        onClick={() => {
          if (won) {
            rewardModal(true);
          }
          if (phase !== "spinning" && !won) {
            if (spins < 5 && spinsLeft > 0) {
              spinSlotMachine();
              addSpin();
              updateSpinsLeft(-1);
            } else {
              if (spins == 0) {
                dataModal(true);
              }
            }
          }
        }}
        onPointerDown={() => {
          setButtonZ(-1);
          setButtonY(-13.5);
        }}
        onPointerUp={() => {
          setButtonZ(0);
          setButtonY(-13);
        }}
      />
      <Text
        color="black"
        anchorX="center"
        anchorY="middle"
        position={[0, textY, textZ]}
        rotation={[-Math.PI / 8, 0, 0]}
        fontSize={2}
        font="./fonts/nickname.otf"
        onPointerDown={() => {
          setTextZ(1.3);
          setTextY(-14.1);
        }}
        onPointerUp={() => {
          setTextZ(1.6);
          setTextY(-14);
        }}
      >
        {phase === "idle"
          ? `${
              spinsLeft == 0
                ? `${won ? "Claim Now" : "Spin Now"}`
                : `${won ? "Claim Now" : "SPIN"}`
            }`
          : "Spinning"}
      </Text>
    </>
  );
});

export default SlotMachine;
