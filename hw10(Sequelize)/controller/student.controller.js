const studentService = require('../service/MySQL/student.service');

const { responseCodesEnum } = require('../constant');
const { studentMsg: { confirmMsg: { STUDENT_CREATED } } } = require('../messages');

module.exports = {
    getAll: async (req, res, next) => {
        try {
            const students = await studentService.findAll();

            res.status(responseCodesEnum.OK).json(students);
        } catch (e) {
            next(e);
        }
    },

    createStudent: async (req, res, next) => {
        try {
            await studentService.createStu(req.body);

            res.status(responseCodesEnum.CREATED).json(STUDENT_CREATED.ua);
        } catch (e) {
            next(e);
        }
    }
};
