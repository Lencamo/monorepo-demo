export default function globalTools() {
  const genterateRandomId = () => {
    return Math.random().toString(36).substr(2, 9)
  }

  return {
    genterateRandomId
  }
}
