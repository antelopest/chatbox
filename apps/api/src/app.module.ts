import { AppConfigModule } from '@config/config.module';
import { Module } from '@nestjs/common';

// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    AppConfigModule,
    // ConfigModule.forRoot({
    //   isGlobal: true,
    //   envFilePath: ['.env'],
    // }),
    // MongooseModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) => {
    //     const host = config.get<string>('MONGO_HOST', 'localhost');
    //     const port = config.get<string>('MONGO_PORT', '27017');
    //     const db = config.get<string>('MONGO_DB', 'chatbox');
    //     const user = config.get<string>('MONGO_USER', 'root');
    //     const pass = config.get<string>('MONGO_PASS', 'rootpass');
    //     const uri = `mongodb://${encodeURIComponent(user)}:${encodeURIComponent(
    //       pass,
    //     )}@${host}:${port}/${db}?authSource=admin`;
    //     return { uri };
    //   },
    // }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
