import { createFileRoute } from '@tanstack/react-router'
import { AccountInfoScreen } from '../../components/sign_up/AccountInfoScreen'

export const Route = createFileRoute('/sign_up/account-info')({
  component: () => <AccountInfoScreen/>
})