import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();
// Express will see that traffic is coming through an nginx proxy.
// Tell express that it's okay.
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    // Don't want to require other services to use the same
    // cookieSession package to decrypt the cookie.
    // Since JWTs are already tamper-resistant, and that's
    // what we are storing in the cooking, we will just
    // make the cookie not encrypted.
    signed: false,
    secure: true,
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
