import { BlogComment } from './blogComment';
/**
 * An iterface representing a blog.
 */
export interface Blog {
    title: string;
    time: Date;
    message: string;
    comments: BlogComment[];
}
