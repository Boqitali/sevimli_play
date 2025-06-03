import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { BadRequestException, ValidationPipe } from "@nestjs/common";
import * as cookieParser from "cookie-parser";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as basicAuth from "express-basic-auth";

const cors = require("cors");

async function start() {
  try {
    const PORT = process.env.API_PORT || 3030;
    const app = await NestFactory.create(AppModule, {
      logger: ["error", "warn"],
    });
    app.use(cookieParser());
    app.use(cors());
    app.enableCors({
      origin: (origin, callback) => {
        const allowedOrigins = [
          "http://localhost:7007",
          "http://localhost:3003",
          "http://sevimli_play.uz",
          "http://api.sevimli_play.uz",
          "http://sevimli_play.vercel.app",
        ];
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new BadRequestException("Not allwed by Cors"));
        }
      },
      methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
      credentails: true, // cookie va header
    });

    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix("api");

    // add auth to read swagger docs
    app.use(
      ["/api/docs"],
      basicAuth({
        users: { kottaAdmin: "12345" },
        challenge: true,
      })
    );

    const config = new DocumentBuilder()
      .setTitle("Sevimli play project")
      .setDescription("Sevimli play REST API")
      .setVersion("1.0")
      .addTag("NestJS", "Validation")
      .addTag("NestJS, swagger, sendMail, tokens, Validation")
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api/docs", app, document);
    await app.listen(PORT, () => {
      console.log(`Server started at: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
start();
