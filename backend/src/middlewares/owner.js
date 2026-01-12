export function requireOwner(req, res, next) {
  if (req.user.role !== "owner") {
    return res.status(403).json({ message: "Apenas donos do restaurante podem acessar." })
  }
  next()
}