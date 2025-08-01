import { hash } from "bcryptjs";
import { User } from "../../domain/entities/user.entity";
import { IUserRepository } from "../../domain/repositories/user.repository";
import { CreateUserDTO } from "../dtos/create-user.dto";
import { UserResponseDTO } from "../dtos/user-response.dto";

export class CreateUserUseCase {
    constructor(private readonly userRepository: IUserRepository) { }

    async execute(userData: CreateUserDTO): Promise<UserResponseDTO> {
        const user = new User(userData.name, userData.email, userData.password);

        user.validate();

        const existingUser = await this.userRepository.findByEmail(user.email);
        if (existingUser) {
            throw new Error("User already exists");
        }

        const hashedPassword = await hash(user.password, 10);

        const created = await this.userRepository.create(
            new User(user.name, user.email, hashedPassword)
        );

        return {
            id: created.id,
            name: created.name,
            email: created.email,
        };
    }
}