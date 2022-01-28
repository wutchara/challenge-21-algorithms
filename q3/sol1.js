const inputData = {
  friendNumber: 5,
  actions: [
    [2, 3],
    [4, 5],
    [2, 5],
    [1, 3],
    [2, 1],
  ],
};


function validateInput(number, actions) {
  // validate number
  if (number > 1000 || number <= 2) {
    throw 'Invalid Number of Friends.  (2 < n <= 1000)';
  }

  const actionNumber = actions.length;
  if (number !== actionNumber) {
    throw 'Friend and action is inconsistent';
  }

  // validate actions
  const low = 1;
  const hight = number;
  const range = [low, hight];
  actions.map(action => {
    const inRange = (value, [low, hight]) => value >= low && value <= hight;
    if (action.length !== 2 || !inRange(action[0], range) || !inRange(action[1], range)) {
      throw 'Invalid Action.';
    }
  });
}

try {
  console.log('Start.........');
  validateInput(inputData.friendNumber, inputData.actions);

  const result = {
    count: {},
    target: {
      chooses: [],// contains 2 items
      index: '0',
      count: 0,
    },
  };

  // get the most popular
  inputData.actions.map((action) => {
    action.map((a) => {
      const key = '' + a;
      const count = (result.count[key] || 0) + 1;
      result.count[key] = count;

      if (count > result.target.count) {
        // change target
        result.target = {
          chooses: [],
          index: key,
          count: count,
        };

      }
    });
  });

  // find choose => due to event loop in .map()
  result.target.chooses = inputData.actions[+result.target.index - 1];

  // find the lest popular
  const second = (result.count[result.target.chooses[0] + ''] < result.count[result.target.chooses[1] + ''] ? result.target.chooses[0] : result.target.chooses[1]) + '';

  console.log('result', result);
  console.log('=======================================');
  console.log('the number of the most popular in friend group is ', result.target.index);
  console.log('position of friend who lesses popular in friend group is ', second);
  console.log('=======================================');
} catch (e) {
  console.error(e);
}
