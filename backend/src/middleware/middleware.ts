import { NextFunction, Request, Response } from "express";
import { TokenGateway } from "../service/TokenGateway";

const checkAuthenticated = (rolesAccepted: string[] = []) => {
    const tokenGateway = new TokenGateway();
    return (req: Request, res: Response, next: NextFunction): void => {
        const bearerHeader = req.headers['authorization'];

        if (!bearerHeader) {
            res.status(403).json({ message: 'Acesso não autorizado!' });
            return;
        }

        const token = bearerHeader.split(' ')[1];
        const decoded: any = tokenGateway.decodeToken(token);

        if (!decoded) {
            res.status(403).json({ message: 'Token inválido ou expirado' });
            return;
        }

        if (rolesAccepted.length === 0) {
            next();
            return;
        }

        if (rolesAccepted.includes(decoded.role)) {
            next();
            return;
        }

        res.status(403).json({ message: 'Acesso não autorizado!' });
        return;
    };
};

export {checkAuthenticated};