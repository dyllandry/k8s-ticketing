import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";

import {
  errorHandler,
  NotFoundError,
  currentUser,
} from "@dyllandry-tickets/common";
import { createTicketRouter } from "./routes/new";
import { showTicketRouter } from "./routes/show";

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
    secure: process.env.NODE_ENV !== 'test',
  })
);

app.use(currentUser);

app.use(createTicketRouter);
app.use(showTicketRouter);

app.all("*", async (req) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
