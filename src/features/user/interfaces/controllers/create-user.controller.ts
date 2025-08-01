import { NextRequest, NextResponse } from "next/server";
import { createUserSchema } from "../validators/user.schema";
import { PrismaUserRepository } from "../../infrastructure/prisma/prisma-user-repository";
import { CreateUserUseCase } from "../../application/use-cases/create-user.use-case";

export class CreateUserController {
    async handle(request: NextRequest) {
        const body = await request.json();
        const parsedBody = createUserSchema.safeParse(body);

        if(!parsedBody.success) {
            return NextResponse.json({
                error: 'Invalid input',
                details: parsedBody.error.format()
            }, { status: 400 }
            );
        }

        const { name, email, password } = parsedBody.data;

        const repository = new PrismaUserRepository();
        const useCase = new CreateUserUseCase(repository);

        try {
            const result = await useCase.execute({ name, email, password});
            return NextResponse.json(result, { status: 201 });
        } catch (error) {
            return NextResponse.json({
                error: 'Failed to create user',
                details: error instanceof Error ? error.message : 'Unknown error'
            }, { status: 400 });
        }
    }
}