const { User } = require('../models');

class UserController {
    async index(req, res) {
        try {
            const users = await User.findAll({
                include: { association: 'links' }
            });
            return res.json(users);
        } catch (e) {
            return res.status(400).json({error: e.message});
        }
    }

    async store(req, res) {
        try {
            const { username, password } = req.body;
            const users = await User.create({ username, password });
            return res.json(users);
        } catch (e) {
            return res.status(400).json({error: e.message});
        }
    }

    async show(req, res) {
        try {
            const { user_id } = req.params;
            const users = await User.findByPk(user_id, {
                include: { association: 'links' }
            });

            if(!users){
                return res.status(404).json({error: "Usuário não encontrado"});
            }

            return res.json(users);

        } catch (e) {
            return res.status(400).json({error: e.message});
        }
    }

    async destroy(req, res) {
        try {
            const { user_id } = req.params;
            const users = await User.findByPk(user_id);

            if(!users){
                return res.status(404).json({error: "User não encontrado"});
            }

            await users.destroy();

            return res.json([]);
        } catch (e) {
            return res.status(400).json({error: e.message});
        }
    }

    async update(req, res) {
        try {
            const { user_id } = req.params;
            const { username, password } = req.body;
            const users = await User.findByPk(user_id);

            if(!users){
                return res.status(404).json({error: "Usuário não encontrado"});
            }

            await users.update({username, password});

            return res.json(users);

        } catch (e) {
            return res.status(400).json({error: e.message});
        }
    }
}

module.exports = new UserController();