import type { Legislator } from "../../types/LegislatorSchema";
import type { RowData } from "../../types/RowData";

export default function getRowData(data: Legislator[]): RowData[] {
    const selectedData = data.map(member => {
        const name = member.currentData.name;
        const id = member.currentData.id;
        const bio = member.currentData.bio;
        const currentTerm = member.currentData.terms.at(-1);
        const currentLeadership = member.currentData.leadership_roles?.at(-1);
        const social = member.socialData?.social;

        return {
            name: name.official_full ?? `${member.currentData.name.first} ${member.currentData.name.last}`,
            bioguide: id.bioguide,
            thomas: id.thomas,
            lis: id.lis,
            govtrack: id.govtrack,
            opensecrets: id.opensecrets,
            votesmart: id.votesmart,
            // fec: string[],
            cspan: id.cspan,
            wikipedia: id.wikipedia,
            house_history: id.house_history,
            ballotpedia: id.ballotpedia,
            maplight: id.maplight,
            icpsr: id.icpsr,
            wikidata: id.wikidata,
            google_entity_id: id.google_entity_id,
            pictorial: id.pictorial,

            first: name.first,
            last: name.last,
            official_full: name.official_full,
            middle: name.middle,
            nickname: name.nickname,
            suffix: name.suffix,

            birthday: bio.birthday,
            gender: bio.gender,

            type: currentTerm?.type,
            start: currentTerm?.start,
            end: currentTerm?.end,
            state: currentTerm?.state,
            district: currentTerm?.district,
            party: currentTerm?.party,
            class: currentTerm?.class,
            url: currentTerm?.url,
            address: currentTerm?.address,
            phone: currentTerm?.phone,
            fax: currentTerm?.fax,
            contact_form: currentTerm?.contact_form,
            office: currentTerm?.office,
            state_rank: currentTerm?.state_rank,
            rss_url: currentTerm?.rss_url,
            caucus: currentTerm?.caucus,
            how: currentTerm?.how,
            "end-type": currentTerm?.["end-type"],
            // party_affiliations: currentTerm.party_affiliations,
            leadership: currentLeadership?.title,

            twitter: social?.twitter,
            twitter_id: social?.twitter_id,
            facebook: social?.facebook,
            youtube: social?.youtube,
            youtube_id: social?.youtube_id,
            instagram: social?.instagram,
            instagram_id: social?.instagram_id,
            mastodon: social?.mastodon,
        };
    })
    return selectedData;
}