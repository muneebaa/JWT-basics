const CustomAPIError = require("../errors/custom-error")
const jwt = require("jsonwebtoken")

const login = async(req,res) => {
    const {username,password} = req.body;

    if(!username || !password){
        throw new CustomAPIError("Please provide email and password",400)
    }

    const id = new Date().getDate()

    const token = jwt.sign({id, username},process.env.JWT_SECRET,{expiresIn:"30d"})

    console.log(username,password)
    res.status(200).json({msg:"user created",token})
}

const dashboard = async(req,res) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader)

    // if(!authHeader || !authHeader.startsWith("Bearer ")){
    //     throw new CustomAPIError("No token provided",401)
    // }
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        throw new CustomAPIError("No token provided",401)
    }
    const token = authHeader.split(" ")[1]

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const luckyNumber = Math.floor(Math.random()*100)
        res.status(200).json({msg:`Hello ${decoded.username}`, secret:`Here is your authorized Data, Your Lucky number is ${luckyNumber}`})

    }catch(error){
        throw new CustomAPIError("not authorized to access this route",401)
    }
    // console.log(token)
}

module.exports = {
    login,dashboard
}

