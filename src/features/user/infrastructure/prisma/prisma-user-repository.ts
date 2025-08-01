import { prisma } from "@/lib/prisma";
import { User } from "../../domain/entities/user.entity";
import { IUserRepository } from "../../domain/repositories/user.repository";
import { UserResponseDTO } from "../../application/dtos/user-response.dto";
import { UserWithPasswordDTO } from "../../application/dtos/user-with-password.dto";

export class PrismaUserRepository implements IUserRepository {
    async create(user: User): Promise<UserResponseDTO> {
        const created = await prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: user.password,
            }
        });

        return { id: created.id, name: created.name, email: created.email };
    }
    findById(id: string): Promise<UserResponseDTO | null> {
        return prisma.user.findUnique({ where: { id } });
    }
    findByEmail(email: string): Promise<UserWithPasswordDTO  | null> {
        return prisma.user.findUnique({ where: { email } });
    }

}