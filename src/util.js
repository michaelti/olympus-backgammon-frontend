// Enum-like object to match data from the back-end
export const Player = Object.freeze({
    neither: 0,
    white:  1,
    black: -1,
    properties: {
        '0':  { name: 'Neither' },
        '1':  { name: 'White' },
        '-1': { name: 'Black' },
    },
    getColor(value) {
        return this.properties[value].name;
    },
});
