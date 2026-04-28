export type MaterialCategory = "flashcards" | "games" | "workbooks" | "printables"

export type Material = {
  id: string
  slug: string
  title: string
  description: string
  longDescription: string
  category: MaterialCategory
  age: string
  format: string
  price: number
  originalPrice?: number
  featured?: boolean
  bestseller?: boolean
  pages?: number
  includes?: string[]
}

export const categories: { id: MaterialCategory; label: string; description: string }[] = [
  { 
    id: "flashcards", 
    label: "Карточки", 
    description: "Яркие карточки для запоминания слов и фраз" 
  },
  { 
    id: "games", 
    label: "Настольные игры", 
    description: "Игры для практики языка дома с семьёй" 
  },
  { 
    id: "workbooks", 
    label: "Рабочие тетради", 
    description: "Упражнения для закрепления материала" 
  },
  { 
    id: "printables", 
    label: "Печатные материалы", 
    description: "Раскраски, задания, прописи на английском" 
  },
]

export const materials: Material[] = [
  {
    id: "1",
    slug: "animals-flashcards",
    title: "Карточки «Животные»",
    description: "50 карточек для запоминания животных через игру и разговор",
    longDescription: "Набор из 50 ярких карточек помогает ребёнку быстро запомнить названия животных на английском и сразу использовать слова в игре. На каждой карточке — изображение, английское название и транскрипция. Подходит для Memory, «Покажи и назови», «Угадай животное» и коротких домашних занятий.",
    category: "flashcards",
    age: "4-7 лет",
    format: "PDF, A4",
    price: 490,
    featured: true,
    bestseller: true,
    pages: 25,
    includes: [
      "50 карточек с изображениями животных",
      "Транскрипция каждого названия",
      "Инструкция для трёх игровых вариантов",
      "Цветная и чёрно-белая версии"
    ]
  },
  {
    id: "2",
    slug: "food-flashcards",
    title: "Карточки «Еда и напитки»",
    description: "40 карточек с продуктами, фруктами, овощами и напитками",
    longDescription: "Карточки «Еда и напитки» помогают ребёнку 4-8 лет запомнить повседневные английские слова через игру и реальные ситуации: готовку, поход в магазин, семейный завтрак. Набор готов к печати и подходит для коротких занятий дома.",
    category: "flashcards",
    age: "4-8 лет",
    format: "PDF, A4",
    price: 390,
    pages: 20,
    includes: [
      "40 цветных карточек с едой",
      "Транскрипция каждого слова",
      "3 игры для запоминания слов",
      "PDF-формат для печати"
    ]
  },
  {
    id: "3",
    slug: "colors-shapes-flashcards",
    title: "Карточки «Цвета и формы»",
    description: "30 карточек для первых цветов, форм и простых игр на английском",
    longDescription: "Базовый набор для самых маленьких: 15 цветов и 15 фигур в удобном формате для печати. Карточки помогают ребёнку запоминать слова через сортировку, сопоставление и короткие игровые задания.",
    category: "flashcards",
    age: "3-5 лет",
    format: "PDF, A4",
    price: 290,
    pages: 15,
    includes: [
      "15 карточек с цветами",
      "15 карточек с формами",
      "4 простые игры на сопоставление",
      "Короткие рекомендации для родителей"
    ]
  },
  {
    id: "4",
    slug: "bingo-animals",
    title: "Бинго «Животные»",
    description: "Настольная игра для изучения животных на английском",
    longDescription: "Бинго «Животные» — игра для детей 5-10 лет, которая помогает запоминать английские названия животных без зубрёжки. В комплекте 6 игровых полей, 48 карточек, правила и фишки для печати. Распечатайте набор — и можно играть дома или на занятии в группе.",
    category: "games",
    age: "5-10 лет",
    format: "PDF, A3+A4",
    price: 590,
    featured: true,
    pages: 10,
    includes: [
      "6 игровых полей формата A3+A4",
      "48 карточек с животными",
      "Правила игры",
      "Фишки для печати"
    ]
  },
  {
    id: "5",
    slug: "memory-game-house",
    title: "Мемори «Мой дом»",
    description: "Игра Memory с предметами дома и бытовой лексикой",
    longDescription: "Мемори «Мой дом» помогает ребёнку 4-8 лет запоминать английские слова через знакомые предметы дома. Игра развивает память, внимание и бытовую лексику, а 24 пары карточек с тремя уровнями сложности позволяют двигаться от простого к сложному.",
    category: "games",
    age: "4-8 лет",
    format: "PDF, A4",
    price: 450,
    bestseller: true,
    pages: 12,
    includes: [
      "24 пары карточек с предметами дома",
      "3 уровня сложности",
      "Словарик с переводом",
      "Правила игры"
    ]
  },
  {
    id: "6",
    slug: "board-game-adventure",
    title: "Настолка «Приключение»",
    description: "Игра-бродилка с заданиями на английском для семьи и группы",
    longDescription: "Настольная игра «Приключение» помогает детям 6-12 лет практиковать английский в движении: называть предметы, отвечать на вопросы, показывать действия и говорить короткими фразами. Подходит для семейных вечеров, мини-групп и повторения материала после урока.",
    category: "games",
    age: "6-12 лет",
    format: "PDF, A3+A4",
    price: 690,
    pages: 15,
    includes: [
      "Игровое поле формата A3",
      "100 карточек с заданиями",
      "Фишки и кубик",
      "Правила для быстрого старта"
    ]
  },
  {
    id: "7",
    slug: "alphabet-workbook",
    title: "Рабочая тетрадь «Алфавит»",
    description: "Прописи, раскраски и задания для уверенного знакомства с алфавитом",
    longDescription: "Рабочая тетрадь «Алфавит» помогает ребёнку 5-7 лет распознавать и писать все 26 английских букв. Внутри — прописи, раскраски и задания на закрепление, которые удобно проходить дома небольшими шагами.",
    category: "workbooks",
    age: "5-7 лет",
    format: "PDF, A4",
    price: 550,
    featured: true,
    bestseller: true,
    pages: 52,
    includes: [
      "26 уроков по буквам",
      "Прописи для строчных и заглавных букв",
      "Раскраски для закрепления",
      "Контрольные задания"
    ]
  },
  {
    id: "8",
    slug: "first-words-workbook",
    title: "Тетрадь «Первые слова»",
    description: "100 базовых английских слов с иллюстрациями и упражнениями",
    longDescription: "Тетрадь «Первые слова» помогает детям 5-8 лет запомнить 100 важных английских слов, потренировать произношение и начать использовать лексику в речи. Каждое слово сопровождается иллюстрацией, транскрипцией и заданием на закрепление.",
    category: "workbooks",
    age: "5-8 лет",
    format: "PDF, A4",
    price: 650,
    pages: 60,
    includes: [
      "100 слов с иллюстрациями и транскрипцией",
      "Упражнения на каждое слово",
      "Итоговые тесты",
      "Словарик"
    ]
  },
  {
    id: "9",
    slug: "grammar-basics-workbook",
    title: "Тетрадь «Основы грамматики»",
    description: "Базовая грамматика английского для детей 7-10 лет",
    longDescription: "Тетрадь «Основы грамматики» помогает ребёнку уверенно разобраться с базовыми правилами английского языка. Внутри — 10 ключевых тем, понятные объяснения, 200+ упражнений и ответы для самопроверки.",
    category: "workbooks",
    age: "7-10 лет",
    format: "PDF, A4",
    price: 750,
    pages: 80,
    includes: [
      "10 грамматических тем",
      "Правила простым языком",
      "200+ упражнений",
      "Ответы для самопроверки"
    ]
  },
  {
    id: "10",
    slug: "coloring-alphabet",
    title: "Раскраска «Весёлый алфавит»",
    description: "26 раскрасок с английскими буквами и первыми словами",
    longDescription: "Раскраска «Весёлый алфавит» помогает ребёнку 3-6 лет запоминать английские буквы через цвет, картинку и простое слово. Каждая страница — это буква, слово и иллюстрация, которую можно раскрасить.",
    category: "printables",
    age: "3-6 лет",
    format: "PDF, A4",
    price: 250,
    pages: 26,
    includes: [
      "26 готовых раскрасок в PDF",
      "Буквы и первые слова",
      "Материал для печати дома"
    ]
  },
  {
    id: "11",
    slug: "tracing-letters",
    title: "Прописи «Печатные буквы»",
    description: "Обводилки для тренировки английских печатных букв",
    longDescription: "Прописи помогают ребёнку освоить написание английских букв без спешки: обводка по пунктиру, стрелки направления и строки для самостоятельной практики.",
    category: "printables",
    age: "4-6 лет",
    format: "PDF, A4",
    price: 290,
    pages: 30,
    includes: [
      "Все буквы алфавита",
      "Заглавные и строчные",
      "Направление написания",
      "Дополнительные строки"
    ]
  },
  {
    id: "12",
    slug: "activity-pack-seasons",
    title: "Набор заданий «Времена года»",
    description: "Раскраски, лабиринты и задания на тему времён года",
    longDescription: "Набор «Времена года» объединяет раскраски, лабиринты, задания «найди отличия» и «соедини по точкам». Ребёнок повторяет сезонную лексику и одновременно тренирует внимание, логику и мелкую моторику.",
    category: "printables",
    age: "5-8 лет",
    format: "PDF, A4",
    price: 390,
    featured: true,
    pages: 40,
    includes: [
      "10 заданий на каждый сезон",
      "Разные типы активностей",
      "Новая лексика",
      "Ответы"
    ]
  }
]

export function getMaterialBySlug(slug: string): Material | undefined {
  return materials.find(m => m.slug === slug)
}

export function getMaterialsByCategory(category: MaterialCategory): Material[] {
  return materials.filter(m => m.category === category)
}

export function getFeaturedMaterials(): Material[] {
  return materials.filter(m => m.featured)
}

export function getBestsellers(): Material[] {
  return materials.filter(m => m.bestseller)
}

const materialPlaceholder = "/media/branding/material-placeholder.webp"

export function getMaterialCover(_material: Material): string {
  return materialPlaceholder
}
