import { LoginController } from "@/features/auth/interfaces/controllers/login.controller";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const controller = new LoginController();
  return controller.handle(req);
}