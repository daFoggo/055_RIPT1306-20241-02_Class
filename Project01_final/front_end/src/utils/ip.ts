const backendIp = import.meta.env.VITE_NODEJS_BACKEND_IP;
const taskIp = `${backendIp}/api/task`;
const userIp = `${backendIp}/api/users`;
const authIp = `${userIp}/auth`;


export { backendIp, taskIp, userIp, authIp };
