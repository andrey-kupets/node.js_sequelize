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
const { dataBaseTablesEnum: { STUDENT } } = require('../../constant');

module.exports = {
    findAll: () => {
        const Student = db.getModel(STUDENT);

        return Student.findAll();
    },

    createStu: (studentObj, transaction) => {
        const Student = db.getModel(STUDENT);

        return Student.create(studentObj, { transaction });
    },

    updateStu: (id, student, transaction) => {
        const Student = db.getModel(STUDENT);

        return Student.update(student, {
            where: { id },
            returning: true,
            transaction
        });
    },

    // createStu2: (studentObj) => {
    //     const Student = db.getModel(STUDENT);
    //
    //     return Student.create(studentObj);
    // },
    //
    // updateStu2: (id, student) => {
    //     const Student = db.getModel(STUDENT);
    //
    //     return Student.update(student, {
    //         where: { id },
    //         returning: true
    //     });
    // },

    deleteStu: (id, transaction) => {
        const Student = db.getModel(STUDENT);

        Student.findOne({ where: { id } });

        return Student.destroy({ where: { id }, transaction });
    }
};
