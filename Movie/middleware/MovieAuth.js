const UserAuth = (req, res, next) => {
    const{ Name , Description , Category , Rating  }= req.body
    if (Name && Description && Category && Rating ) {
        next();
    } else {
        res.send("invalid data")
    }
}

module.exports = UserAuth
