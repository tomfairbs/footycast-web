export const getMinRating = ratings => ratings.reduce(
    (acc, cur) => (
        cur.rating < acc ? cur.rating : acc
    ), ratings[0].rating
);

export const getMaxRating = ratings => ratings.reduce(
    (acc, cur) => (
        cur.rating > acc ? cur.rating : acc
    ), ratings[0].rating
);

export const sortByRating = (a, b) => (
    a.rating < b.rating ? -1 : 1
);

export const addOrdinalSuffix = n => {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
};
