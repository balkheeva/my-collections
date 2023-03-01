function flatten(input, reference, output = {}) {
    if (!input) return output;
    for (let key in input) {
        if (!input.hasOwnProperty(key)) continue;
        const value = input[key];
        key = reference ? reference + '.' + key : key;
        if (typeof value === 'object' && value !== null) {
            flatten(value, key, output);
        } else {
            output[key] = value;
        }
    }
    return output;
}

module.exports.flatten = flatten