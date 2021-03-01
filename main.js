let rendering = false;

let tweens = [
  (page, position) => {
  },
  (page, position) => {
  },
  (page, position) => {
  }
];

let scroll = () => {
  console.log(1);
};

$(document).ready(() => {
  let pages = $(".page");
  $(".wrapper").scroll(() => {
    if (!rendering) {
      window.requestAnimationFrame(() => {
        scroll();
        rendering = false;
      });
      rendering = true;
    }
  });
});
