import {
  IsString,
  IsOptional,
  IsEmail,
  IsBoolean,
  IsDateString,
  IsInt,
  Min,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MaxLength(50)
  username: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;

  @IsOptional()
  @IsDateString()
  dateOfBirth?: Date;

  @IsString()
  @MaxLength(100)
  address: string;

  @IsString()
  @MaxLength(10)
  gender: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  note?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  imageUrl?: string;

  @IsOptional()
  @IsString()
  telegramChatId?: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsBoolean()
  isAdmin?: boolean;

  @IsOptional()
  @IsInt()
  @Min(0)
  loginCount?: number;

  @IsOptional()
  @IsDateString()
  lastLogin?: Date;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  lastIP?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsDateString()
  lastSeen?: Date;

  @IsOptional()
  @IsString()
  lastUserAgent?: string;

  @IsOptional()
  @IsString()
  deviceType?: string;

  @IsOptional()
  @IsString()
  deviceModel?: string;

  @IsOptional()
  @IsString()
  osName?: string;

  @IsOptional()
  @IsString()
  browserName?: string;
}
