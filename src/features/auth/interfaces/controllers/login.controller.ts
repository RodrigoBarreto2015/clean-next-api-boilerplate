import { NextRequest, NextResponse } from "next/server";
import { loginSchema } from "../validators/login.schema";
import { PrismaUserRepository } from "@/features/user/infrastructure/prisma/prisma-user-repository";
import { LoginUseCase } from "../../application/use-cases/login.use-case";

export class LoginController {
    async handle(req: NextRequest) {
        const body = await req.json();

        const parsed = loginSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json({ error: 'Invalid data', issues: parsed.error.format() }, { status: 400 });
        }

        const { email, password } = parsed.data;
        const repository = new PrismaUserRepository();
        const useCase = new LoginUseCase(repository);

        try {
            const result = await useCase.execute({ email, password });
            return NextResponse.json(result, { status: 200 });
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
            return NextResponse.json({ error: errorMessage }, { status: 401 });
        }
    }
}