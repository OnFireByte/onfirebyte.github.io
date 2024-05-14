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
    class={`fixed z-50 flex h-16 w-full  items-center justify-between  bg-mainlight  transition-all 
     duration-500 ease-in-out lg:px-[20%] print:hidden ${
         show ? "" : "translate-y-[-100%]"
     }`}
>
    <a
        href="/"
        class={`flex h-full items-end justify-center bg-maindark px-4 text-2xl font-bold text-mainlight transition-all ${
            isMobile ? "w-20" : "w-40"
        }
        `}
    >
        {#if isMobile}
            pk_
        {:else}
            pkpt.dev_
        {/if}
    </a>
    <div class="flex h-full gap-0">
        <NavButton href="/resume">
            <Briefcase class="mr-2 block h-5 w-5 border-maindark" />
            resume
        </NavButton>
        <NavButton href="/blog">
            <Pen class="mr-2 block h-5 w-5 border-maindark" />
            blog
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
