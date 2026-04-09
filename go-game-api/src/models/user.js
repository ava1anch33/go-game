import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        lastLoginAt: {
            type: Date,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
        },
        avatar: {
            type: String,
            default: null,
        },
        phoneCode: {
            type: String,
            default: ''
        },
        phone: {
            type: String,
            default: ''
        },
        firstName: {
            type: String,
            default: ''
        },
        lastName: {
            type: String,
            default: ''
        },
        refreshTokens: [
            {
                token: { type: String, required: true },
                createdAt: { type: Date, default: Date.now },
                expiredAt: { type: Date, required: true },
            },
        ],
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    },
)


userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        { id: this._id, email: this.email, role: this.role },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: process.env.JWT_ACCESS_EXPIRY || '15m' },
    )
}

userSchema.methods.generateRefreshToken = async function () {
    const refreshExpiry = process.env.JWT_REFRESH_EXPIRY || '7d'

    const refreshToken = jwt.sign({ id: this._id }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: refreshExpiry,
    })

    const expiresInDays = parseInt(refreshExpiry) || 7
    const expiredAt = new Date()
    expiredAt.setDate(expiredAt.getDate() + expiresInDays)

    this.refreshTokens = [
        {
            token: refreshToken,
            expiredAt,
        },
    ]

    await this.save()
    return refreshToken
}

userSchema.methods.invalidateRefreshToken = async function (token) {
    this.refreshTokens = this.refreshTokens.filter((rt) => rt.token !== token)
    await this.save()
}

userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform(doc, ret) {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.password
        delete ret.refreshTokens

        return ret
    },
})

userSchema.set('toObject', {
    virtuals: true,
    versionKey: false,
})

export default mongoose.model('User', userSchema)
