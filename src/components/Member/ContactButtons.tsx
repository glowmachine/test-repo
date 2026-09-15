import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faMastodon, faXTwitter, faYoutube, type IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { faLink } from "@fortawesome/free-solid-svg-icons";
import type { Legislator } from "../../types/LegislatorSchema";
import type { Social } from "../../types/LegislatorSocialMediaSchema";

const buttonStyle = 'shrink-0 size-10 rounded-full grid place-items-center'

const socialKeys = [
    'twitter',
    'instagram',
    // 'instagram_id',
    'youtube',
    // 'youtube_id',
    'facebook',
    'mastodon',
] satisfies (keyof Social)[];
const buttonConfig: Record<keyof Social,
    {
        label: string,
        faIcon: IconDefinition,
        link: (id: string) => string, enabled: boolean
    }> = {
    twitter: {
        label: 'Twitter',
        faIcon: faXTwitter,
        link: (id) => `https://twitter.com/${id}`,
        enabled: true
    },
    twitter_id: {
        label: 'twitter_id',
        faIcon: faXTwitter,
        link: (id) => `https://twitter.com/${id}`,
        enabled: false
    },
    youtube: {
        label: 'youtube',
        faIcon: faYoutube,
        link: (id) => `https://youtube.com/user/${id}`,
        enabled: true
    },
    youtube_id: {
        label: 'youtube_id',
        faIcon: faYoutube,
        link: (id) => `https://youtube.com/channel/${id}`,
        enabled: true
    },
    instagram: {
        label: 'instagram',
        faIcon: faInstagram,
        link: (id) => `https://www.instagram.com/${id}`,
        enabled: true
    },
    instagram_id: {
        label: 'instagram_id',
        faIcon: faInstagram,
        link: (id) => `https://twitter.com/${id}`,
        enabled: true
    },
    facebook: {
        label: 'Facebook',
        faIcon: faFacebook,
        link: (id) => `https://facebook.com/${id}`,
        enabled: true
    },
    mastodon: {
        label: 'mastodon',
        faIcon: faMastodon,
        link: (id) => `https://mastodon.social/${id}`,
        enabled: true
    },
}

type ContactButtonsProps = {
    member: Legislator
}
export default function ContactButtons({ member }: ContactButtonsProps) {
    const socials = member.socialData?.social || {};
    return (
        <div className='flex flex-wrap justify-center gap-5'>
            <a
                href={member.currentData.terms[member.currentData.terms.length - 1].url}
                target='_blank' rel='noopener noreferrer'
                className={`${buttonStyle} bg-zinc-200 hover:bg-zinc-300
                    dark:bg-zinc-700 dark:hover:bg-zinc-600`}>
                <FontAwesomeIcon icon={faLink} />
            </a>
            {socialKeys.map(socialKey => {
                //button is disabled, skip
                if (!buttonConfig[socialKey].enabled) return null;

                //exception for instagram and youtube, use only one if both id exist
                if (socialKey === 'instagram' && socials['instagram_id']) {
                    return <a
                        href={buttonConfig['instagram_id'].link(socials['instagram_id'])}
                        target='_blank' rel='noopener noreferrer'
                        className={`${buttonStyle} text-zinc-700 bg-zinc-200 hover:bg-zinc-300
                            dark:text-zinc-100 dark:bg-zinc-500 dark:hover:bg-zinc-600`}
                        key={socialKey}>
                        <FontAwesomeIcon icon={buttonConfig[socialKey].faIcon} />
                    </a>
                }
                if (socialKey === 'youtube' && socials['youtube_id']) {
                    return <a
                        href={buttonConfig['youtube_id'].link(socials['youtube_id'])}
                        target='_blank' rel='noopener noreferrer'
                        className={`${buttonStyle} text-zinc-700 bg-zinc-200 hover:bg-zinc-300
                            dark:text-zinc-100 dark:bg-zinc-500 dark:hover:bg-zinc-600`}
                        key={socialKey}>
                        <FontAwesomeIcon icon={buttonConfig[socialKey].faIcon} />
                    </a>
                }

                return socials[socialKey]
                    ? <a
                        href={buttonConfig[socialKey].link(socials[socialKey])}
                        target='_blank' rel='noopener noreferrer'
                        className={`${buttonStyle} text-zinc-700 bg-zinc-200 hover:bg-zinc-300
                            dark:text-zinc-100 dark:bg-zinc-500 dark:hover:bg-zinc-600`}
                        key={socialKey}>
                        <FontAwesomeIcon icon={buttonConfig[socialKey].faIcon} />
                    </a>
                    : <a
                        className={`${buttonStyle} cursor-default text-zinc-300 bg-zinc-100
                            dark:text-zinc-600 dark:bg-zinc-700`}
                        key={socialKey}>
                        <FontAwesomeIcon icon={buttonConfig[socialKey].faIcon} />
                    </a>
            })}
        </div>
    )
}
