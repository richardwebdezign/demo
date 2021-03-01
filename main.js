let rendering = false;

let playing = false;

let tweens = [
  (page, height, box) => {
  },
  (page, height, box) => {
    if ((box.top < (height / 2)) && !playing) {
      $("video")[0].play();
      playing = true;
    }
  },
  (page, height, box) => {
  }
];

$(document).ready(() => {
  let $wrapper = $(".wrapper");
  let $pages = $(".page");
  let scroll = () => {
    let height = $wrapper[0].getBoundingClientRect().height;
    $pages.each((index, page) => {
      let box = page.getBoundingClientRect();
      if ((box.top < height) && (box.bottom > 0))
        tweens[index](page, height, box);
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