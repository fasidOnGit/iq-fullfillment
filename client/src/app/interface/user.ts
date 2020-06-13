export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  password: string;
  authToken: string; // It is Used to send JWT Token in user body response itself after login to access secured api
  tasks: any []; // One to many one user to many task which is mapped by user id in task.
}
