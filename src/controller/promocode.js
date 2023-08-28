const {knex} = require("../../database")

const create = async (req, res) =>
{
    try
    {
        const {name, balance, company_id} = req.body;

        const findUser = await knex("promocode").select("*").where({name}).first();
        if (findUser)
        return res.status(403).json({message: "Username already exists"});


        const [user] = await knex("promocode")
        .insert({name, balance, company_id})

        res.status(201).json({message: "Success", data});

    }catch(error)
    {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
};

const getall = async (req, res) =>
{
    const dates = await knex("promocode").select("*");

    res.status(201).json({message : dates});
};

module.exports = {create, getall}