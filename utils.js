import {words} from './words'


export function getRandomWord() {
    const randomWord = Math.floor(Math.random() * words.length)
    return words[randomWord]


}


export function getFarewellText(color) {
    const options = [
        `Farewell, ${color}`,
        `Adios, ${color}`,
        `R.I.P., ${color}`,
        `We'll miss you, ${color}`,
        `Oh no, not ${color}!`,
        `${color} bites the dust`,
        `Gone but not forgotten, ${color}`,
        `The end of ${color} as we know it`,
        `Off into the sunset, ${color}`,
        `${color}, it's been real`,
        `${color}, your watch has ended`,
        `${color} has left the building`
    ];

    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
}