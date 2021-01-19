import {Client} from './Client';
import {Blog} from './Blog';
import {Comment} from './Comment';
export class Post{
    id: number;
    title: string;
    client: Client;
    date: Date;
    image: string;
    text: string;
    blog: Blog;
    likes: Client[];
    liked?: boolean;
    comments?: Comment[];
}
