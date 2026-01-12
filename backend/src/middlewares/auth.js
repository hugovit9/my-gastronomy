import jwt from "jsonwebtoken"

export function authenticateJWT(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1]

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido" })
  }

  try {
    const decoded = jwt.verify(token, "secret") 
    req.user = decoded 
    next()
  } catch (err) {
    return res.status(403).json({ message: "Token inválido" })
  }
}
