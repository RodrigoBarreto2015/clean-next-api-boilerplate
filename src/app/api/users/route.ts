import { CreateUserController } from "@/features/user/interfaces/controllers/create-user.controller";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const controller = new CreateUserController();
    return controller.handle(request);
}