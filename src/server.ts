import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import users_routes from "./handlers/users";
import products_routes from "./handlers/procuts";
import orders_routes from "./handlers/order";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

const corsOptions = {
    origin: "https://whitlisteddomain.com",
    optionsSuccessStatus: 200,
};
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors(corsOptions));

users_routes(app);
products_routes(app);
orders_routes(app);

app.get("/", (_req, res) => {
    res.send(
        '<h1 style="font-family:roboto,garamond">Welcome to MoWear💓!</h1>'
    );
});

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});

export default app;
