module.exports = {
    verify: (req, res, next) => {
        const { studentId } = req.params;
        const { _id, role_id } = req.body;
        if (studentId === _id || role_id === 1) {
            next();
        }
        else {
            res.send({
                success: false,
                message: "User can't access this!"
            })
        }
    }
}