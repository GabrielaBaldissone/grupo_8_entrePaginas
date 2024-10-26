const db = require("../../database/models");

const usersApiController = {
    list: async (req, res) =>{
        try{
            // Cantidad de usuarios
            const count = await db.User.count();

            // Arreglo de usuarios con id, name, email y url
            const users = await db.User.findAll({
                attributes: ['id_user', 'first_name', 'email']
            });

            const usersArray = users.map(user => {
                const detailUrl = `/api/users/${user.id_user}`;
                return {
                    id: user.id_user,
                    name: user.first_name,
                    email: user.email,
                    detail: detailUrl
                };
            });

            return res.status(200).json({count, usersArray});
        }catch(error){
            console.log("Error al obtener los usuarios: ", error);
        }
    },
    detail: async (req, res) =>{
        try{
            const {id} = req.params;
            const user = await db.User.findByPk(id, {
                attributes: ['id_user', 'first_name', 'last_name', 'email', 'phone', 'image']
            });
            if(!user){
                return res.status(404).json({ error: "El usuario no existe"});
            }
            user.image = `/img/${user.image}`;
            return res.status(200).json({user});
        } catch(error){
            console.log("Error al obtener el usuario: ", error);
        }
    }
};

module.exports = usersApiController;