// @link: https://qna.habr.com/q/859191

export const fixWrongUrl = () => {
  if ((window.location.href.match(/\/\//g)?.length || 0) > 1) {
    window.stop()
    window.location.pathname = '/'
  }
}

export default fixWrongUrl
