import devLog from "./devLog";

/**
 * Returns the amount of spinsLeft won when at the end of a spin
 *
 * @param fruit0 - The fruit result of reel 0
 * @param fruit0 - The fruit result of reel 1
 * @param fruit0 - The fruit result of reel 2
 * @returns spinsLeft won
 *
 * @example
 * An example of a win
 * ```
 * // Returns 50
 * endgame("CHERRY", "CHERRY", "CHERRY")
 * ```
 *
 * @example
 * An example of a loss
 * * ```
 * // Returns 0
 * endgame("CHERRY", "APPLE", "APPLE")
 * ```
 */
const endgame = (fruit0: string, fruit1: string, fruit2: string): number => {
  let spinsLeft = 0;

  devLog("ENDGAME RUN<<<<<<<<<<<<<<<<<<<<<<<<");

  // Check for 3 cherries
  if (fruit0 === "CHERRY" && fruit1 === "CHERRY" && fruit2 === "CHERRY") {
    spinsLeft = 50;
  }
  // Check for 2 cherries
  else if (fruit0 === "CHERRY" && fruit1 === "CHERRY") {
    spinsLeft = 40;
  }
  // Check for 3 apples
  else if (fruit0 === "APPLE" && fruit1 === "APPLE" && fruit2 === "APPLE") {
    spinsLeft = 20;
  }
  // Check for 2 apples
  else if (fruit0 === "APPLE" && fruit1 === "APPLE") {
    spinsLeft = 10;
  }
  // Check for 3 bananas
  else if (fruit0 === "BANANA" && fruit1 === "BANANA" && fruit2 === "BANANA") {
    spinsLeft = 15;
  }
  // Check for 2 bananas
  else if (fruit0 === "BANANA" && fruit1 === "BANANA") {
    spinsLeft = 5;
  }
  // Check for 3 lemons
  else if (fruit0 === "LEMON" && fruit1 === "LEMON" && fruit2 === "LEMON") {
    spinsLeft = 3;
  }

  if (spinsLeft > 0) {
    devLog(`spinsLeft won: ${spinsLeft}`);
  }

  // If no spinsLeft were won 0 is returned
  return spinsLeft;
};

export default endgame;
