import { LoginRequest, LoginResponse, MeResponse, RegisterRequest, RegisterResponse } from "../types/auth";
import api from "./api";

export class AuthService {
  static async register(form: RegisterRequest): Promise<RegisterResponse> {
    const response = await api.post("/auth/register", form);

    return response.data;
  }

  static async login(form: LoginRequest): Promise<LoginResponse> {
    const response = await api.post("/auth/login", form);

    return response.data;
  }

  static async me(): Promise<MeResponse> {
    const response = await api.get("/user");

    return response.data;
  }
}
