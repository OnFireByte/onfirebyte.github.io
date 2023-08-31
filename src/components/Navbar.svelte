<script lang="ts">
    import NavButton from "@/components/NavButton.svelte";

    let screenSize: number;
    $: isMobile = screenSize < 768;
</script>

<svelte:window bind:innerWidth={screenSize} />
<nav
    class="h-16 w-full bg-mainlight border-b-2 border-maindark fixed flex items-center justify-between z-50 print:hidden"
>
    <a
        href="/"
        class={`text-2xl font-bold px-4 bg-maindark h-full text-mainlight flex items-end transition-all justify-center ${
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
    <div class="flex gap-0 h-full">
        <NavButton href="/resume">resume</NavButton>
        <NavButton href="/blog">blog</NavButton>
        <NavButton href="/contact">contact</NavButton>
    </div>
</nav>

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
