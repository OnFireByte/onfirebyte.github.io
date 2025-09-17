<script lang="ts">
    import HomeNavButton from "@/components/HomeNavButton.svelte";
    import Briefcase from "@/icons/Briefcase.svelte";
    import Human from "@/icons/Human.svelte";
    import Pen from "@/icons/Pen.svelte";
</script>

<nav
    class={`mx-4 flex h-auto w-auto
     flex-col items-center gap-6
     bg-mainlight bg-transparent px-4 transition-all duration-500
     ease-in-out
     md:items-start
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
        class="flex h-full flex-wrap gap-2 rounded-lg
        p-2 px-4 [view-transition-name:nav-menu] md:flex-col"
    >
        <HomeNavButton href="/blog" isFixedWidth={true}>
            <Pen class="block h-8 group-hover/button:animate-wiggle" />
            Blog
        </HomeNavButton>
        <HomeNavButton href="/resume.pdf" isFixedWidth={true}>
            <Briefcase
                class="
                block h-8
                transition-all
                group-hover/button:animate-wiggle"
            />
            Resume
        </HomeNavButton>
        <HomeNavButton href="/me" isFixedWidth={true}>
            <span>
                <Human
                    class="
            h-8
            transition-all
            group-hover/button:animate-wiggle"
                />
            </span>
            Me
        </HomeNavButton>
    </div>
</nav>
