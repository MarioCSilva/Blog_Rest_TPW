import {Client} from './Client';
import {Topic} from './Topic';

export class Blog{
    name: string;
    owner: Client;
    subs: Client[];
    blog_pic: File;
    isPublic: boolean;
    invites: Client[];
    description: string;
    topic: Topic;
}
