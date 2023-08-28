const {knex} = require("../../database")

const create = async (req, res) =>
{
    try
    {
        const {name, balance, promocode} = req.body;

        const findUser = await knex("company").select("*").where({name}).first();
        if (findUser)
        return res.status(403).json({message: "Username already exists"});


        const [user] = await knex("company")
        .insert({name, balance, promocode})

        res.status(201).json({message: "Success", data});

    }catch(error)
    {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
};



const getall = async (req, res) =>
{
    const company = await knex("company").select("*");

    res.status(201).json({message : company});
};


const getbyid = async (req, res) =>
{
    const {code} = req.params;
    console.log(id);

    const company = await knex("company").select("*").where({code});

    if(!company)
    return res.status(403).json({message: "Company not exists"});

    const user = await knex("users").select("*").where(`username = :username`, {code});

    const promocode = await knex("promocode").select("*").where(`company_id = :company_id`, [company.id]);

    if(promocode.created_at < new Date())
    return res.status(403).json({message: "The promocode is old"});

    if(!user)
    return res.status(403).json({message: "This promocode is error"});

    const user_use = await  knex("users").select("*").where(`id = :id`, [req.c_id]);
    if(user_use.balance < company.balance)
    return res.status(403).json({message: "user's balance not enough"});

    user_use.balance = user_use.balance - company.balance
    await knex.raw(`update users set balance = :balance where id = :id`, [user_use.balance, user_use.id])

    user.balance = company.balance / 10
    await knex.raw(`update users set balance = :balance where id = :id`, [user.balance, user.id])

};

module.exports = {
    create, getall, getbyid
};