const { Link } = require('../models');
const { User } = require('../models');

class LinkController {
    async index(req, res) {
        try {
            const links = await Link.findAll({
                include: { association: "user" },
            });

            return res.json(links);
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    }

    async store(req, res) {
        try {
            const { url, user_id, link } = req.body;

            const users = await User.findByPk(user_id);

            if(!users) {
                return res.status(404).json({error: "Usuário não encontrado"});
            }

            const links = await Link.create({url, link, user_id});
            return res.json(links);
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    }

    async show(req, res) {
        try {
            const { link_id } = req.params;
            const links = await Link.findByPk(link_id, {
                include: { association: 'user' }
            });

            if(!links){
                return res.status(404).json({error: "Link não encontrado"});
            }

            return res.json(links);

        } catch (e) {
            return res.status(400).json({error: e.message});
        }
    }

    async destroy(req, res) {
        try {
            const { link_id } = req.params;
            const links = await Link.findByPk(link_id);

            if(!links){
                return res.status(404).json({error: "Link não encontrado"});
            }

            await links.destroy();

            return res.json([]);
        } catch (e) {
            return res.status(400).json({error: e.message});
        }
    }

    async update(req, res) {
        try {
            const { link_id } = req.params;
            const { url, user_id } = req.body;
            const links = await Link.findByPk(link_id);
            const users = await User.findByPk(user_id);
            
            if(!links){
                return res.status(404).json({error: "Link não encontrado"});
            }

            if(!users){
                return res.status(404).json({error: "Usuário não encontrado"});
            }

            await links.update({url, user_id, link: generateLink()});

            return res.json(links);

        } catch (e) {
            return res.status(400).json({error: e.message});
        }
    }
}

module.exports = new LinkController();