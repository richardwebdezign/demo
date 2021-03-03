$(document).ready(() => {
  let logos = $(".logo");

  let plateauWidth = (1 / 3);
  let plateauGradient = 1 / (1 - plateauWidth);
  let plateauOffset = plateauWidth / (plateauWidth - 1);
  let plateau = x => {
    let y = 0;
    if (x < -plateauWidth) y = (plateauGradient * x) - plateauOffset;
    else if (x > plateauWidth) y = (plateauGradient * x) + plateauOffset;
    return y;
  };
  console.log(plateau);

  let stagger = -(1 / 3);
  let middle = (logos.length - 1) / 2;

  let tweens = [
    (index, page, height, box) => {
    },
    (index, page, height, box) => {
      if (box.top < (height / 2)) {
        $("video")[0].play();
        tweens[index] = () => {};
      }
    },
    (index, page, height, box) => {
      let scroll = - box.top / height;
      debug.innerHTML = scroll;
      logos.each((index, logo) => logo.style.setProperty(
        "--scroll",
        plateau(scroll + (stagger * (index - middle)))
      ));
    },
    (index, page, height, box) => {
    }
  ];

  let pages = $(".page");

  let hash = window.location.hash.slice(1);
  if (hash) {
    if (window.location.hash === "#debug") $(debug).addClass("show");
    else pages[parseInt(hash)].scrollIntoView();
  }

  let wrapper = $(".wrapper");
  let scroll = () => {
    let height = wrapper[0].getBoundingClientRect().height;
    pages.each((index, page) => {
      let box = page.getBoundingClientRect();
      if ((box.top < height) && (box.bottom > 0))
        tweens[index](index, page, height, box);
    });
  };

  let rendering = false;
  wrapper.scroll(() => {
    if (!rendering) {
      window.requestAnimationFrame(() => {
        scroll();
        rendering = false;
      });
      rendering = true;
    }
  });
});
