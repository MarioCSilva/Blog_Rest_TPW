import {Client} from './Client';
import {Blog} from './Blog';

export class Post{
    title: string;
    client: Client;
    date: Date;
    image: File;
    text: string;
    blog: Blog;
    likes: Client[];
}
