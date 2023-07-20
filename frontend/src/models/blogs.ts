/**
 * @description Blog model
 * @typedef {Object} Blog
 * @property {string} _id - Blog id
 * @property {string} title - Blog title
 * @property {string} text - Blog text
 * @property {string} createdAt - Blog created date
 * @property {string} updatedAt - Blog updated date
 */
export interface IBlog {
  _id: string;
  title: string;
  text?: string;
  createdAt: string;
  updatedAt: string;
}
