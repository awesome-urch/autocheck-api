import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Vehicle } from './entities/vehicle.entity';
import { LoanApplication } from './entities/loan-application.entity';
import { AccessToken } from './entities/access-token.entity';
import { Valuation } from './entities/valuation.entity';
import { VehicleModule } from './vehicle/vehicle.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(
      {
        type: 'sqlite',
        database: ':memory:',
        entities: [User, Vehicle, LoanApplication, Valuation, AccessToken],
        synchronize: true,
        logging: ['query', 'error'],
      }
    ),
    TypeOrmModule.forFeature([User, Vehicle, LoanApplication, Valuation]),
    VehicleModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
