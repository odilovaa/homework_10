const {knex} = require("../../database")
const bcrypt = require("bcrypt")
const {generateJwt} = require("../util/jwt");

const create = async (req, res) =>
{
    try
    {
        const {username, full_name, password, profession, age, balance, status} = req.body;

        const findUser = await knex("users").select("*").where({username}).first();
        if (findUser)
        return res.status(403).json({message: "Username already exists"});

        const hashedPass = await bcrypt.hash(password, 12);

        const [user] = await knex("users")
        .insert({username, full_name,  password: hashedPass, profession, age, balance, status})
        .returning("id");

        const token = generateJwt({id: user.id});

        res.status(201).json({message: "Success", data: token});
    }catch(error)
    {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
};

const getall = async (req, res) =>
{
    const users = await knex("users").select("*");

    res.status(201).json({message : users});
};



module.exports = {
    create, getall, 
}
