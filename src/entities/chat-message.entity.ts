import { Expose } from 'class-transformer';

export class ChatMessageEntity {

    // todo: username 
    @Expose()
    public name!: string;

    @Expose()
    public message!: string;

}
