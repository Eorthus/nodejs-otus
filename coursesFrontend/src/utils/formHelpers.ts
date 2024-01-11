export const objectUndefinedValuesFilter = (obj = {}) =>
  //@ts-ignore
  Object.fromEntries(Object.entries(obj).filter(([, value]) => ![undefined, null].includes(value)))

export const onlyNumbers = (event: KeyboardEvent) => {
  // Разрешаем: backspace, delete, tab и escape
  if (
    event.keyCode === 46 ||
    event.keyCode === 8 ||
    event.keyCode === 9 ||
    event.keyCode === 27 ||
    // Разрешаем: Ctrl+A
    (event.keyCode === 65 && event.ctrlKey === true) ||
    // Копирование и вставка, вырезание на винде
    (event.keyCode === 67 && event.ctrlKey === true) ||
    // (event.keyCode === 86 && event.ctrlKey === true) ||
    (event.keyCode === 88 && event.ctrlKey === true) ||
    // Разрешаем: cmd+A
    (event.keyCode === 65 && event.metaKey === true) ||
    // Копирование и вставка, вырезание на мак
    (event.keyCode === 67 && event.metaKey === true) ||
    // (event.keyCode === 86 && event.metaKey === true) ||
    (event.keyCode === 88 && event.metaKey === true) ||
    // Разрешаем: home, end, влево, вправо
    (event.keyCode >= 35 && event.keyCode <= 39)
  ) {
    // Ничего не делаем
  } else if (
    // Запрещаем ввод сочетанием клавиш Shift + цифра
    (event.shiftKey && event.keyCode >= 48 && event.keyCode <= 57) ||
    (event.shiftKey && event.keyCode >= 96 && event.keyCode <= 105)
  ) {
    event.preventDefault()
  } else {
    // Запрещаем все, кроме цифр на основной клавиатуре, а также Num-клавиатуре
    if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
      event.preventDefault()
    }
  }
}

export const customInputOptionsNumbers = [
  { label: 'RUS', title: 'Россия', subtitle: '7', value: 1 },
  { label: 'BLR', title: 'Беларусь', subtitle: '375', value: 2 },
]

export const customInputOptionsWithTelegram = [
  { label: '@', title: 'Nickname Telegram', subtitle: '', value: 0 },
  { label: 'RUS', title: 'Россия', subtitle: '7', value: 1 },
  { label: 'BLR', title: 'Беларусь', subtitle: '375', value: 2 },
]
