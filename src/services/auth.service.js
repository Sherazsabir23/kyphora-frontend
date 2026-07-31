import api from "../api/axios";


export const registerUser = async (userData) => {
  const response = await api.post(
    "/auth/register",
    userData
  );

  return response;
};





export const verifyUserEmail = async ({ email, otp }) => {
  const response = await api.post("/auth/verify-email", {
    email,
    otp,
  });

  return response.data;
};


export  const login = async (formData)=>{
const response = await api.post("/auth/login",
  formData,
)
return response.data;
}

export const getMe = async () => {
  const response = await api.get("/auth/me");

  return response.data;
};

export const logout = async () => {
  return api.post("/auth/logout");
};

export const forgotPassword = async (email) => {
  return api.post("/auth/forgot-password", {
    email,
  });
};

export const resetPassword = async (
  token,
  password,
  confirmPassword
) => {
  return api.post(`/auth/reset-password/${token}`, {
    password,
    confirmPassword,
  });
};

export const resendVerificationCode = async (email) => {
  const response = await api.post(
    "/auth/resend-verification",
    {email}
  );

  return response.data;
};