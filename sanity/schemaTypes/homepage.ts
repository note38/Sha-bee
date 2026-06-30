import { defineField, defineType } from 'sanity'

export const homepageSchema = defineType({
    name: 'homepage',
    title: 'Homepage',
    type: 'document',
    fields: [
        defineField({
            name: 'heroHeading',
            title: 'Hero Heading',
            type: 'string',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'heroSubheading',
            title: 'Hero Subheading',
            type: 'text',
            rows: 2,
        }),
        defineField({
            name: 'heroCtaLabel',
            title: 'Hero Button Label',
            type: 'string',
            initialValue: 'Shop Now',
        }),
        defineField({
            name: 'heroCtaLink',
            title: 'Hero Button Link',
            type: 'string',
            initialValue: '/products',
        }),
        defineField({
            name: 'heroImage',
            title: 'Hero Background Image',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'featuredProducts',
            title: 'Featured Products',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'product' }] }],
            validation: Rule => Rule.max(8),
        }),
        defineField({
            name: 'featuredCategories',
            title: 'Featured Categories',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'category' }] }],
            validation: Rule => Rule.max(6),
        }),
    ],
})