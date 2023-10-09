import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import ClientSideRoute from "./ClientSideRoute"

interface Props {
  href: string
  text: string
  ariaLabel: string
  variant?: any
  className?: string
  icon?: React.ReactNode
}

const ButtonLink: React.FC<Props> = ({ href, text, className, icon, ariaLabel, variant }) => {
  return (
    <Button className={cn("rounded-full px-6 py-4", className)} variant={variant}>
      {/* <Link href={href} aria-label={ariaLabel} className="flex items-center">{text}{icon}</Link> */}
      <ClientSideRoute route={href} ariaLabel={ariaLabel} className="flex items-center">{text}{icon}</ClientSideRoute>
    </Button>
  )
}

export default ButtonLink
