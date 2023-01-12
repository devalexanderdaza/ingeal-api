import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

/**
 * This class is used to configure swagger
 */
export class SwaggerUtil {
  private app: INestApplication;
  private title: string;
  private description: string;
  private version: string;
  private url: string;

  constructor(
    app: INestApplication,
    title: string,
    description: string,
    version: string,
    url: string,
  ) {
    this.app = app;
    this.title = title;
    this.description = description;
    this.version = version;
    this.url = url;
  }

  configure() {
    const config = new DocumentBuilder()
      .setTitle(this.title)
      .setDescription(this.description)
      .setVersion(this.version)
      .build();
    const document = SwaggerModule.createDocument(this.app, config);
    SwaggerModule.setup(this.url.toLowerCase(), this.app, document);
  }
}
