'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');
let inputString = '';
let currentLine = 0;

process.stdin.on('data', function (inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function () {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'climbingLeaderboard' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY ranked
 *  2. INTEGER_ARRAY player
 */

function climbingLeaderboard(ranked, player) {
    // Write your code here
    let rankedMap = {};
    let prevRanke = 0;
    ranked.forEach((number, i) => {
        if (number !== ranked[i - 1])
            rankedMap[number] = ++prevRanke;
    })
    let scoreIndex = 0;
    let result = [];
    let rankIndex = ranked.length - 1;
    while (scoreIndex < player.length  && rankIndex>=0) {
        let currentRank = ranked[rankIndex];
         if (player[scoreIndex] < currentRank) {
            result.push(rankedMap[currentRank] + 1)
            scoreIndex++;
        }
        else if (player[scoreIndex] >= currentRank && player[scoreIndex] < ranked[rankIndex - 1]) {
            result.push(rankedMap[currentRank])
            scoreIndex++;
        }
        else if (rankIndex === 0) {
            if (player[scoreIndex] >= currentRank)
                result.push(rankedMap[currentRank]);
            else
                result.push(rankedMap[ranked[rankIndex - 1]])
            scoreIndex++;
        }
        else
            rankIndex--;
    }
    return result;
}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const rankedCount = parseInt(readLine().trim(), 10);

    const ranked = readLine().replace(/\s+$/g, '').split(' ').map(rankedTemp => parseInt(rankedTemp, 10));

    const playerCount = parseInt(readLine().trim(), 10);

    const player = readLine().replace(/\s+$/g, '').split(' ').map(playerTemp => parseInt(playerTemp, 10));

    const result = climbingLeaderboard(ranked, player);

    ws.write(result.join('\n') + '\n');

    ws.end();
}
