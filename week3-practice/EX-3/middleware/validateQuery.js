export function validateQuery(req, res, next) {
    const {minCredits, maxCredits} = req.query;

    //check if min credit and max credit are valid integers

    if (minCredits && isNaN(minCredits)) {
        return res.status(400).json({error: 'minCredits must be a number'});
    }

    if (maxCredits && isNaN(maxCredits)) {
        return res.status(400).json({error: 'maxCredits must be a number'});
    }

    if (minCredits && maxCredits && parseInt(minCredits) > parseInt(maxCredits)) {
        return res.status(400).json({ error: "minCredits cannot be greater than maxCredits" });
    }
    next();
}