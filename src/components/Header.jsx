const Header = () => {
  return (
    <header
      className="
        w-full grid 
        grid-cols-1 
        gap-2
        text-[18px] 
        font-[500]
        z-[1000]
        px-0 
        py-0

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

      <nav className="flex lg:flex-col ml-0 lg:ml-auto">
        <a href="https://spline.design/?ref=codrops-demos">design, animate, and </a>
        <a href="https://spline.design/?ref=codrops-demos">ship real-time 3d </a>
        <a href="https://spline.design/?ref=codrops-demos">experiences with spline.</a>
      </nav>

    </header>
  );
};

export default Header;
