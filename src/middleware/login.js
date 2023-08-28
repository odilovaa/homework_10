const {knex} = require("../../database")
const {extractJwt} = require("../util/jwt")
const config = require("../../config");

const isAuth = async (req, res, next) =>
{
    try 
    {
        const token = req.headers.authorization;
        

        if(!token) return res.status(401).json({message: "Invalid token"})

        extractJwt(token, (data, err) =>
        {
            if (err) 
            {
                return  res.status(404).json({message:"You need register"});
            }
            console.log(data.id);
            req.c_id = data.id;
            next();
    
        });
    } catch (error)
    {
        res.status(500).json({message: "Internal Server Error"});
    }
};


const isAdmin = async (req, res, next) =>
{
    // try 
    // {
        const token = req.headers.authorization;

        if(!token) return res.status(401).json({message: "Invalid token"})

        extractJwt(token, (data, err) =>
        {
            console.log(data, err);
            if (err || data.status != 'admin') 
            {
                return  res.status(404).json({message:"You are not Admin"});
            }
            req.c_id = data.id;
            next();
        });
    // } catch (error)
    // {
    //     console.log(error);
    //     res.status(500).json({message: "Internal Server Error"});
    // }
};

module.exports = {isAuth, isAdmin}