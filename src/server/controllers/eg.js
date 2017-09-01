import Example from "../models/eg.js";

/**
 * Create a new Example
 * @param req - Express Request
 * @param res - Express Response
 */
export function createEg(req, res) {
    let record = new Example({ name });
    record.save().then(
        () => res.json({ sucess: true, msg: JSON.stringify(record) }), 
        (err) => res.json({ success: false, mssg: err })
    );
}