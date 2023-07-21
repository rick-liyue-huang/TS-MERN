/**
 * @description User model
 * @typedef {Object} User
 * @property {string} _id - User id
 * @property {string} username - User username
 * @property {string} email - User email
 * @property {string} password - User password
 * @property {string} createdAt - User created date
 * @property {string} updatedAt - User updated date
 */
export interface IUser {
  // _id: string;
  username?: string;
  email?: string;
  // password?: string;
  // createdAt: string;
  // updatedAt: string;
}
