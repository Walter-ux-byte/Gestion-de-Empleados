
import { Injectable, HttpException } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { hash, compare } from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService,
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async funRegister(objUser: RegisterAuthDto) {

        const { password } = objUser;

        const plainToHash = await hash(password, 12);

        objUser = {
            ...objUser,
            password: plainToHash
        };

        return this.userRepository.save({
            name: objUser.name,
            email: objUser.email,
            password: objUser.password
        });
    }

    async login(credenciales: LoginAuthDto) {

        const { email, password } = credenciales;

        const user = await this.userRepository.findOne({
            where: {
                email: email
            },
            order: {
                id: 'DESC'
            }
        });

        // Si no existe el usuario
        if (!user) {
            throw new HttpException('Usuario no encontrado', 404);
        }

        // Verificar contraseña
        const verificarPass = await compare(password, user.password);

        if (!verificarPass) {
            throw new HttpException('Password inválido', 401);
        }

        // Crear payload
        let payload = {
            email: user.email,
            id: user.id
        };

        // Generar token
        const token = this.jwtService.sign(payload);

        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password
            },
            token: token
        };
    }
}
