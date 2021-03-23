// const db = require('../../dataBase/MySQL');
//
// module.exports = {
//     findAll: async () => {
//         const [dbResp] = await db.query('SELECT * FROM students') || [];
//
//         return dbResp;
//     },
//
//     createStu: (studentObj) => {
//         const { age, gender, name } = studentObj;
//
//         return db.query(`INSERT INTO students (age, gender, name) VALUE ('${age}', '${gender}', '${name}')`);
//     }
// };

const db = require('../../dataBase/MySQL').getInstance();

module.exports = {
    findAll: () => {
        const Student = db.getModel('Student');

        return Student.findAll();
    },

    createStu: (studentObj) => {
        const Student = db.getModel('Student');

        return Student.create(studentObj);
    }
};
