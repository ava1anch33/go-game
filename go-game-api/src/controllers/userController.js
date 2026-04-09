import { userService } from '../services/index.js'
import { successResponse, checkUserExist } from '../utils/index.js'

async function getUserInfo(req, res, next) {
    try {
        const tokenUser = checkUserExist(req)
        const user = await userService.getUserById(tokenUser.id)
        successResponse(res, {
            user,
        })
    } catch (error) {
        next(error)
    }
}

async function logout(req, res, next) {
    try {
        const currentUser = req.user
        if (!currentUser) {
            return successResponse(res, { message: 'ok' })
        }
        await userService.clearAllRefreshTokens(currentUser.id)
        successResponse(res, {
            message: 'ok',
        })
    } catch (error) {
        next(error)
    }
}

async function updateUserInfo(req, res, next) {
    try {
        const tokenUser = checkUserExist(req)
        const newUserInfo = req.body
        const user = await userService.updateUser(tokenUser.id, newUserInfo)
        successResponse(res, {
            user,
        })
    } catch (error) {
        next(error)
    }
}

async function uploadAvatar(req, res, next) {
    try {
        const { file: avatar } = req.body
        const user = await userService.updateUserAvatar(req.user.id, avatar)
        successResponse(res, {
            user,
        })
    } catch (error) {
        next(error)
    }
}

export default {
    getUserInfo,
    updateUserInfo,
    uploadAvatar,
    logout,
}
