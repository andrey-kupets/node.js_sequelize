const fs = require('fs-extra').promises;
const path = require('path');
const uuid = require('uuid').v1;

module.exports = {
    uploadAvatar: async (userDir, filesTypeDir, avatar, itemId) => {
        const { finalFilePath, uploadPath, filesDir } = _filesDirBuilder(userDir, filesTypeDir, avatar.name, itemId);

        await fs.mkdir(filesDir, { recursive: true });
        await avatar.mv(finalFilePath);

        return uploadPath;
    },

    uploadFiles: async (userDir, filesTypeDir, files, itemId) => {
        const filesArr = [];

        for (const file of files) {
            const { finalFilePath, uploadPath, filesDir } = _filesDirBuilder(userDir, filesTypeDir, file.name, itemId);

            // eslint-disable-next-line no-await-in-loop
            await fs.mkdir(filesDir, { recursive: true });
            // eslint-disable-next-line no-await-in-loop
            await file.mv(finalFilePath);

            filesArr.push(uploadPath);
        }

        return filesArr;
    }

};

function _filesDirBuilder(userDir, itemTypeDir, itemName, itemId) {
    const pathWithoutStatic = path.join(userDir, `${itemId}`, itemTypeDir);
    const filesDir = path.join(process.cwd(), 'static', pathWithoutStatic);
    const fileExtension = itemName.split('.').pop();
    const fileName = `${uuid()}.${fileExtension}`;
    const finalFilePath = path.join(filesDir, fileName);
    const uploadPath = path.join(pathWithoutStatic, fileName);

    return { finalFilePath, uploadPath, filesDir };
}
