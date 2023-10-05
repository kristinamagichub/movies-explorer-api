const DICTIONARY = {
  en: {
    required: (name) => `Field ${name} should be filled`,
    minlength: (name) => `Minimum length of ${name} — 1 symbols`,
    maxlength: (name) => `Maximum length of ${name} — 999 symbols`,
    shouldBeFilled: () => 'Field should be filled',
  },
  ru: {
    required: (name) => `Поле ${name} должно быть заполнено`,
    minlength: (name) => `Минимальная длина поля ${name} — 1 символ `,
    maxlength: (name) => `Максимальная длина поля ${name} — 999 символов`,
    shouldBeFilled: () => '3 Поле должно быть заполнено',
  },
};

module.exports = DICTIONARY;
