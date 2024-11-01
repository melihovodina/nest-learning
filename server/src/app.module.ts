import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from './users/users.module';
import { ConfigModule } from "@nestjs/config";
import { User } from "./users/models/user.model";
import { RolesModule } from './roles/roles.module';
import { Role } from "./roles/models/role.model";
import { UserRoles } from "./roles/models/userRoles.model";
import { AuthModule } from './auth/auth.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      models: [User, Role, UserRoles],
      autoLoadModels: true
    }),
    UsersModule,
    RolesModule,
    AuthModule
  ]
})

export class AppModule {}