function Model () {
    const users = [
        { username: 'dev', password: 'dev' }
    ];

    const getAll = () => users;

    const findByName = (username) => getAll().find( (user) => user.username === username );

    return { findByName };
}

module.exports = Model;
