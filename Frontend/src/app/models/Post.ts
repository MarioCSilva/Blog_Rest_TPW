import {Client} from './Client';
import {Blog} from './Blog';

export class Post{
    id: number;
    title: string;
    client: Client;
    date: Date;
    image: string;
    text: string;
    blog: Blog;
    likes: Client[];
}
