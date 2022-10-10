import UserDto from "../models/userDto";
import axios from "axios";
import LoginDto from "../models/loginDto";

export default function AuthService() {
  const apiPostFix = "auth";
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/${apiPostFix}`;

  const register = (loginDto: LoginDto): Promise<UserDto> =>
    axios.post<UserDto>(`${apiUrl}/register`, loginDto).then((res) => res.data);

  const login = (loginDto: LoginDto): Promise<string> =>
    axios.post<string>(`${apiUrl}/login`, loginDto).then((res) => res.data);

  return { register, login };
}
