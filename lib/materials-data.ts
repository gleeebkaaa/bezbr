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
    description: "50 карточек с изображениями животных и их названиями на английском",
    longDescription: "Набор из 50 красочных карточек с изображениями животных. На каждой карточке — яркая иллюстрация, название на английском и транскрипция. Идеально подходит для первого знакомства с английскими словами. Карточки можно использовать для игр: Memory, «Покажи и назови», «Угадай животное».",
    category: "flashcards",
    age: "4-7 лет",
    format: "PDF, A4",
    price: 490,
    featured: true,
    bestseller: true,
    pages: 25,
    includes: [
      "50 карточек с животными",
      "Транскрипция для каждого слова",
      "Инструкция по играм",
      "Цветная и ч/б версии"
    ]
  },
  {
    id: "2",
    slug: "food-flashcards",
    title: "Карточки «Еда и напитки»",
    description: "40 карточек с продуктами питания для изучения базовой лексики",
    longDescription: "Набор карточек с изображениями продуктов, фруктов, овощей и напитков. Помогает выучить повседневную лексику, связанную с едой. Отлично подходит для игр и повседневного использования — можно называть продукты во время готовки или похода в магазин.",
    category: "flashcards",
    age: "4-8 лет",
    format: "PDF, A4",
    price: 390,
    pages: 20,
    includes: [
      "40 карточек с едой",
      "Транскрипция",
      "3 игры для закрепления",
      "Цветная версия"
    ]
  },
  {
    id: "3",
    slug: "colors-shapes-flashcards",
    title: "Карточки «Цвета и формы»",
    description: "30 карточек для изучения цветов и геометрических фигур",
    longDescription: "Базовый набор для самых маленьких. Яркие карточки помогут выучить основные цвета и простые геометрические фигуры. Включает игры на сортировку и сопоставление.",
    category: "flashcards",
    age: "3-5 лет",
    format: "PDF, A4",
    price: 290,
    pages: 15,
    includes: [
      "15 карточек с цветами",
      "15 карточек с формами",
      "Игры на сопоставление",
      "Рекомендации для родителей"
    ]
  },
  {
    id: "4",
    slug: "bingo-animals",
    title: "Бинго «Животные»",
    description: "Настольная игра для 2-6 игроков. Учим животных играя!",
    longDescription: "Классическая игра Бинго адаптирована для изучения английских названий животных. В наборе 6 игровых полей и набор карточек. Отличная игра для семейного вечера или занятий в группе.",
    category: "games",
    age: "5-10 лет",
    format: "PDF, A3+A4",
    price: 590,
    featured: true,
    pages: 10,
    includes: [
      "6 игровых полей",
      "48 карточек с животными",
      "Правила игры",
      "Фишки для печати"
    ]
  },
  {
    id: "5",
    slug: "memory-game-house",
    title: "Мемори «Мой дом»",
    description: "Игра на память с предметами домашнего обихода",
    longDescription: "Игра Memory с карточками предметов, которые окружают ребёнка дома. Развивает память и помогает запомнить бытовую лексику. 24 пары карточек для разных уровней сложности.",
    category: "games",
    age: "4-8 лет",
    format: "PDF, A4",
    price: 450,
    bestseller: true,
    pages: 12,
    includes: [
      "24 пары карточек",
      "3 уровня сложности",
      "Словарик",
      "Правила игры"
    ]
  },
  {
    id: "6",
    slug: "board-game-adventure",
    title: "Настолка «Приключение»",
    description: "Игра-бродилка с заданиями на английском для всей семьи",
    longDescription: "Увлекательная игра-бродилка, где игроки выполняют задания на английском: называют предметы, отвечают на вопросы, показывают действия. Подходит для семейной игры и групповых занятий.",
    category: "games",
    age: "6-12 лет",
    format: "PDF, A3+A4",
    price: 690,
    pages: 15,
    includes: [
      "Игровое поле A3",
      "100 карточек с заданиями",
      "Фишки и кубик",
      "Подробные правила"
    ]
  },
  {
    id: "7",
    slug: "alphabet-workbook",
    title: "Рабочая тетрадь «Алфавит»",
    description: "Прописи и задания для изучения английского алфавита",
    longDescription: "Полный курс по изучению английского алфавита. Прописи для каждой буквы, упражнения на узнавание, задания на закрепление. Подходит для самостоятельных занятий дома.",
    category: "workbooks",
    age: "5-7 лет",
    format: "PDF, A4",
    price: 550,
    featured: true,
    bestseller: true,
    pages: 52,
    includes: [
      "26 уроков (по букве)",
      "Прописи",
      "Раскраски",
      "Контрольные задания"
    ]
  },
  {
    id: "8",
    slug: "first-words-workbook",
    title: "Тетрадь «Первые слова»",
    description: "100 базовых слов с упражнениями для начинающих",
    longDescription: "Рабочая тетрадь для изучения 100 самых важных английских слов. Каждое слово сопровождается иллюстрацией, транскрипцией и упражнениями на закрепление.",
    category: "workbooks",
    age: "5-8 лет",
    format: "PDF, A4",
    price: 650,
    pages: 60,
    includes: [
      "100 слов с иллюстрациями",
      "Упражнения на каждое слово",
      "Итоговые тесты",
      "Словарик"
    ]
  },
  {
    id: "9",
    slug: "grammar-basics-workbook",
    title: "Тетрадь «Основы грамматики»",
    description: "Простые правила и упражнения для младших школьников",
    longDescription: "Рабочая тетрадь по базовой грамматике английского языка. Простые объяснения, много практических заданий. Артикли, множественное число, глагол to be, простые времена.",
    category: "workbooks",
    age: "7-10 лет",
    format: "PDF, A4",
    price: 750,
    pages: 80,
    includes: [
      "10 грамматических тем",
      "Правила простым языком",
      "200+ упражнений",
      "Ответы для проверки"
    ]
  },
  {
    id: "10",
    slug: "coloring-alphabet",
    title: "Раскраска «Весёлый алфавит»",
    description: "26 страниц для раскрашивания с буквами и словами",
    longDescription: "Раскраска для изучения алфавита. Каждая страница — буква, слово на эту букву и иллюстрация. Ребёнок раскрашивает и одновременно запоминает буквы и слова.",
    category: "printables",
    age: "3-6 лет",
    format: "PDF, A4",
    price: 250,
    pages: 26,
    includes: [
      "26 раскрасок",
      "Буквы и слова",
      "Готово к печати"
    ]
  },
  {
    id: "11",
    slug: "tracing-letters",
    title: "Прописи «Печатные буквы»",
    description: "Обводилки для тренировки написания английских букв",
    longDescription: "Прописи для обучения написанию печатных английских букв. Пунктирные линии для обводки, стрелки направления, пустые строки для практики.",
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
    description: "Разнообразные активности на тему времён года",
    longDescription: "Комплексный набор заданий: раскраски, лабиринты, найди отличия, соедини по точкам — всё на тему времён года. Развивает лексику и когнитивные навыки одновременно.",
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

const materialCoverMap: Record<string, string> = {
  "animals-flashcards": "/media/catalog/animals-flashcards.jpg",
  "food-flashcards": "/media/catalog/food-flashcards.jpg",
  "colors-shapes-flashcards": "/media/catalog/colors-shapes-flashcards.jpg",
  "bingo-animals": "/media/catalog/bingo-animals.jpg",
  "memory-game-house": "/media/catalog/memory-game-house.jpg",
  "board-game-adventure": "/media/catalog/board-game-adventure.jpg",
  "alphabet-workbook": "/media/catalog/alphabet-workbook.jpg",
  "first-words-workbook": "/media/catalog/first-words-workbook.jpg",
  "grammar-basics-workbook": "/media/catalog/grammar-basics-workbook.jpg",
  "coloring-alphabet": "/media/catalog/coloring-alphabet.jpg",
  "tracing-letters": "/media/catalog/tracing-letters.jpg",
  "activity-pack-seasons": "/media/catalog/activity-pack-seasons.jpg",
}

export function getMaterialCover(material: Material): string {
  return materialCoverMap[material.slug] ?? "/media/catalog/animals-flashcards.jpg"
}
