interface FooterProps {
  name: string
  email: string
}

export default function Footer({ name, email }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-12 border-t border-gray-100 mt-12">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-gray-500">
          © {currentYear} {name}. All rights reserved.
        </p>
        <a href={`mailto:${email}`} className="text-sm text-gray-500 hover:text-gray-900 mt-2 md:mt-0">
          {email}
        </a>
      </div>
    </footer>
  )
}
