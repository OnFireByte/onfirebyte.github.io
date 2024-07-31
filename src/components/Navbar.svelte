<script lang="ts">
    import NavButton from "@/components/NavButton.svelte";
    import Briefcase from "@/icons/Briefcase.svelte";
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
    class={`fixed z-50 flex w-full items-center justify-between bg-mainlight
     transition-all duration-500 ease-in-out xl:mx-4
     xl:h-auto xl:w-auto xl:flex-col xl:items-start xl:gap-2
     xl:bg-transparent
     xl:px-4
     print:hidden
     ${show ? "" : "translate-y-[-100%] xl:translate-y-[0%]"}`}
>
    <a
        href="/"
        class={`xl:hover:text flex h-16 items-end justify-center
        px-4 text-2xl font-bold
        text-maindark decoration-wavy transition-all
        [view-transition-name:nav-name]
        xl:mt-6
        xl:h-fit
        xl:justify-start
        xl:rounded-lg
        xl:bg-transparent
        xl:p-4
        xl:hover:bg-select
        xl:hover:font-extrabold
        ${isMobile ? "w-20" : "w-40"}
        `}
    >
        {#if isMobile}
            pk_
        {:else}
            pkpt.dev_
        {/if}
    </a>
    <div
        class="flex h-full gap-2 rounded-lg px-4
        [view-transition-name:nav-menu] xl:flex-col xl:gap-2
        xl:p-2
        "
    >
        <NavButton href="/resume">
            <Briefcase
                class="
                block h-8
                transition-all
                group-hover/button:animate-wiggle"
            />
            Resume
        </NavButton>
        <NavButton href="/blog">
            <Pen class="block h-8 group-hover/button:animate-wiggle" />
            Blog
        </NavButton>
    </div>
</nav>
<div class="h-16 print:h-0" />

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
