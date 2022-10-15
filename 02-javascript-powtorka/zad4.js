'use strict';
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const yearOnEarthInSeconds = 31557600;

const howLongYearOnPlanet = {
  Merkury: 0.2408467 * yearOnEarthInSeconds,
  Wenus: 0.61519726 * yearOnEarthInSeconds,
  Mars: 1.8808158 * yearOnEarthInSeconds,
  Jowisz: 11.862615 * yearOnEarthInSeconds,
  Saturn: 29.447498 * yearOnEarthInSeconds,
  Uran: 84.016846 * yearOnEarthInSeconds,
  Neptun: 164.79132 * yearOnEarthInSeconds,
  Ziemia: yearOnEarthInSeconds,
};

rl.on('line', (time) => {
  rl.on('line', (planet) => {
    if (!Object.keys(howLongYearOnPlanet).some((key) => key === planet))
      console.log('BŁĄD');
    else {
      console.log(
        Math.round(
          (time / howLongYearOnPlanet[planet] + Number.EPSILON) * 100,
        ) / 100,
      );
    }
  });
});
