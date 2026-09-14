import type { Row } from "../../types/Row";
import type { RowData } from "../../types/RowData";

export default function buildLink(key: keyof RowData, row: Row): string | undefined {
    switch (key) {
        case 'bioguide': return `https://bioguide.congress.gov/search/bio/${row.bioguide}`
        //thomas.gov superceeded by congress.gov, name string inconsident and some now using bioguide instead of thomas ID
        //case 'thomas': return `https://www.congress.gov/member/${[row.first, row.last].join(' ').toLowerCase().replace(' ', '-')}/${row.thomas}`
        //case 'lis':
        //case 'fec':
        case 'govtrack': return `https://www.govtrack.us/congress/members/${row.govtrack}`
        case 'opensecrets': return `https://www.opensecrets.org/profiles/${[row.first, row.last].join(' ').toLowerCase().replace(' ', '-')}/us_congress/summary?mpid=${row.opensecrets}`
        //unable to search votesmart
        // case 'votesmart':
        case 'icpsr': return `https://voteview.com/person/${row.icpsr}`;
        //cspan path appears to be depreciated
        // case 'cspan': return `https://www.c-span.org/person/${row.cspan}`;
        case 'wikipedia': return `https://wikipedia.org/wiki/${row.wikipedia}`;
        case 'ballotpedia': return `https://ballotpedia.org/${row.ballotpedia}`;
        // unable to search maplight
        // case 'maplight':
        case 'house_history': return `https://history.house.gov/People/Detail/${row.house_history}`;
        case 'wikidata': return `https://www.wikidata.org/wiki/${row.wikidata}`;
        // unable to search google
        // case 'google_entity_id':

        case 'url': return `${row.url}`;
        case 'contact_form': return `${row.contact_form}`;

        case 'twitter': return `https://twitter.com/${row.twitter}`;
        //twitter_id path appears to be depreciated
        // case 'twitter_id': return `https://twitter.com/${row.twitter_id}`;
        case 'facebook': return `https://facebook.com/${row.facebook}`;
        case 'youtube': return `https://youtube.com/user/${row.youtube}`;
        case 'youtube_id': return `https://youtube.com/channel/${row.youtube_id}`;
        case 'instagram': return `https://www.instagram.com/${row.instagram}`;
        //instagram_id path appears to be depreciated 
        // case 'instagram_id': return `https://www.instagram.com/${row.instagram_id}`;
        case 'mastodon': return `https://mastodon.social/${row.mastodon}`;
        default: return undefined;
    }
}