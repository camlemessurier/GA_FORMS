import { User } from './entities/User';
import { MikroORM } from '@mikro-orm/core';
import { __prod__ } from './constants';
import { Post } from './entities/Post';
import path from 'path';




export default {
        dbName: 'reddit',
        migrations:{
            path: path.join(__dirname, './migrations'), 
            pattern: /^[\w-]+\d+\.[tj]s$/,
        },
        user: 'camlemessurier',
        debug: !__prod__,
        type: "postgresql",
        entities: [Post, User]  
    } as Parameters<typeof MikroORM.init>[0];