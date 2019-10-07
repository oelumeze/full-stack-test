
export const authorizationError = (err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(400).json({
            error: true,
            success: false,
            message: err.message
        })
    }
}