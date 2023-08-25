<script lang="ts">
    import NavButton from "@/components/NavButton.svelte";

    let screenSize: number;
    $: isMobile = screenSize < 768;
    $: {
        console.log(screenSize);
    }
</script>

<svelte:window bind:innerWidth={screenSize} />
<nav
    class="h-16 w-full bg-mainlight border-b-2 border-maindark fixed flex items-center justify-between z-50 print:hidden"
>
    <a
        href="/"
        class="text-2xl font-bold px-4 bg-maindark h-full text-mainlight flex items-end transition-all"
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
