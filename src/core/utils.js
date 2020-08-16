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
