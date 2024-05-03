import { createFileRoute } from '@tanstack/react-router'
import { AdditionalInfoScreen } from '../../components/sign_up/AdditionalInfoScreen'

export const Route = createFileRoute('/sign_up/additional-info')({
  component: () => <AdditionalInfoScreen/>
})