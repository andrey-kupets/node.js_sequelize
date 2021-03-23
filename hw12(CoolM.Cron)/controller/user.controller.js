const {
    responseCodesEnum,
    emailActionsEnum: { CREATION_OF_ACC, DELETION_OF_ACC },
    directoriesEnum: {
        USER, DOCS, PHOTOS, VIDEOS
    }
} = require('../constant');
const { userMsg: { confirmMsg } } = require('../messages');
const { passwordHasher, filesHandler } = require('../helpers');
const { mailService, userService } = require('../service');

module.exports = {
    createUser: async (req, res, next) => {
        try {
            const {
                body: {
                    email, name, password, preferLang = 'ua'
                },
                avatar, docs, videos
            } = req;
            const hashPassword = await passwordHasher.hash(password);
            const user = await userService.createUser({ ...req.body, password: hashPassword });

            if (avatar) {
                // 1st
                // const pathWithoutStatic = path.join('user', `${user._id}`, 'photos');
                // const photoDir = path.join(process.cwd(), 'static', pathWithoutStatic);
                // const fileExtension = avatar.name.split('.').pop();
                // const photoName = `${uuid()}.${fileExtension}`;
                // const finalPhotoPath = path.join(photoDir, photoName);
                // 2nd
                // const { finalFilePath, uploadPath, filesDir } = _filesDirBuilder(avatar.name, 'photos', user._id);
                //
                // await fs.mkdir(filesDir, { recursive: true });
                // await avatar.mv(finalFilePath);

                const uploadPath = await filesHandler.uploadAvatar(USER, PHOTOS, avatar, user._id);

                await userService.updateUserById(user._id, { avatar: uploadPath });
            }

            if (docs) {
                const uploadPath = await filesHandler.uploadFiles(USER, DOCS, docs, user._id);

                await userService.updateUserById(user._id, { docs: uploadPath });
            }

            if (videos) {
                const uploadPath = await filesHandler.uploadFiles(USER, VIDEOS, videos, user._id);

                await userService.updateUserById(user._id, { docs: uploadPath });
            }

            await mailService.sendMail(email, CREATION_OF_ACC, { userName: name }); // нейм - обязательное поле при создании юзера

            res.status(responseCodesEnum.CREATED).json(confirmMsg.USER_CREATED[preferLang]);
        } catch (e) {
            next(e);
        }
    },

    getAllUsers: async (req, res, next) => {
        try {
            const { query } = req;
            const users = await userService.findAllUsers(query);

            res.status(responseCodesEnum.OK).json(users);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const { params: { userId }, user } = req;

            await userService.deleteUser(userId);
            await mailService.sendMail(user.email, DELETION_OF_ACC, { userName: user.name });

            // eslint-disable-next-line max-len
            res.json('User is deleted').status(responseCodesEnum.NO_CONTENT); // если ставить статус 204 No Content -  то он(если будет идти первым по коду) перебивает инфо джейсона json('User is deleted') и на выходе будет пустота
        } catch (e) {
            next(e);
        }
    },

    getUserById: async (req, res, next) => {
        try {
            const { params: { userId } } = req;
            const user = await userService.findUserById(userId);

            res.status(responseCodesEnum.OK).json(user);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const { userId } = req.params;
            const { preferLang = 'ua' } = req.body;

            await userService.shiftUser(userId, req.body);

            res.status(responseCodesEnum.OK).json(confirmMsg.USER_UPDATED[preferLang]);
        } catch (e) {
            next(e);
        }
    }
};
