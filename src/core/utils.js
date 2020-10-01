import { format, parseISO } from 'date-fns';
import { FINALS_ROUNDS } from './constants';

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

export const getRoundLabel = (round, i) => {
    const curRoundSuffix = i === 0 ? ' (current)' : '';

    // Regular season labels
    if (round < 19) {
        return `Round ${round}${curRoundSuffix}`;
    }

    // Finals labels
    const label = FINALS_ROUNDS.find(({ roundNum }) => roundNum === round).label;
    return `${label}${curRoundSuffix}`;
};
