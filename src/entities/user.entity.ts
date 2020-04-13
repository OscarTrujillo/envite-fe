import { Expose } from 'class-transformer';

export class UserEntity {

    @Expose()
    public id!: string;

    @Expose()
    public username!: string;

}
