async function validateAdmin(req, res, next) {
    const { headers } = req;
    try {
        if (headers.admin == "true") {
            next();
        } else {
            return res.status(401).json({ error: "-1", descripcion: "Unauthorized" });
        }
    } catch (error) {
        next(error);
    }
}

export default validateAdmin;