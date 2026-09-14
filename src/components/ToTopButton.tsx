type ToTopButtonProps = {
    div: React.RefObject<HTMLDivElement | null>,
    style: string,
}
export default function ToTopButton({ div, style }: ToTopButtonProps) {
    return <button className={`fixed right-5 bottom-5 sm:right-15 sm:bottom-10 text-2xl
        bg-white dark:bg-zinc-800 ${style} text-zinc-600 dark:text-zinc-300`}
        onClick={() => div.current?.scrollTo({ top: 0, behavior: 'smooth' })}>
        ↑
    </button>;
}