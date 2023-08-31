import { defineCollection, z } from "astro:content";

// 2. Define a `type` and `schema` for each collection
const blogCollection = defineCollection({
    type: "content", // v2.5.0 and later
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            tags: z.array(z.string()),
            cover: image().optional(),
            date: z.date(),
            image_position: z
                .enum([
                    "object-bottom",
                    "object-center",
                    "object-left",
                    "object-left-bottom",
                    "object-left-top",
                    "object-right",
                    "object-right-bottom",
                    "object-right-top",
                    "object-top",
                ])
                .default("object-center"),
        }),
});

// 3. Export a single `collections` object to register your collection(s)
export const collections = {
    blog: blogCollection,
};
