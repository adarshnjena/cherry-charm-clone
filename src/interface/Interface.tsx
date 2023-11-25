// Copyright (c) 2023 Michael Kolesidis <michael.kolesidis@gmail.com>
// Licensed under the GNU Affero General Public License v3.0.
// https://www.gnu.org/licenses/gpl-3.0.html

import { useRef,  useEffect } from "react";
import useGame from "../stores/store";
import Modal from "./modal/Modal";
import HelpButton from "./helpButton/HelpButton";
import coffetiFile from "../animations/coffeti.json";
import Lottie from "lottie-react";
import "./style.css";

const Interface = () => {
  // const phase = useGame((state) => state.phase);
  const setCoffeti = useGame((state) => state.setCoffeti);
  const coffeti = useGame((state) => state.coffeti);
  const won = useGame((state) => state.won);
  // const setWon = useGame((state) => state.setWon);
  const modal = useGame((state) => state.modal);
  const spins = useGame((state) => state.spins);
  const coffetiRef = useRef<any>(null);
  setCoffeti(coffetiRef);
  useEffect(() => {
    coffetiRef.current.stop;
  });

  return (
    <>
      {/* Help Button */}
      <HelpButton />
      {/* <button
        className="help-button"
        onClick={() => {
          coffeti.current.goToAndPlay(0, true);
          setCoffetiAnimationPlay(true);
        }}
      >
        Button
      </button> */}
      {/* Modal */}
      {modal && <Modal />}

      {/* Logo */}
      <a
        href="https://github.com/michaelkolesidis/cherry-charm"
        target="_blank"
      >
        {/* <img className="logo" src="./images/logo.png" alt="" /> */}
      </a>

      <div className="interface">
        {/* Coins */}
        <div className="coins-section">
          <div className="coins-number mb-2">
            {5 - spins}
            <span className="absolute bottom-0 right-0 text-sm">
              Spins Left
            </span>
          </div>
        </div>

        {/* Spins */}
        <div className="spins-section">
          <div className="spins-number mb-2">
            {" "}
            {spins}
            <span className="absolute bottom-0 left-0 text-sm">Spins Used</span>
          </div>
        </div>

        {/* Phase */}
        {/* <div>{phase.toUpperCase()}</div> */}
      </div>
      <div>
        <Lottie
          className={`absolute bottom-0 ${won ? "z-50" : "z-0"} `}
          animationData={coffetiFile}
          height={10}
          width={10}
          loop={false}
          onComplete={() => {
            coffeti.current.goToAndStop(0, false);
          }}
          lottieRef={coffetiRef}
        />
      </div>
    </>
  );
};

export default Interface;
