import {Client} from './Client';
import {Post} from './Post';

export class Comment{
    text: string;
    client: Client;
    date: Date;
    post: Post;
}
