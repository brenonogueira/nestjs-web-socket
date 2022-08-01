import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as hbs from 'express-handlebars';
// import * as flash from 'req-flash';
import * as flash from 'flash';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.engine(
    'hbs',
    hbs({
      extname: 'hbs',
      partialsDir: join(__dirname, '..', 'views/partials'),
      defaultLayout: 'mainLayout',
      layoutsDir: join(__dirname, '..', 'views/layouts'),
    }),
  );

  app.setViewEngine('hbs');

  app.use(
    session({
      secret: 'codeforgeek',
      saveUninitialized: true,
      resave: true,
    }),
  );

  app.use(flash());
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
