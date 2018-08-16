const mockMessages = {
    reset : {
        'en' : 'reset',
        'ru' : 'сбросить'
    },
    result : {
        'en' : 'Result',
        'ru' : 'Результат'
    },
    loading : {
        'en' : 'Loading',
        'ru' : 'Загрузка'
    },
    email : {
        'en' : 'email',
        'ru' : 'Е-мейл'
    },
    password : {
      'en' : 'Password',
      'ru' : 'Пароль'
    },
    Scanner : {
        'en' : 'Scanner',
        'ru' : 'Сканнер'
    },
    Login : {
        'en' : 'Login',
        'ru' : 'Логин'
    }
}

export const mockLocale = 'ru'

export const getMockMessagesFromLocale = locale => {
    let messagesByLocale = {}
    for (let key in mockMessages) {
        let translationsForKey = mockMessages[key]
        let translation = translationsForKey[locale]
        if (translation) {
            messagesByLocale = {
                ...messagesByLocale,
                [key] : translation
            }
        }
    }
    return messagesByLocale
}