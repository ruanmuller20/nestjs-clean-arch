import { IsNotEmpty, IsString, MaxLength, IsNumber, IsDate, IsOptional, IsEmail } from 'class-validator';
import { UserProps } from '../entities/user.entity';
import { ClassValidatorFields } from '../../../shared/validators/class-validator-fields';


export class UserRules{
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()

  name: string;
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  password: string;


  @IsDate()
  @IsOptional()
  createdAt?: Date;


  constructor({email, name, password, createdAt }: UserProps){
    Object.assign(this, {email, name, password, createdAt });

  }
}

export class UserValidator extends ClassValidatorFields<UserRules> {
  validate(data: UserProps): boolean {
    return super.validate(new UserRules(data ?? {} as UserProps));
  }
}



export class UserValidatorFactory {
  static create(): UserValidator {
    return new UserValidator();
  }
}



