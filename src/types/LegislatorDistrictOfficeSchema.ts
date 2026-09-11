import z from "zod";

export const IDSchema = z.object({
    bioguide: z.coerce.string(),
    thomas: z.coerce.string().optional(),
    govtrack: z.coerce.string().optional(),
});

export const OfficeSchema = z.object({
    id: z.coerce.string().optional(),
    address: z.coerce.string().optional(),
    suite: z.coerce.string().optional(),
    city: z.coerce.string().optional(),
    state: z.coerce.string().optional(),
    zip: z.coerce.string().optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    fax: z.coerce.string().optional(),
    phone: z.coerce.string().optional(),
    building: z.coerce.string().optional(),
    hours: z.coerce.string().optional(),
});
// export const officeKeys = ['id', 'address', 'suite', 'city', 'state',
//     'zip', 'latitude', 'longitude', 'fax', 'phone', 'building', 'hours',
// ];
// export const OfficeSchema = z.object({
//     latitude: z.coerce.number().optional(),
//     longitude: z.coerce.number().optional(),
//     ...Object.fromEntries(officeKeys
//         .filter(key => !['latitude', 'longitude'].includes(key))
//         .map(key => [key, z.coerce.string().optional()]))
// });

export const LegislatorDistrictOfficeSchema = z.object({
    id: IDSchema,
    offices: z.array(OfficeSchema),
});

export type ID = z.infer<typeof IDSchema>;
export type Office = z.infer<typeof OfficeSchema>;
export type LegislatorDistrictOffice = z.infer<typeof LegislatorDistrictOfficeSchema>;