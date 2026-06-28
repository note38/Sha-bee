import { defineField, defineType } from 'sanity'

export const productSchema = defineType({
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
        defineField({
            name: 'name', title: 'Product Name', type: 'string',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'slug', type: 'slug',
            options: { source: 'name', maxLength: 96 },
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'price', title: 'Price (in cents)', type: 'number',
            description: 'e.g. 2999 = $29.99',
            validation: Rule => Rule.required().positive()
        }),
        defineField({
            name: 'images', title: 'Product Images', type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }],
            validation: Rule => Rule.min(1)
        }),
        defineField({
            name: 'description', type: 'array',
            of: [{ type: 'block' }]
        }),
        defineField({
            name: 'category', type: 'reference',
            to: [{ type: 'category' }]
        }),
        defineField({
            name: 'variants', type: 'array',
            of: [{
                type: 'object', name: 'variant',
                fields: [
                    { name: 'size', type: 'string' },
                    { name: 'color', type: 'string' },
                    { name: 'stock', type: 'number' },
                    { name: 'sku', type: 'string' },
                    {
                        name: 'priceAdjustment', type: 'number',
                        description: '0 = same as base price'
                    },
                ],
                preview: { select: { title: 'size', subtitle: 'color' } },
            }],
        }),
        defineField({
            name: 'inStock', type: 'boolean',
            initialValue: true
        }),
    ],
    preview: {
        select: { title: 'name', media: 'images.0', subtitle: 'price' },
        prepare({ title, media, subtitle }) {
            return {
                title, media,
                subtitle: subtitle ? `$${(subtitle / 100).toFixed(2)}` : 'No price'
            }
        },
    },
})