import { createFileRoute } from '@tanstack/react-router'
import { PersonalInfoScreen } from '../../components/sign_up/PersonalInfoScreen'

export const Route = createFileRoute('/sign_up/')({
  component: () => <PersonalInfoScreen />
})