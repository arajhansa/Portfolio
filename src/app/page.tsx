import Image from "next/image";
import { SOCIALS } from "../data/socials";
import { SocialLink } from "@/components/social-link";
import { allBlogs } from "contentlayer/generated";
import { BlogCard } from "@/components/blog-card";
import React from "react";
import { LINKS } from "@/lib/constants";
import Link from "next/link";

export default function Home() {
  const blogs = allBlogs
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
    .slice(0, 2);

  return (
    <React.Fragment>
      <section className="mb-5">
        <Image
          src="/_static/me.jpg"
          width={100}
          height={100}
          alt="avatar"
          className="rounded-full cursor-pointer hover:grayscale mb-5"
          priority
        />
        <h1 className="text-2xl font-bold">Advay Rajhansa</h1>

        <div className="text-gray-700 dark:text-gray-300">
          <p className="mt-4">
            I am an enthusiastic software developer who excels at the convergence
            of backend architecture, frontend craftsmanship, and cloud infrastructure.
          </p>
          <p className="mt-4 mb-4">
            Clean code, smart abstractions, and developer experience are fundamental
            to how I approach my job. I like working with schema-driven design,
            infrastructure-as-code, and modular components that promote reuse and clarity.
            I am especially interested in AI/ML integration, having previously worked
            with LLMs, model fine-tuning, and retrieval-augmented generation (RAG) in
            production settings. My expertise includes frontend ecosystems, microservices,
            real-time systems, and cloud-native deployments in sectors such as insurance,
            hotels, and health technology.
          </p>

          <p className="mb-4">
            I appreciate creating systems that are not just useful, but also elegant,
            scalable, and easy to maintain. Whether it's developing APIs, improving
            CI/CD processes, or integrating AI into production settings, I am passionate
            about providing tools and platforms that make development easier and more
            intelligent.
          </p>

          <p className="mb-4">
            If you&apos;d like to collaborate, please&nbsp;
            <a
              href="mailto:advay@rajhansa.in"
              className="border-b inline-block"
            >
              send me an email
            </a>
            &nbsp;or reach out on any of my social handles.
          </p>
        </div>

        <div className="flex space-x-4 mb-2 mt-4">
          {SOCIALS.map((social) => (
            <SocialLink
              key={social.label}
              aria-label={`Follow on ${social.label}`}
              href={social.href}
              icon={social.icon}
            />
          ))}
        </div>
        <p className="mt-4 border-b inline-block cursor-pointer">
          <a href={LINKS.RESUME} target="_blank" rel="noopener noreferrer">
            View Resume
          </a>
        </p>
      </section>

      <div className="my-8 w-full border-t border-gray-200 dark:border-gray-800" />

      <div>
        <h2 className="mb-6 text-2xl font-bold">Latest posts</h2>
        <ul>
          {blogs.map((blog) => (
            <li key={blog.slug} className="py-1">
              <Link href={`/blog/${blog.slug}`}>
                <BlogCard blog={blog} key={blog.slug} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </React.Fragment>
  );
}
