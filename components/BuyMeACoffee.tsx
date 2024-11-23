import Link from 'next/link'
import { BuyMeACoffee as Icon } from './social-icons/icons'
import Image from 'next/image'
const BuyMeACoffee = () => {
  return (
    <Link href="https://buymeacoffee.com/halipunjabi" target="_blank">
      <Image
        src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
        alt="Buy Me A Coffee"
        height="60"
        width="217"
      ></Image>
    </Link>
  )
}
export default BuyMeACoffee
