import jwt, { Secret } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const authenticatedUser = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const jwtSecret = process.env.JWT_SECRET_KEY as Secret;
    const decodedToken = jwt.verify(token, jwtSecret) as { id: string };
<<<<<<< HEAD
    req.user = decodedToken.id;
    next();
  } catch (err) {
    console.log(err);
=======
    req.user = { id: decodedToken.id }; // Set the 'id' property on req.user
    next();
  } catch (err) {
    console.error(err);
>>>>>>> 4c71aa5329a3c1ef64d499a3106baa2b984f825b
    return res.status(401).json({ error: 'Invalid token' });
  }
};

export { authenticatedUser };
