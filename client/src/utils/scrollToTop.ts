const ScrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(ScrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};

export default ScrollToTop;
