export const getPasswordResetTemplate = (url: string) => ({
  subject: 'Восстановите пароль',
  text: `Перейдите по ссылке чтобы восстановить пароль: ${url}`,
  html: `<!doctype html><html lang="ru"><head><meta content="text/html; charset=utf-8" http-equiv="Content-Type" /><title>Восстановить пароль</title><meta name="description" content="Восстановить пароль"></head><body><b>Восстановите пароль</b><br><span>Перейдите по ссылке, чтобы восстановить пароль: </span><a target="_blank" href="${url}">${url}</a></body></html>`
})

export const getVerifyEmailTemplate = (url: string) => ({
  subject: 'Подтвердите почту',
  text: `Перейдите по ссылке чтобы подтвердить почту: ${url}`,
  html: `<!doctype html><html lang="ru"><head><meta content="text/html; charset=utf-8" http-equiv="Content-Type" /><title>Подтвердите почту</title><meta name="description" content="Подтвердите почту"></head><body><b>Подтвердите почту</b><br><span>Перейдите по ссылке, чтобы подтвердить почту: </span><a target="_blank" href="${url}">${url}</a></body></html>`
})
