import { Expose } from 'class-transformer';

export class ChatMessageEntity {

    // todo: username 
    @Expose()
    public userName!: string;

    @Expose()
    public message!: string;

}
