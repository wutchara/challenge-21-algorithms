const inputs = [
    'micro soft',
    'that is what friend are for',
    'on the way of computer engineering',
];

const ignoreWords = ['i', 'of', 'the', 'on', 'at', 'for', 'with', 'a', 'an', 'in'];

const output = inputs.map(input => {
    const words = input.trim().toLowerCase().split(' ')
        .filter((w, i) => (i === 0 || !ignoreWords.includes(w)));
    return words.map(w => w[0].toUpperCase()).join('');
});

output.map((o, i) => {
    console.log(`Output: '${o}'`, '\t\t', ` ==> '${inputs[i]}'`);
});
