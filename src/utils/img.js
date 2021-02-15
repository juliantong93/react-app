import { imageBaseUrl } from "../config/baseUrl";

export function getImgUrl (path, width = 500) {
  return `${imageBaseUrl}/w${width}/${path}`
}