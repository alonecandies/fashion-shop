/* eslint-disable @next/next/no-img-element */
// import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link';
import { IBlog } from '@src/features/blog/blog.types';
import { slugify } from '@src/utils';
import { useEffect } from 'react';
import { ROUTES } from '@src/configs';
import placeholder_banner from 'public/assets/images/placeholder_banner.jpg';

interface Props {
  blog: IBlog;
}

const BlogCard: React.FC<Props> = ({ blog }) => {
  const [slug, setSlug] = useState(blog.id.toString());
  useEffect(() => {
    if (blog.title === '') {
    } else if (blog.title.length > 200) {
      const newTitle = blog.title.slice(200);
      setSlug(slugify(newTitle) + blog.id);
    } else {
      setSlug(slugify(blog.title) + '-' + blog.id);
    }
  }, [blog]);

  return (
    <>
      {!!blog && (
        <Link href={`${ROUTES.blog}/${slug}`}>
          <a>
            <div className="blogcard">
              {!!blog.imageUrl ? (
                <img src={blog.imageUrl} data-src={blog.imageUrl} alt={blog.title} />
              ) : (
                <img src={placeholder_banner.src} alt={blog.title} />
              )}
              <span className="blogcard__title">{blog.title}</span>
            </div>
          </a>
        </Link>
      )}
    </>
  );
};
export default BlogCard;
