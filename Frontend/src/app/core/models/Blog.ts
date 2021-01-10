import {Client} from './Client';
import {Topic} from './Topic';
import {Post} from "./Post";

export class Blog{
    id: number;
    name: string;
    owner: Client;
    subs: Client[];
    blog_pic: string;
    isPublic: boolean;
    invites: Client[];
    description: string;
    topic: Topic[];
    posts: Post[];
    personal?: boolean;
    permission?: boolean;
    subbed?: boolean;
    update?: [];
}
