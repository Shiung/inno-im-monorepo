export default <T>(array: T[]): T => {
  const idx = Math.floor(Math.random() * array.length)
  return array[idx]
}
