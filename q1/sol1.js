const inputs = ['pea', 'pear', 'apple', 'for', 'april', 'apendix', 'peace', 1];
console.log('inputs', inputs);

// find maximum prefix
const prefixMax = {};
for (const input of inputs) {
    if (typeof input === 'string') {
        if (!prefixMax[input[0]]) {
            prefixMax[input[0]] = {};
        }
        let current = prefixMax[input[0]];
        for(const char of input.slice(1)) {// O(n - 1)
            if (!current[char]) {
                current[char] = {};
            }
            current = current[char];
        }
    }
}// O(n^2)
// console.log('prefixMax', JSON.stringify(prefixMax));

const prefix_popular = {
    list_item_count: 0,
    list: [],// { }[]
};
const prefix_count = JSON.parse(JSON.stringify(prefixMax)); // copy
for (const i in inputs) {
    const input = inputs[i];
    if (typeof input === 'string') {
        let current = prefix_count[input[0]];
        let char_com = input[0];
        for(const char of input.slice(1)) {// O(n - 1)
            char_com += char;
            const text_length = char_com.length;
            if (current[char].index) {
                current[char].index.push(i);
                const current_item_length = current[char].index.length;
                if (current_item_length > prefix_popular.list_item_count) {
                    prefix_popular.list_item_count = current_item_length;
                    prefix_popular.list = [{
                        items_index: current[char].index.map(i => +i),
                        text: char_com,
                    }];
                } else if (current_item_length === prefix_popular.list_item_count) {
                    prefix_popular.list.push({
                        items_index: current[char].index.map(i => +i),
                        text: char_com,
                    });
                }
            } else {
                current[char].index = [i];
            }
            current = current[char];
        }
    }
}// O(n^2)
// console.log('prefix_count', JSON.stringify(prefix_count));
// console.log('prefix_popular', JSON.stringify(prefix_popular));

const prefix_final = [];
if (prefix_popular.list.length > 0) {
    // group by 'items_index'
    const group = {};
    for (const i in prefix_popular.list) {
        const p = prefix_popular.list[i];
        const key = JSON.stringify(p.items_index);

        if (group[key]) {
            group[key].push({
                prefix: p,
                index: i,
                text: p.text,
            });
        } else {
            group[key] = [{
                prefix: p,
                index: i,
                text: p.text,
            }];
        }
    } // O(n)

    Object.values(group).map(g => {
        if (g.length === 1) {
            prefix_final.push(g[0].prefix);
        } else {
            // more than 1
            // find longest text
            let long_text = g[0].text;
            for (const in_group of g) { // O(n)
                if (in_group.text.length > long_text.length) {
                    long_text = in_group.text;
                }
            }
            prefix_final.push(g.find(i => i.text === long_text).prefix);
        }
    }); // O(n^2)
}
// console.log('prefix_final', JSON.stringify(prefix_final));

// Total BigO   => O(n^2) + O(n^2) + O(n) + O(n^2)
//              => O(3n^2 + n)
//              => O(n^2)

console.log('===================================================');
console.log('========= Print the longest common prefix =========');
console.log('===================================================');
prefix_final.map(prefix => {
    console.log(`Text: '${prefix.text}' ===> ${prefix.items_index.map(index => {
        return inputs[index];
    }).join(',')}`);
});
console.log('===================================================');
console.log('================= BigO: O(n^2) ====================');
console.log('===================================================');
