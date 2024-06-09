import { usePathname } from "next/navigation"
import Link from "next/link"
import s from "./Header.module.scss"

const categories = [
  { label: "Jobs", value: "jobs", icon: "❤️", count: 87, link: "/" },
  // { label: "People", value: "people", icon: "👨🏻‍💻", count: 34, link: "/people" },
  { label: "Companies", value: "companies", icon: "🤝", count: 29, link: "/companies" },
  // { label: "Investors", value: "investors", icon: "💵", count: 45, link: "/investors" },
  // { label: "Incubators", value: "programs", icon: "🚀", count: 39, link: "/programs" },
  // { label: "Grants", value: "grants", icon: "💵", count: 31, link: "/grants" },
  // { label: "Competitions", value: "competitions", icon: "🏆", count: 24, link: "/competitions" },
  // { label: "Events", value: "events", icon: "🗓️", count: 24, link: "/events" },
  // { label: "People", value: "people", icon: "👨🏻‍💻", count: 24, link: "/people" },
  // { label: "Articles", value: "articles", icon: "📄", count: 39, link: "/articles" },
  // { label: "Books", value: "books", icon: "📕", count: 27, link: "/books" },
  // { label: "Documentaries", value: "documentaries", icon: "🎥", count: 14, link: "/documentaries" },
]

// have "Companies hiring remote section --> sign up for the newsletter to not miss when they have open positions"

const traditionalCategories = [
  { label: "Grants", value: "grants", icon: "💵", count: 31, link: "/grants" },
  { label: "Incubators", value: "programs", icon: "🚀", count: 39, link: "/programs" },
  { label: "Competitions", value: "competitions", icon: "🏆", count: 24, link: "/competitions" },
  { label: "Events", value: "events", icon: "🗓️", count: 24, link: "/events" },
]


const Header = () => {
  const pathname = usePathname()

  return (
    <header className={s.header}>
      <h1>anywhere 🌎 devs</h1>
      <p>Remote software development jobs with the focus on worldwide</p>
      <ul className={s.menu}>
        {categories.map((category) => (
          <li
            key={category.value}
            className={pathname === category.link ? s.menuItemActive : ""}
          >
            <Link href={category.link || "#"}>
              <span className={s.icon}>{category.icon}</span>
              <span className={s.label}>{category.label}</span>
              <span className={s.count}>({category.count})</span>
            </Link>
          </li>
        ))}
      </ul>
      {/* <ul className={s.menu} style={{ marginTop: 0 }}>
        {traditionalCategories.map((category) => (
          <li
            key={category.value}
            className={pathname === category.link ? s.menuItemActive : ""}
          >
            <Link href={category.link || "#"}>
              <span className={s.icon}>{category.icon}</span>
              <span className={s.label}>{category.label}</span>
              <span className={s.count}>({category.count})</span>
            </Link>
          </li>
        ))}
      </ul> */}
    </header>
  )
}

export default Header