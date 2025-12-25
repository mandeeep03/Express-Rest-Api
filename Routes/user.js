const express = require('express')
const router = express.Router()
const User = require('../Models/users')

// all users:client side rendering
router
    .route("/")
    .get(async (req, res) => {
    const allUser = await User.find({});
    res.status(200).json(allUser);
})
.post(async (req, res) => {
    const body = req.body;
    //return 400 for bad request (incomplete information)
    if (!body.first_name || !body.email || !body.gender || !body.job_tittle) {
        return res.status(400).json({ msg: "all feilds are required ..." });
    }

    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_tittle,
    });
    console.log(result);
    return res.status(201).json({ msg: "User Created !!!" });
});

// single user
router
    .route("/:id")
    .get(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
})
    .patch(async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, req.body).then(() =>
        res.status(200).json({ msg: "User updated" })
    );
})
    .delete(async (req, res) => {
    await User.findByIdAndDelete(req.params.id).then(() =>
        res.status(200).json({ msg: "Deleted" })
    );
});
module.exports = router