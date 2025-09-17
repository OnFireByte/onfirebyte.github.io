<script lang="ts">
    import NavButton from "@/components/NavButton.svelte";
    import Briefcase from "@/icons/Briefcase.svelte";
    import Human from "@/icons/Human.svelte";
    import Mountain from "@/icons/Mountain.svelte";
    import Pen from "@/icons/Pen.svelte";
    import { onMount } from "svelte";

    let screenSize: number;
    $: isMobile = screenSize < 768;

    let scrollY: number = 0;
    let show: boolean = true;

    onMount(() => {
        window.addEventListener("scroll", () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > scrollY && currentScrollY > 100) {
                show = false;
            } else {
                show = true;
            }
            scrollY = currentScrollY;
        });
    });
</script>

<svelte:window bind:innerWidth={screenSize} />

<nav
    class={`fixed bottom-0 z-50 flex h-20 w-full items-center justify-between
     bg-mainlight transition-all duration-500 ease-in-out sm:bottom-auto sm:top-0
     sm:h-16 xl:mx-4 xl:h-auto xl:w-auto xl:flex-col
     xl:items-start
     xl:gap-2
     xl:bg-transparent
     xl:px-4
     print:hidden
     ${show ? "" : "translate-y-[100%] sm:translate-y-[-100%] xl:translate-y-[0%]"}`}
>
    <a
        href="/"
        class={`xl:hover:text hidden h-16 w-20
        items-end justify-center px-4
        text-2xl font-bold text-maindark
        decoration-wavy
        transition-all
        [view-transition-name:nav-name]
        sm:flex
        sm:w-40
        xl:mt-6
        xl:h-fit
        xl:justify-start
        xl:rounded-lg
    xl:bg-transparent xl:p-4
    xl:hover:bg-select xl:hover:font-extrabold
        `}
    >
        pkpt.dev_
    </a>
    <div
        class="flex h-full w-full items-center
        justify-between
        gap-2 rounded-lg px-8
        [view-transition-name:nav-menu] sm:w-auto sm:px-4 md:items-start xl:flex-col xl:gap-2
        xl:p-2
        "
    >
        <NavButton href="/" class="sm:hidden">
            <Mountain class="block h-8 group-hover/button:animate-wiggle" />
            <span>Home</span>
        </NavButton>
        <NavButton href="/blog">
            <Pen class="block h-8 group-hover/button:animate-wiggle" />
            <span>Blog</span>
        </NavButton>
        <NavButton href="/resume.pdf" target="_blank">
            <Briefcase
                class="
                block h-8
                transition-all
                group-hover/button:animate-wiggle"
            />
            <span>Resume</span>
        </NavButton>

        <NavButton href="/me">
            <span>
                <Human
                    class="
            h-8
            transition-all
            group-hover/button:animate-wiggle"
                />
            </span>
            <span>Me</span>
        </NavButton>
    </div>
</nav>

<div class="hidden h-16 md:block print:h-0"></div>

<style scoped>
    @keyframes cursor-blink {
        50% {
            opacity: 0;
        }
    }

    .blink {
        animation: cursor-blink 2s steps(1) infinite;
    }
</style>
