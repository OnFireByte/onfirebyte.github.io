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
    class="fixed z-50 flex h-16 w-full items-center justify-between border-b-2 border-maindark bg-mainlight print:hidden"
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
            <object
                data={BusinessIcon.src}
                class="mr-2 w-5 border-maindark"
                title="Resume"
            />
            resume
        </NavButton>
        <NavButton href="/blog">
            <object data={PenIcon.src} class="mr-2 w-5" title="Resume" />
            blog
        </NavButton>
        <NavButton href="/contact">
            <object
                data={AddressBookIcon.src}
                class="mr-2 w-5"
                title="Resume"
            />
            contact
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
