import { imageBaseUrl } from "../config/baseUrl";

export function getImgUrl (width = 500, path) {
  return `${imageBaseUrl}/w${width}/${path}`
}