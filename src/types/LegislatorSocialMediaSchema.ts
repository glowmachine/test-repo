import z from "zod";

export const IDSchema = z.object({
    bioguide: z.coerce.string(),
    thomas: z.coerce.string().optional(),
    govtrack: z.coerce.string().optional(),
});

export const SocialSchema = z.object({
    twitter: z.coerce.string().optional(),
    facebook: z.coerce.string().optional(),
    youtube_id: z.coerce.string().optional(),
    twitter_id: z.coerce.string().optional(),
    youtube: z.coerce.string().optional(),
    instagram: z.coerce.string().optional(),
    instagram_id: z.coerce.string().optional(),
    mastodon: z.coerce.string().optional(),
});

export const LegislatorSocialMediaSchema = z.object({
    id: IDSchema,
    social: SocialSchema,
});

export type ID = z.infer<typeof IDSchema>;
export type Social = z.infer<typeof SocialSchema>;
export type LegislatorSocialMedia = z.infer<typeof LegislatorSocialMediaSchema>;