import React, { useState, useEffect } from 'react';

function LastUserInDb() {
    const [users, setUsers] = useState({count: 0, usersArray: [], lastUser: {}});

    useEffect(() => {
        const getUsers = async () => {
            const res = await fetch("http://localhost:8080/api/users");
            const newData = await res.json();
            setUsers(newData);
        };
        getUsers();
    }, []);

    return (
        <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">Último usuario de la Base de Datos</h5>
                </div>
                <div className="card-body">
                    <h4>{users.lastUser.first_name} {users.lastUser.last_name}</h4>
                    <div className="text-center">
                        {users.lastUser && users.lastUser.image && (
                            <img className="img-fluid px-3 px-sm-4 mt-3 mb-4"
                                style={{ width: 40 + 'rem' }}
                                src={`http://localhost:8080/img/${users.lastUser.image}`}
                                alt={users.lastUser.first_name} />
                        )}
                    </div>
                    <p>Email: {users.lastUser && users.lastUser.email}</p>
                    <p>Telefono: {users.lastUser && users.lastUser.phone}</p>
                </div>
            </div>
        </div>
    );
}

export default LastUserInDb;
