const { transactionInstance } = require('../dataBase/MySQL').getInstance();
const { responseCodesEnum, emailActionsEnum } = require('../constant');
const studentService = require('../service/MySQL/student.service');
const { mailService } = require('../service');
const { confirmMsg } = require('../messages/student');
const ErrorHandler = require('../messages/ErrorHandler');
const { NO_STUDENTS } = require('../messages/error.messages');

const chooseStudentForBlock = async (req, res, next) => {
    try {
        const students = await studentService.findAll(req.query);

        res.json(students);
    } catch (e) {
        next(e);
    }
};

const changeStudentStatus = async (req, res, next) => {
    const transaction = await transactionInstance();
    try {
        const { params: { stuId }, query: { preferLang = 'ua' } } = req;

        await studentService.updateStu(stuId, req.body, transaction);

        await transaction.commit();
        res.json(confirmMsg.STUDENT_STATUS_UPDATED[preferLang]);
    } catch (e) {
        await transaction.rollback();
        next(e);
    }
};

const deleteStudent = async (req, res, next) => {
    const transaction = await transactionInstance();
    try {
        const { params: { stuId }, query: { preferLang = 'ua' } } = req;

        const { name, mail } = await studentService.findStuById(stuId) || {};

        if (!mail) { // for middleware
            throw new ErrorHandler(NO_STUDENTS.customCode, NO_STUDENTS[preferLang], responseCodesEnum.BAD_REQUEST);
        }

        await studentService.deleteStu(stuId, transaction);
        await mailService.sendMail(mail, emailActionsEnum.DELETION_OF_ACC, { name });

        await transaction.commit();

        res.json('stu is deleted').res.status(responseCodesEnum.NO_CONTENT);
    } catch (e) {
        await transaction.rollback();
        next(e);
    }
};

module.exports = {
    chooseStudentForBlock,
    changeStudentStatus,
    deleteStudent
};
