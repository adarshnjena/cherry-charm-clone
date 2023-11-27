// Copyright (c) 2023 Michael Kolesidis <michael.kolesidis@gmail.com>
// Licensed under the GNU Affero General Public License v3.0.
// https://www.gnu.org/licenses/gpl-3.0.html

import { useRef, useEffect, useState } from "react";
import useGame from "../stores/store";
import CustomModal from "./modal/Modal";
import HelpButton from "./helpButton/HelpButton";
import coffetiFile from "../animations/coffeti.json";
import Lottie from "lottie-react";
import "./style.css";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Link,
} from "@nextui-org/react";
import axios from "axios";
import toast from "react-hot-toast";

const Interface = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onOpenChange: onOpenChange2,
  } = useDisclosure();

  // const phase = useGame((state) => state.phase);
  const setCoffeti = useGame((state) => state.setCoffeti);
  const coffeti = useGame((state) => state.coffeti);
  // const won = useGame((state) => state.won);
  const coffetiVisible = useGame((state) => state.coffetiVisible);
  // const setWon = useGame((state) => state.setWon);
  const modal = useGame((state) => state.modal);
  const spins = useGame((state) => state.spins);
  const setDataModal = useGame((state) => state.setDataModal);
  const setRewardModal = useGame((state) => state.setRewardModal);
  const spinsLeft = useGame((state) => state.spinsLeft);
  const updateSpinsLeft = useGame((state) => state.updateSpinsLeft);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [validNumber, setValidNumber] = useState(true);

  const handelSubmit = async () => {
    const data = {
      name,
      phone,
    };
    const response = await axios.post("https://formspree.io/f/xrgwwplr", data);
    console.log(response);
    if (response.status === 200) {
      updateSpinsLeft(5);
      toast.success("Try Out Your Luck !!");
    }
  };

  useEffect(() => {
    if (phone.length === 10) {
      setValidNumber(true);
    } else {
      setValidNumber(false);
    }
  }, [phone]);

  setDataModal(onOpen);
  setRewardModal(onOpen2);
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
      {modal && <CustomModal />}

      {/* Logo */}
      <a
        href="https://github.com/michaelkolesidis/cherry-charm"
        target="_blank"
      >
        <img className="logo" src="./images/logo.svg" alt="" />
      </a>

      <div className="interface">
        {/* spinsLeft */}
        <div className="spinsLeft-section">
          <div className="spinsLeft-number mb-2">
            {spinsLeft}
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
          className={`absolute bottom-0 ${coffetiVisible ? "z-50" : "z-0"} `}
          animationData={coffetiFile}
          height={10}
          width={10}
          loop={false}
          onComplete={() => {
            coffeti.current.goToAndStop(0, false);
            // setWon(false);
          }}
          lottieRef={coffetiRef}
        />
      </div>
      <>
        <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Modal Title
                </ModalHeader>
                <ModalBody>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam pulvinar risus non risus hendrerit venenatis.
                    Pellentesque sit amet hendrerit risus, sed porttitor quam.
                  </p>
                  <Input
                    isRequired
                    type="name"
                    label="Name"
                    className="max-w"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Input
                    isRequired
                    type="number"
                    inputMode="numeric"
                    label="Phone Number"
                    className="max-w"
                    isInvalid={!validNumber && phone.length > 0}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    style={{ backgroundColor: "#25C07F" }}
                    onPress={() => {
                      handelSubmit();
                      onClose();
                    }}
                  >
                    Spins Now !!
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
      <>
        <Modal backdrop="blur" isOpen={isOpen2} onOpenChange={onOpenChange2}>
          <ModalContent>
            <>
              <ModalHeader className="flex flex-col gap-1">
                Congratulations !!
              </ModalHeader>
              <ModalBody>
                <p>
                  Congratulations, you have won a free ticket to Sunburn Goa
                  2023 when you book with One Click Stays.<br></br>To claim your
                  reward, visit the link below :-
                  <Link
                    href="https://www.oneclickstays.com"
                    className=" underline"
                  >
                    {" "}
                    www.oneclickstays.com
                  </Link>{" "}
                  <br></br>
                  <span className=" text-xs">Terms & Conditions apply </span>
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  style={{ backgroundColor: "#25C07F" }}
                  onPress={() => {
                    window.open("https://www.oneclickstays.com", "_blank");
                  }}
                >
                  Visit OnClickStays
                </Button>
              </ModalFooter>
            </>
          </ModalContent>
        </Modal>
      </>
    </>
  );
};

export default Interface;
