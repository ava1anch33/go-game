import bcrypt from 'bcryptjs'
import { userRepository } from '../repositories/index.js'
import AppError from '../utils/AppError.js'

class UserService {
    async register(userData) {
        const { email, password } = userData

        if (await userRepository.findByEmail(email)) {
            throw new AppError('Email already exists', 409, 'EMAIL_DUPLICATE')
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const newUser = await userRepository.create({
            ...userData,
            password: hashedPassword,
        })

        return newUser
    }

    async login(userData) {
        const { email, password } = userData
        const user = await userRepository.findByEmail(email)

        if (!user) {
            throw new AppError('Invalid credentials', 401, 'INVALID_CREDENTIALS')
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            throw new AppError('Invalid credentials', 401, 'INVALID_CREDENTIALS')
        }
        await userRepository.updateLastLogin(user._id)
        user.lastLoginAt = new Date()

        return user
    }

    async clearAllRefreshTokens(userId) {
        await userRepository.clearRefreshTokens(userId)
    }

    async getUserById(id) {
        const user = await userRepository.findById(id)
        if (!user) {
            throw new AppError('User not found', 404, 'USER_NOT_FOUND')
        }
        return user
    }

    async getUserByEmail(email) {
        const user = await userRepository.findByEmail(email)
        if (!user) {
            throw new AppError('User not found', 404, 'USER_NOT_FOUND')
        }
        return user
    }

    async updateUser(id, updateData) {
        const forbiddenFields = ['passwd', 'role', 'googleId', 'wechatId', 'githubId', 'email'];

        forbiddenFields.forEach((field) => delete updateData[field]);

        const updatePayload = {};

        if (updateData.profile && typeof updateData.profile === 'object') {
            const safeProfileFields = { ...updateData.profile };

            delete safeProfileFields.avatar;

            Object.keys(safeProfileFields).forEach(key => {
                updatePayload[`profile.${key}`] = safeProfileFields[key];
            });
        }

        if (Object.keys(updatePayload).length === 0) {
            throw new AppError('No valid fields to update in profile', 400, 'NO_VALID_UPDATE_FIELDS');
        }

        const updated = await userRepository.updateById(id, {
            $set: updatePayload
        });

        if (!updated) {
            throw new AppError('User not found', 404, 'USER_NOT_FOUND');
        }

        return updated;
    }

    async updateUserAvatar(id, avatar) {
        const updated = await userRepository.updateById(id, { 'profile.avatar': avatar })
        if (!updated) {
            throw new AppError('User not found', 404, 'USER_NOT_FOUND')
        } 
        return updated
    }
}

export const userService = new UserService()
