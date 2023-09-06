import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserdto } from './dto/create-user.dto';

@Controller('user')
export class UserController {

    @Post()
    async createUser(
        @Body() createUser : CreateUserdto
    ) {
        return {
        ... createUser,
        password: undefined
        }    
    }
 }

