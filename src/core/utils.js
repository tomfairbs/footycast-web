import { NOTIONAL_AVG_RATING } from "./constants";

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

// Map a team's raw rating to an average-relative rating
export const toRatingDiff = ({ team, rating }) => ({
    team,
    rating: rating - NOTIONAL_AVG_RATING,
});

export const addOrdinalSuffix = n => {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
};
