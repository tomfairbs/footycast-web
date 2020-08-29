import { format, parseISO } from 'date-fns';

export const sortByRating = (a, b) => (
    a.rating < b.rating ? -1 : 1
);

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

export const groupMatchesByDate = matches => matches.reduce(
    (acc, cur) => {
        const key = format(parseISO(cur.date), 'EEEE MMMM d');
        if (!acc[key]) acc[key] = [];
        acc[key].push(cur);
        return acc;
    }, {}
);

export const addOrdinalSuffix = n => {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
};


