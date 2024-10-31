import { userIp } from "../ip";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const isTokenValid = async (token?: string | null) => {
  if (!token) {
    return { success: false, message: "No token" };
  }

  try {
    const response = await axios.get(`${userIp}/verify-token`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      success: true,
      user: response.data.user,
    };
  } catch (error) {
    return {
      success: false,
      message: "Invalid token",
    };
  }
};