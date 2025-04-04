const problemWithServiceController = {
  handler: async (request, h) => {
    // ========== ========== ========== ========== ==========
    // set null if there are any
    // cookies on click of start now button
    // ========== ========== ========== ========== ==========
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

    const statusCode = parseInt(request.query.statusCode)
    const errorMessage = statusCodeMessage(statusCode)
    let pageTitle
    if (
      statusCode === 500 ||
      statusCode === 502 ||
      statusCode === 503 ||
      statusCode === 504
    ) {
      pageTitle =
        'Sorry, there is a problem with the service — Check plant health information and import rules — GOV.UK'
    } else {
      if (statusCode === 404) {
        pageTitle =
          'Page not found — Check plant health information and import rules — GOV.UK'
      } else {
        pageTitle = 'Check plant health information and import rules — GOV.UK'
      }
    }
    if (statusCode !== undefined) {
      return h
        .view(
          'check-plant-health-information-and-import-rules/problem-with-service/index',
          {
            statusCode,
            pageTitle,
            heading: statusCode,
            message: errorMessage
          }
        )
        .code(statusCode)
    }
  }
}

export { problemWithServiceController }
