import {Client} from './Client';
import {Post} from './Post';

export class Comment{
    id: number;
    text: string;
    client: Client;
    date: Date;
    post: Post;
    username?: string;
}
