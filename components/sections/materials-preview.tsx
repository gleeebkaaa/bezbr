import Link from "next/link"
import { ArrowRight, Download, BookOpen, Puzzle, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

const materialCategories = [
  {
    icon: BookOpen,
    title: "Карточки и флешкарты",
    count: "Готово к покупке",
    description: "Наборы для игр, первых фраз и запоминания слов",
  },
  {
    icon: Puzzle,
    title: "Настольные игры",
    count: "Готово к покупке",
    description: "Игры для живой практики английского дома и в мини-группе",
  },
  {
    icon: FileText,
    title: "Рабочие тетради",
    count: "Готово к покупке",
    description: "Пошаговые задания для чтения, письма и грамматики",
  },
  {
    icon: Download,
    title: "Ворклисты PDF",
    count: "50–70 позиций",
    description: "Печатные задания для коротких домашних занятий",
  },
]

export function MaterialsPreviewSection() {
  return (
    <section id="materials" className="py-20 lg:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-8">
            <div>
              <span className="text-sm font-medium text-accent uppercase tracking-wider">
                Материалы для дома
              </span>
              <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground leading-tight text-balance">
                Материалы, которые помогают заниматься дома с пользой
              </h2>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">
              В каталоге собраны карточки, игры, рабочие тетради и ворклисты в
              PDF. Все наборы созданы преподавателями мастерской и проверены на
              реальных занятиях с детьми.
            </p>

            <div className="rounded-2xl border border-accent/30 bg-accent/10 p-5">
              <p className="text-sm font-semibold text-foreground">
                Важно: доступен самовывоз из студии
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                После оплаты PDF приходит на e-mail. Если нужен готовый
                печатный комплект, подготовим его и согласуем время самовывоза
                из студии.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Link href="/materials">
                  Перейти в каталог
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {materialCategories.map((category, index) => (
              <Link
                key={index}
                href="/materials"
                className="group p-6 bg-background rounded-2xl border border-border hover:border-accent/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mb-4 group-hover:bg-accent/30 transition-colors">
                  <category.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-1">
                  {category.title}
                </h3>
                <p className="text-sm text-accent font-medium mb-2">
                  {category.count}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {category.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
