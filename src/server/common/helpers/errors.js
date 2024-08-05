function statusCodeMessage(statusCode) {
  switch (true) {
    case statusCode === 404:
      return 'Page not found'
    case statusCode === 403:
      return 'Forbidden'
    case statusCode === 401:
      return 'Unauthorized'
    case statusCode === 400:
      return 'Bad Request'
    default:
      return 'Something went wrong'
  }
}

function setErrorMessage(request, titleText, errorListText) {
  request.yar.set('errors', {
    list: {
      titleText,
      errorList: [
        {
          text: errorListText,
          href: '#itembox'
        }
      ]
    }
  })
  request.yar.set('errorMessage', {
    message: { text: errorListText }
  })

  return true
}

function catchAll(request, h) {
  const { response } = request

  if (!response.isBoom) {
    return h.continue
  }

  request.logger.error(response?.stack)

  const statusCode = response.output.statusCode
  const errorMessage = statusCodeMessage(statusCode)
  let pageTitle = 'Error: '
  if (
    statusCode === 500 ||
    statusCode === 502 ||
    statusCode === 503 ||
    statusCode === 504
  ) {
    pageTitle =
      pageTitle +
      'Sorry, there is a problem with the service — Check plant health information and import rules — GOV.UK'
  } else {
    if (statusCode === 404) {
      pageTitle =
        pageTitle +
        'Page not found — Check plant health information and import rules — GOV.UK'
    } else {
      pageTitle =
        pageTitle + 'Check plant health information and import rules — GOV.UK'
    }
  }

  return h
    .view('error/index', {
      statusCode,
      pageTitle,
      heading: statusCode,
      message: errorMessage
    })
    .code(statusCode)
}

export { catchAll, setErrorMessage }
