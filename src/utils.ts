export function makeImagePath(id?: string, format?: string) {
  return `https://image.tmdb.org/t/p/${format ? format : "original"}${id}`;
}
export function getYoutubeVideoUrl(youtubeId: string) {
  return `https://www.youtube.com/watch?v=${youtubeId}`;
}
export function getYoutubeTumbnail(youtubeId: string) {
  return `https://img.youtube.com/vi/${youtubeId}/0.jpg`;
}
