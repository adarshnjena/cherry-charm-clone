import { create } from "zustand";
// import { subscribeWithSelector } from "zustand/middleware";
import devLog from "../utils/functions/devLog";
import { Fruit } from "../utils/enums";

type State = {
  coffeti: any;
  setCoffeti: (value: any) => void;

  dataModal: any;
  setDataModal: (value: any) => void;

  rewardModal: any;
  setRewardModal: (value: any) => void;

  coffetiVisible: boolean;
  setCoffetiVisible: (value: boolean) => void;

  won: boolean;
  setWon: (value: boolean) => void;
  // Endpoint
  // valuesUrl: string;

  // Modal
  modal: boolean;
  setModal: (isOpen: boolean) => void;

  // spinsLeft
  spinsLeft: number;
  updateSpinsLeft: (amount: number) => void;

  // Fruits (results)
  fruit0: Fruit | "";
  setFruit0: (fr: Fruit | "") => void;
  fruit1: Fruit | "";
  setFruit1: (fr: Fruit | "") => void;
  fruit2: Fruit | "";
  setFruit2: (fr: Fruit | "") => void;

  // Segments
  // receivedSegments: number[];
  // setReceivedSegments: (segments: number[]) => void;

  // Games
  spins: number;
  addSpin: () => void;
  // wins: number;
  // won: () => void;
  // losses: number;
  // lost: () => void;

  // Sparkles
  // sparkles: boolean;
  // setSparkles: (value: boolean) => void;

  // Time
  startTime: number;
  endTime: number;

  // Phase
  phase: "idle" | "spinning";
  start: () => void;
  end: () => void;

  // First time
  firstTime: boolean;
  setFirstTime: (isFirstTime: boolean) => void;
};

const useGame = create<State>((set) => ({
  /**
   * Endpoint
   * (different endpoints for running locally and for deployment)
   */
  // valuesUrl: /(localhost)/.test(window.location.href)
  //   ? "http://localhost:4000/values"
  //   : "https://cherry-charm.onrender.com/values",

  /**
   *  Modal
   *  (is the help modal open)
   */
  modal: false,
  setModal: (isOpen: boolean) => {
    set((state) => ({
      ...state,
      modal: isOpen,
    }));
  },

  /**
   * Data model
   *
   */
  dataModal: {},
  setDataModal: (value: any) => {
    set((state) => ({
      ...state,
      dataModal: value,
    }));
  },

  /**
   * Reward model
   *
   */
  rewardModal: {},
  setRewardModal: (value: any) => {
    set((state) => ({
      ...state,
      rewardModal: value,
    }));
  },
  /**
   * spinsLeft
   *
   */
  spinsLeft: 0,
  updateSpinsLeft: (amount: number) => {
    set((state) => ({
      ...state,
      spinsLeft: state.spinsLeft + amount,
    }));
  },

  won: false,
  setWon: (value: boolean) => {
    set((state) => ({
      ...state,
      won: value,
    }));
  },

  /**
   * Coffeti
   *
   */
  coffetiVisible: false,
  setCoffetiVisible: (value: boolean) => {
    set((state) => ({
      ...state,
      coffetiVisible: value,
    }));
  },
  /**
   * Fruits
   *
   */
  fruit0: "",
  setFruit0: (fr: Fruit | "") => {
    set((state) => ({
      ...state,
      fruit0: fr,
    }));
  },
  fruit1: "",
  setFruit1: (fr: Fruit | "") => {
    set((state) => ({
      ...state,
      fruit1: fr,
    }));
  },
  fruit2: "",
  setFruit2: (fr: Fruit | "") => {
    set((state) => ({
      ...state,
      fruit2: fr,
    }));
  },

  coffeti: {},
  setCoffeti: (value: any) => {
    set((state) => ({
      ...state,
      coffeti: value,
    }));
  },

  /**
   * Received segments
   *
   */
  // receivedSegments: [-1, -1, -1],
  // setReceivedSegments: (segments: number[]) => {
  //   set(() => {
  //     return {
  //       receivedSegments: segments,
  //     };
  //   });
  // },

  /**
   * Games
   *
   */
  spins: 0,
  addSpin: () => {
    set((state) => ({
      ...state,
      spins: state.spins + 1,
    }));
  },
  // wins: 0,
  // won: () => {
  //   set((state) => {
  //     return {
  //       wins: state.wins + 1,
  //     };
  //   });
  // },
  // losses: 0,
  // lost: () => {
  //   set((state) => {
  //     return {
  //       losses: state.losses + 1,
  //     };
  //   });
  // },

  /**
   * Sparkles
   */
  // sparkles: false,
  // setSparkles: (value: boolean) => {
  //   set(() => {
  //     return {
  //       sparkles: value,
  //     };
  //   });
  // },

  /**
   * Time
   */
  startTime: 0,
  endTime: 0,

  /**
   * Phases
   * The phase of the game
   */
  phase: "idle",
  start: () => {
    set((state) => {
      if (state.phase === "idle") {
        return { ...state, phase: "spinning", startTime: Date.now() };
      }
      return state;
    });
  },
  end: () => {
    set((state) => {
      if (state.phase === "spinning") {
        const endTime = Date.now();
        const startTime = state.startTime;
        const elapsedTime = endTime - startTime;
        devLog(`Time spinning: ${elapsedTime / 1000} seconds`);
        return { ...state, phase: "idle", endTime: endTime };
      }
      return state;
    });
  },

  /**
   * Other
   *
   */
  firstTime: true,
  setFirstTime: (isFirstTime: boolean) => {
    set((state) => ({
      ...state,
      firstTime: isFirstTime,
    }));
  },
}));

export default useGame;
