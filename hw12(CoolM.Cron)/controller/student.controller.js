const studentService = require('../service/MySQL/student.service');
const { transactionInstance } = require('../dataBase/MySQL').getInstance();

const { responseCodesEnum } = require('../constant');
const { studentMsg: { confirmMsg: { STUDENT_CREATED, STUDENT_UPDATED } } } = require('../messages');

module.exports = {
    getAll: async (req, res, next) => {
        try {
            const students = await studentService.findAll(req.query);

            res.status(responseCodesEnum.OK).json(students);
        } catch (e) {
            next(e);
        }
    },

    createStudent: async (req, res, next) => {
        const transaction = await transactionInstance(); // before "try" only
        try {
            await studentService.createStu(req.body, transaction);

            // throw new Error('rrr');

            await studentService.updateStu(17, { name: 'Dosya' }, transaction);
            await transaction.commit();

            res.status(responseCodesEnum.CREATED).json(STUDENT_CREATED.ua);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    },

    deleteStudent: async (req, res, next) => {
        const transaction = await transactionInstance();
        try {
            const { params: { stuId } } = req;

            await studentService.deleteStu(stuId, transaction);
            await transaction.commit();

            res.json('Stu is deleted').status(responseCodesEnum.NO_CONTENT);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    },

    updateStudent: async (req, res, next) => {
        const transaction = await transactionInstance();
        try {
            const { params: { stuId }, body } = req;

            await studentService.updateStu(stuId, body, transaction);
            await transaction.commit();

            res.status(responseCodesEnum.OK).json(STUDENT_UPDATED.ua);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    }
};
