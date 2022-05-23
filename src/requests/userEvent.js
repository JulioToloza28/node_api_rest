const addUserEventsQry = `INSERT INTO userevent(iduser, event_date, event_type)VALUES($1, $2, $3);`;

module.exports = {
    addUserEventsQry
}