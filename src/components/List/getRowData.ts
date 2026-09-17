import type { Legislator } from "../../types/LegislatorSchema";
import type { RowData } from "../../types/RowData";

export default function getRowData(data: Legislator[]): RowData[] {
    const selectedData = data.map(member => {
        const name = member.currentData.name;

        return {
            name: name.official_full
                ?? `${member.currentData.name.first} ${member.currentData.name.last}`,

            ...member.currentData.id,
            ...member.currentData.name,
            ...member.currentData.bio,
            ...member.currentData.terms.at(-1),
            // // party_affiliations: currentTerm?.party_affiliations,
            leadership: member.currentData.leadership_roles?.at(-1)?.title,
            ...member.socialData?.social,
        };
    })
    return selectedData;
}