import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function SwaggerSetup(app: INestApplication, port?: number) {
  const config = new DocumentBuilder()
    .setTitle('Penny Coop API')
    .setDescription('The Penny Coop API description')
    .addServer(`http://localhost://${port ?? 9999}/`, "Local environment'")
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
