<script lang="ts">
    import NavButton from "@/components/NavButton.svelte";
    import AddressBookIcon from "@/icons/address-book-solid.svg";
    import BusinessIcon from "@/icons/briefcase-solid.svg";
    import PenIcon from "@/icons/pen-solid.svg";

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
        <NavButton href="/resume"
            ><object
                data={BusinessIcon.src}
                class="w-5 mr-2 border-maindark"
                title="Resume"
            />resume</NavButton
        >
        <NavButton href="/blog"
            ><object data={PenIcon.src} class="w-5 mr-2" title="Resume" />blog</NavButton
        >
        <NavButton href="/contact"
            ><object data={AddressBookIcon.src} class="w-5 mr-2" title="Resume" />contact</NavButton
        >
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
