import z from "zod";
import { LegislatorCurrentSchema } from "./LegislatorCurrentSchema";
import { LegislatorSocialMediaSchema } from "./LegislatorSocialMediaSchema";
import { LegislatorDistrictOfficeSchema } from "./LegislatorDistrictOfficeSchema";

export const LegislatorSchema = z.object({
    currentData: LegislatorCurrentSchema,
    socialData: LegislatorSocialMediaSchema.optional(),
    officeData: LegislatorDistrictOfficeSchema.optional(),
});
export type Legislator = z.infer<typeof LegislatorSchema>;