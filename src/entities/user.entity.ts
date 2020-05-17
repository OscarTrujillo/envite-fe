import { Expose } from 'class-transformer';

export class UserEntity {

    @Expose({ name: "_id" })
    public id!: string;

    @Expose()
    public username!: string;

    @Expose({ name: "nickname" })
    public nickName!: string;

}
