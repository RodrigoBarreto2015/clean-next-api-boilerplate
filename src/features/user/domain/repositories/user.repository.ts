import { UserResponseDTO } from "../../application/dtos/user-response.dto";
import { User } from "../entities/user.entity";

export interface IUserRepository {
    create(user: User): Promise<UserResponseDTO>;
    findById(id: string): Promise<UserResponseDTO | null>;
    findByEmail(email: string): Promise<UserResponseDTO | null>;
}