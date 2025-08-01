import { IUserRepository } from "@/features/user/domain/repositories/user.repository";
import { LoginResponseDTO } from "../dtos/login-response.dto";
import { LoginRequestDTO } from "../dtos/login-request.dto";
import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken';

export class LoginUseCase {
    constructor(private readonly userRepository: IUserRepository) { }

    async execute(loginData: LoginRequestDTO): Promise<LoginResponseDTO> {
        const user = await this.userRepository.findByEmail(loginData.email);

        if (!user) {
            throw new Error("Invalid credentials");
        }

        const isPasswordValid = await compare(loginData.password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid credentials");
        }

        const token = sign(
            { sub: user.id, name: user.name, email: user.email },
            process.env.JWT_SECRET!,
            { expiresIn: '1h' }
        );

        return { token };
    }

}