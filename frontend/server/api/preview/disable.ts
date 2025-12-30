export default defineEventHandler((event) => {
  // Clear the preview cookie
  deleteCookie(event, 'sanity-preview', {
    path: '/',
  })

  // Redirect back to home or referrer
  const referer = getHeader(event, 'referer')
  return sendRedirect(event, referer || '/', 302)
})
