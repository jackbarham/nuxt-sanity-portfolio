export default defineEventHandler((event) => {
  // Set a cookie to enable preview mode
  setCookie(event, 'sanity-preview', 'true', {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none',
    path: '/',
    maxAge: 60 * 60, // 1 hour
  })

  // Redirect to the page specified by the Presentation tool, or home
  const query = getQuery(event)
  const redirectTo = typeof query.redirect === 'string' ? query.redirect : '/'

  return sendRedirect(event, redirectTo, 307)
})
