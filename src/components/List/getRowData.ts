import type { Legislator } from "../../types/LegislatorSchema";
import type { LeadershipRole } from "../../types/LegislatorCurrentSchema";
import type { RowData } from "../../types/RowData";

function getLeadershipRole(terms: LeadershipRole[] | undefined): string | undefined {
    if (!terms || terms[terms.length - 1].end) return;
    return terms[terms.length - 1].title;
}

export default function getRowData(data: Legislator[]): RowData[] {
    const selectedData = data.map(member => {
        const currentTerm = member.currentData.terms[member.currentData.terms.length - 1];

        return {
            name: `${member.currentData.name.first} ${member.currentData.name.last}`,

            bioguide: member.currentData.id.bioguide,
            thomas: member.currentData.id.thomas,
            lis: member.currentData.id.lis,
            govtrack: String(member.currentData.id.govtrack),
            opensecrets: member.currentData.id.opensecrets,
            votesmart: member.currentData.id.votesmart ? String(member.currentData.id.votesmart) : undefined,
            // fec: string[],
            cspan: member.currentData.id.cspan ? String(member.currentData.id.cspan) : undefined,
            wikipedia: member.currentData.id.wikipedia,
            house_history: member.currentData.id.house_history ? String(member.currentData.id.house_history) : undefined,
            ballotpedia: member.currentData.id.ballotpedia,
            maplight: member.currentData.id.maplight ? String(member.currentData.id.maplight) : undefined,
            icpsr: member.currentData.id.icpsr ? String(member.currentData.id.icpsr) : undefined,
            wikidata: member.currentData.id.wikidata,
            google_entity_id: member.currentData.id.google_entity_id,
            pictorial: member.currentData.id.pictorial ? String(member.currentData.id.pictorial) : undefined,

            first: member.currentData.name.first,
            last: member.currentData.name.last,
            official_full: member.currentData.name.official_full,
            middle: member.currentData.name.middle,
            nickname: member.currentData.name.nickname,
            suffix: member.currentData.name.suffix,

            birthday: member.currentData.bio.birthday,
            gender: member.currentData.bio.gender,

            type: currentTerm.type,
            start: currentTerm.start,
            end: currentTerm.end,
            state: currentTerm.state,
            district: currentTerm.district,
            party: currentTerm.party,
            class: currentTerm.class,
            url: currentTerm.url,
            address: currentTerm.address,
            phone: currentTerm.phone,
            fax: currentTerm.fax,
            contact_form: currentTerm.contact_form,
            office: currentTerm.office,
            state_rank: currentTerm.state_rank,
            rss_url: currentTerm.rss_url,
            caucus: currentTerm.caucus,
            how: currentTerm.how,
            "end-type": currentTerm["end-type"],
            // party_affiliations: currentTerm.party_affiliations,
            leadership: getLeadershipRole(member.currentData.leadership_roles),

            twitter: member.socialData?.social.twitter,
            twitter_id: member.socialData?.social.twitter_id,
            facebook: member.socialData?.social.facebook,
            youtube: member.socialData?.social.youtube,
            youtube_id: member.socialData?.social.youtube_id,
            instagram: member.socialData?.social.instagram,
            instagram_id: member.socialData?.social.instagram_id,
            mastodon: member.socialData?.social.mastodon,
        };
    })
    return selectedData;
}