import { UserResponseDTO } from "../../application/dtos/user-response.dto";
import { UserWithPasswordDTO } from "../../application/dtos/user-with-password.dto";
import { User } from "../entities/user.entity";

export interface IUserRepository {
    create(user: User): Promise<UserResponseDTO>;
    findById(id: string): Promise<UserResponseDTO | null>;
    findByEmail(email: string): Promise<UserWithPasswordDTO  | null>;
}