import { defineCollection, z } from 'astro:content';

const courseSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  phase: z.string(),
  module: z.string().optional(),
  order: z.number().default(0),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced', 'expert']).default('beginner'),
  estimatedTime: z.string().optional(),
  prerequisites: z.array(z.string()).default([]),
  objectives: z.array(z.string()).default([]),
  published: z.boolean().default(true),
});

export const collections = {
  'fase-0-fundamentos': defineCollection({ schema: courseSchema }),
  'fase-1-preflop': defineCollection({ schema: courseSchema }),
  'fase-2-postflop': defineCollection({ schema: courseSchema }),
  'fase-3-avanzado': defineCollection({ schema: courseSchema }),
  'fase-4-especializado': defineCollection({ schema: courseSchema }),
  'fase-5-maestria': defineCollection({ schema: courseSchema }),
};
