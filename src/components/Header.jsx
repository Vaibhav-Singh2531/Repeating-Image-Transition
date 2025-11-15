const Header = () => {
  return (
    <header
      className="
        w-full grid 
        grid-cols-1 
        gap-2
        text-[18px] 
        font-[500]
        px-0 
        py-0
        relative
        z-[1]

        lg:grid-cols-4    /* Desktop → 4 columns */
      "
    >
      <h1 className="font-inherit">
        Repeating Image Transition
      </h1>

      <nav className="flex gap-2 items-start">
        <a className="line" href="https://tympanus.net/codrops/2025/04/28/animating-in-frames-repeating-image-transition/">
          more info,
        </a>
        <a className="line" href="https://github.com/codrops/">
          code,
        </a>
        <a className="line" href="https://tympanus.net/codrops/hub/">
          all demos
        </a>
      </nav>

      <nav className="flex gap-2 items-start">
        <a className="line" href="https://tympanus.net/codrops/hub/tag/page-transition/">
          page-transition,
        </a>
        <a className="line" href="https://tympanus.net/codrops/demos/?tag=repetition">
          repetition,
        </a>
        <a className="line" href="https://tympanus.net/codrops/hub/tag/grid/">
          grid
        </a>
      </nav>

<nav
  className="
    lg:flex lg:flex-col lg:ml-auto lg:gap-[0.125rem]
  "
>
  {/* MOBILE VERSION (single line) */}
  <span className="lg:hidden block">
    design, animate, and ship real-time 3d experiences with spline.
  </span>

  {/* DESKTOP VERSION (three lines) */}
  <span className="hidden lg:inline">design, animate, and </span>
  <span className="hidden lg:inline">ship real-time 3d </span>
  <span className="hidden lg:inline">experiences with spline.</span>
</nav>

    </header>
  );
};

export default Header;
