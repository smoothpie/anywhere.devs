import Link from 'next/link'
import s from './Footer.module.scss'

const Footer = () => {
  return (
    <footer className={s.footer}>
      <Link href="https://karinakupp.com" target="_blank" rel="noreferrer">Self-promotional link</Link>
    </footer>
  )
}

export default Footer;