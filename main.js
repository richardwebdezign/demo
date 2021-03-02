let rendering = false;

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
  },
  (index, page, height, box) => {
  }
];

$(document).ready(() => {
  if (window.location.hash === "#debug") $(debug).addClass("show");

  let $wrapper = $(".wrapper");
  let $pages = $(".page");
  let scroll = () => {
    let height = $wrapper[0].getBoundingClientRect().height;
    $pages.each((index, page) => {
      let box = page.getBoundingClientRect();
      if ((box.top < height) && (box.bottom > 0))
        tweens[index](index, page, height, box);
    });
  };

  $wrapper.scroll(() => {
    if (!rendering) {
      window.requestAnimationFrame(() => {
        scroll();
        rendering = false;
      });
      rendering = true;
    }
  });
});
