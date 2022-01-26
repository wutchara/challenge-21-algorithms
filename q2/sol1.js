// node sol1.js {{line}} {{ACTION_1}} {{ACTION_2}} {{ACTION_3}} ......
// Example: 'node .\sol1.js 2 ab cbabcaccc'

const myArgs = process.argv.slice(2);
console.log('myArgs: ', myArgs);

const lines = Number(myArgs[0]);
const actions = myArgs.slice(1).map(a => a.trim().toLocaleLowerCase());
console.log('lines: ', lines);
console.log('actions: ', actions);

function validateLine(lines) {
    if (isNaN(lines) || lines <= 0 || lines > 100) {
        throw 'Invalid the number of lines';
    }
}

function validateNumberLineAction(lines, actions) {
    if (actions.length !== lines) {
        throw 'Number of Line and Actions are inconsistent';
    }
}

function validateActions(actions) {
    const allowActions = ['a', 'b', 'c'];
    actions.map(action => {
        for (const x of action) {
            if (!allowActions.includes(x)) {
                throw 'Invalid action: ' + action;
            }
        }
    });
}

function validateInput(lines, actions) {
    validateLine(lines);
    validateNumberLineAction(lines, actions);
    validateActions(actions);
}

function swapPosition(ballPosition, from, to) {
    const temp = [...ballPosition];
    temp[from] = ballPosition[to];
    temp[to] = ballPosition[from];

    return temp;
}

try {
    validateInput(lines, actions);

    const ballPosition = [1, 0, 0];
    const actionPositionSet = {
        'a': [0, 1],
        'b': [1, 2],
        'c': [0, 2],
    };

    // Working
    console.log('=======================================');
    actions.map(actionSet => {
        let currentPosition = [...ballPosition];
        for(const action of actionSet) {
            currentPosition = swapPosition(currentPosition, ...actionPositionSet[action]);
        }

        // Display the last position
        console.log(`Action: '${actionSet}'`, '\t', `===>  ${currentPosition.findIndex(p => p === 1) + 1}`);
    });
    console.log('=======================================');
} catch (e) {
    console.error(e);
}
