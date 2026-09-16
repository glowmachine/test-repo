import { useNavigate } from "react-router";

export default function About() {
    const navigate = useNavigate();

    return (
        <div className='min-w-0 h-full overflow-auto px-5 pb-5 flex flex-col gap-3 link-btn'>
            <button
                onClick={() => navigate(-1)}
                className='mt-2 shrink-0 w-10 h-10 rounded-full grid place-items-center
                hover:bg-zinc-200 active:bg-zinc-300
                dark:hover:bg-zinc-700 dark:active:bg-zinc-600'>
                <span className='material-symbols-outlined'>arrow_back</span>
            </button>
            <div className='flex justify-center'>
                <section className='w-[min(1000px,80vw)] flex flex-col gap-3 sm:gap-6 *:text-lg'>
                    <div>
                        <h2 className='font-bold text-2xl'>About the USCL Viewer</h2>
                        <p>The "United States Congress Legislators Viewer" uses data directly from <a href='https://github.com/unitedstates/congress-legislators' target='_blank' rel='noopener noreferrer' className='underline'>unitedstates/congress-legislators</a>, a public GitHub repo of congressional data maintained by volunteers. This site takes the records of current Congress members and formats them for simpler browsing, making it easier to search and check for info that may need updating. USCLV is an independent project.</p>
                    </div>
                    <div>
                        <h2 className='font-bold text-2xl'>Feedback</h2>
                        <ul className='ml-4 list-disc'>
                            <li>If you have found any bugs to report or features to request, please <a href='https://github.com/glowmachine/uscl-viewer' target='_blank' rel='noopener noreferrer' className='underline'>open a GitHub issue</a>.</li>
                            <li>If you have found any information in need of updating, please consider contributing to the <a href='https://github.com/unitedstates/congress-legislators' target='_blank' rel='noopener noreferrer' className='underline'>unitedstates/congress-legislators</a> project.</li>
                        </ul>
                    </div>
                </section>
            </div>
        </div>
    );
}