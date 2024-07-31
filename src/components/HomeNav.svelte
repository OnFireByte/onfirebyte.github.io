<script lang="ts">
    import NavButton from "@/components/NavButton.svelte";
    import Briefcase from "@/icons/Briefcase.svelte";
    import Pen from "@/icons/Pen.svelte";
</script>

<nav
    class={`mx-4 flex h-auto w-auto
     flex-col items-start gap-6
     bg-mainlight bg-transparent px-4 transition-all duration-500
     ease-in-out
     print:hidden
     `}
>
    <a
        href="/"
        class={`hover:text flex h-16 w-40
        items-end
        justify-start bg-transparent
        px-4
        text-3xl
        font-bold
        text-maindark
        decoration-wavy
        transition-all
        [view-transition-name:nav-name]
        `}
    >
        pkpt.dev_
    </a>
    <div
        class="flex h-full flex-col gap-2 rounded-lg
        p-2 px-4 [view-transition-name:nav-menu]"
    >
        <NavButton href="/resume" isFixedWidth={true}>
            <Briefcase
                class="
                block h-8
                transition-all
                group-hover/button:animate-wiggle"
            />
            Resume
        </NavButton>
        <NavButton href="/blog" isFixedWidth={true}>
            <Pen class="block h-8 group-hover/button:animate-wiggle" />
            Blog
        </NavButton>
    </div>
</nav>
