import z from "zod";

export const IDSchema = z.object({
    bioguide: z.coerce.string(),
    thomas: z.coerce.string().optional(),
    lis: z.coerce.string().optional(),
    govtrack: z.coerce.string().optional(),
    opensecrets: z.coerce.string().optional(),
    votesmart: z.coerce.string().optional(),
    fec: z.array(z.coerce.string()).optional(),
    cspan: z.coerce.string().optional(),
    wikipedia: z.coerce.string().optional(),
    house_history: z.coerce.string().optional(),
    ballotpedia: z.coerce.string().optional(),
    maplight: z.coerce.string().optional(),
    icpsr: z.coerce.string().optional(),
    wikidata: z.coerce.string().optional(),
    google_entity_id: z.coerce.string().optional(),
    pictorial: z.coerce.string().optional(),
});
// export const idKeys = ['bioguide', 'thomas', 'lis', 'govtrack', 'opensecrets',
//     'votesmart', 'fec', 'cspan', 'wikipedia', 'house_history', 'ballotpedia',
//     'maplight', 'icpsr', 'wikidata', 'google_entity_id', 'pictorial',
// ] as const;
// export const IDSchema = z.object({
//     bioguide: z.coerce.string(),
//     fec: z.array(z.string()).default(""),
//     ...(Object.fromEntries(idKeys
//         .filter(key => !['bioguide', 'fec'].includes(key))
//         .map(key => [key, z.coerce.string().default("")] as const))
//     )
// });

export const NameSchema = z.object({
    first: z.coerce.string().optional(),
    last: z.coerce.string().optional(),
    official_full: z.coerce.string().optional(),
    middle: z.coerce.string().optional(),
    nickname: z.coerce.string().optional(),
    suffix: z.coerce.string().optional(),
});
// export const nameKeys = ['first', 'last', 'official_full', 'middle', 'nickname', 'suffix'];
// export const NameSchema = z.object({
//     ...Object.fromEntries(nameKeys.map(key => [key, z.coerce.string().default("")]))
// });

export const BioSchema = z.object({
    birthday: z.coerce.string().optional(),
    gender: z.coerce.string().optional(),
});

export const FamilySchema = z.object({
    name: z.coerce.string().optional(),
    relation: z.coerce.string().optional(),
});

export const PartyAffiliationSchema = z.object({
    start: z.coerce.string().optional(),
    end: z.coerce.string().optional(),
    party: z.coerce.string().optional(),
    caucus: z.coerce.string().optional(),
});

export const TermSchema = z.object({
    type: z.coerce.string().optional(),
    start: z.coerce.string().optional(),
    end: z.coerce.string().optional(),
    state: z.coerce.string().optional(),
    district: z.coerce.number().optional(),
    class: z.coerce.number().optional(),
    party: z.coerce.string().optional(),
    state_rank: z.coerce.string().optional(),
    url: z.coerce.string().optional(),
    address: z.coerce.string().optional(),
    phone: z.coerce.string().optional(),
    fax: z.coerce.string().optional(),
    contact_form: z.coerce.string().optional(),
    office: z.coerce.string().optional(),
    rss_url: z.coerce.string().optional(),
    caucus: z.coerce.string().optional(),
    how: z.coerce.string().optional(),
    "end-type": z.coerce.string().optional(),
    party_affiliations: z.array(PartyAffiliationSchema).optional(),
});
// export const termKeys = ['type', 'start', 'end', 'state', 'district', 'party',
//     'class', 'url', 'address', 'phone', 'fax', 'contact_form', 'office',
//     'state_rank', 'rss_url', 'caucus', 'how', 'end-type', 'party_affiliations',
// ]
// export const TermSchema = z.object({
//     party_affiliations: z.array(PartyAffiliationSchema).default(""),
//     ...Object.fromEntries(termKeys
//         .filter(key => !['party_affiliations'].includes(key))
//         .map(key => [key, z.coerce.string().default("")])
//     )
// });

export const LeadershipRoleSchema = z.object({
    title: z.coerce.string().optional(),
    chamber: z.coerce.string().optional(),
    start: z.coerce.string().optional(),
    end: z.coerce.string().optional(),
});

export const LegislatorCurrentSchema = z.object({
    id: IDSchema,
    name: NameSchema,
    bio: BioSchema,
    family: z.array(FamilySchema).optional(),
    terms: z.array(TermSchema),
    leadership_roles: z.array(LeadershipRoleSchema).optional(),
});


export type ID = z.infer<typeof IDSchema>;
export type Name = z.infer<typeof NameSchema>;
export type Bio = z.infer<typeof BioSchema>;
export type Family = z.infer<typeof FamilySchema>;
export type PartyAffiliation = z.infer<typeof PartyAffiliationSchema>;
export type Term = z.infer<typeof TermSchema>;
export type LeadershipRole = z.infer<typeof LeadershipRoleSchema>;
export type LegislatorCurrent = z.infer<typeof LegislatorCurrentSchema>;