export function print() {
  window.onbeforeprint = function () {
    console.log('comes into js file')
    var style = document.createElement('style')
    style.type = 'text/css'
    style.innerHTML =
      '@media print {a[href]:after {content: none !important; } a {text-decoration :none;  color:black;  }  }'
    document.head.appendChild(style)
  }
}
